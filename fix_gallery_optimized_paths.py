#!/usr/bin/env python3
import json
import shutil
from pathlib import Path

PROJECT = Path.cwd()
CONTENT_FILE = PROJECT / "content" / "site.json"
GALLERY_DIR = PROJECT / "public" / "gallery"
OPTIMIZED_DIR = GALLERY_DIR / "optimized"
BACKUP_DIR = PROJECT / "_backup_original_gallery_images"

IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".webp", ".avif"}

def load_json(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))

def save_json(path: Path, data):
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

def optimized_candidates():
    mapping = {}
    if not OPTIMIZED_DIR.exists():
        return mapping

    for file in OPTIMIZED_DIR.iterdir():
        if file.is_file() and file.suffix.lower() in IMAGE_EXTS:
            stem = file.stem.lower()
            mapping[stem] = file.name

    return mapping

def replace_image_path(value: str, mapping: dict[str, str]) -> str:
    if not isinstance(value, str):
        return value

    if not value.startswith("/gallery/"):
        return value

    # Schon optimiert
    if value.startswith("/gallery/optimized/"):
        return value

    filename = Path(value).name
    stem = Path(filename).stem.lower()

    if stem in mapping:
        return f"/gallery/optimized/{mapping[stem]}"

    # Falls gleiche Datei zufällig schon als webp existiert
    webp_name = f"{stem}.webp"
    if webp_name in {name.lower(): name for name in mapping.values()}:
        real_name = {name.lower(): name for name in mapping.values()}[webp_name]
        return f"/gallery/optimized/{real_name}"

    return value

def walk_replace(obj, mapping):
    if isinstance(obj, dict):
        return {key: walk_replace(value, mapping) for key, value in obj.items()}
    if isinstance(obj, list):
        return [walk_replace(item, mapping) for item in obj]
    if isinstance(obj, str):
        return replace_image_path(obj, mapping)
    return obj

def find_gallery_paths(obj, found=None):
    if found is None:
        found = set()
    if isinstance(obj, dict):
        for value in obj.values():
            find_gallery_paths(value, found)
    elif isinstance(obj, list):
        for item in obj:
            find_gallery_paths(item, found)
    elif isinstance(obj, str) and obj.startswith("/gallery/"):
        found.add(obj)
    return found

def backup_large_unreferenced_originals(referenced_paths: set[str]):
    BACKUP_DIR.mkdir(exist_ok=True)

    moved = []
    for file in GALLERY_DIR.iterdir():
        if not file.is_file():
            continue
        if file.suffix.lower() not in IMAGE_EXTS:
            continue

        public_path = f"/gallery/{file.name}"
        if public_path in referenced_paths:
            continue

        # Nur große/alte Originale aus gallery/ verschieben, optimized bleibt unberührt.
        target = BACKUP_DIR / file.name
        if target.exists():
            target = BACKUP_DIR / f"{file.stem}-backup{file.suffix}"

        shutil.move(str(file), str(target))
        moved.append((file.name, target))

    return moved

def main():
    if not CONTENT_FILE.exists():
        raise SystemExit("Fehler: content/site.json nicht gefunden. Bitte im Projekt-Hauptordner ausführen.")

    if not OPTIMIZED_DIR.exists():
        raise SystemExit("Fehler: public/gallery/optimized nicht gefunden.")

    mapping = optimized_candidates()
    if not mapping:
        raise SystemExit("Fehler: Keine optimierten Bilder in public/gallery/optimized gefunden.")

    data = load_json(CONTENT_FILE)

    backup = CONTENT_FILE.with_suffix(".json.backup-before-optimized-path-fix")
    shutil.copy2(CONTENT_FILE, backup)

    new_data = walk_replace(data, mapping)
    save_json(CONTENT_FILE, new_data)

    referenced = find_gallery_paths(new_data)
    moved = backup_large_unreferenced_originals(referenced)

    print("Fertig.")
    print(f"Backup von content/site.json: {backup}")
    print()
    print("Aktuell referenzierte Galerie-Bilder:")
    for path in sorted(referenced):
        print(f"  {path}")
    print()
    if moved:
        print("Nicht mehr referenzierte Originalbilder wurden aus public/gallery verschoben nach:")
        print(f"  {BACKUP_DIR}")
        for name, target in moved:
            print(f"  {name} -> {target}")
    else:
        print("Keine nicht referenzierten Originalbilder verschoben.")
    print()
    print("Nächste Schritte:")
    print("  npm run dev")
    print("  Browser prüfen")
    print("  git add .")
    print('  git commit -m "Galerie auf optimierte Bilder umstellen"')
    print("  git push")

if __name__ == "__main__":
    main()
