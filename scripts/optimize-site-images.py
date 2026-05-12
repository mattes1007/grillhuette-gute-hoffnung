#!/usr/bin/env python3
"""Optimiert Website-Bilder für Cloudflare Pages/Next static export.

Voraussetzung auf Linux Mint:
  sudo apt install imagemagick

Was das Script macht:
- liest content/site.json
- sucht Bildpfade wie /gallery/bild.jpg, /gallery/bild.png, /hero/bild.webp usw.
- erzeugt optimierte WebP-Dateien mit maximal 1920 px Kantenlänge
- schreibt die Pfade in content/site.json auf die optimierten Dateien um
- erstellt vorher content/site.json.backup-images
"""
from __future__ import annotations

import json
import shutil
import subprocess
from pathlib import Path

PROJECT = Path.cwd()
PUBLIC = PROJECT / "public"
CONTENT = PROJECT / "content" / "site.json"
IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".webp"}
MAX_SIZE = "1920x1920>"
QUALITY = "78"


def has_magick() -> str:
    for cmd in ("magick", "convert"):
        if shutil.which(cmd):
            return cmd
    raise SystemExit("ImageMagick fehlt. Installiere es mit: sudo apt install imagemagick")


def optimize_image(tool: str, source: Path, target: Path) -> None:
    target.parent.mkdir(parents=True, exist_ok=True)
    if tool == "magick":
        cmd = [tool, str(source), "-auto-orient", "-resize", MAX_SIZE, "-strip", "-quality", QUALITY, str(target)]
    else:
        cmd = [tool, str(source), "-auto-orient", "-resize", MAX_SIZE, "-strip", "-quality", QUALITY, str(target)]
    subprocess.run(cmd, check=True)


def make_target(public_path: str) -> tuple[Path, str] | None:
    if not public_path.startswith("/"):
        return None

    rel = public_path.lstrip("/")
    source = PUBLIC / rel
    if source.suffix.lower() not in IMAGE_EXTS or not source.exists():
        return None

    target_rel = Path(rel).parent / "optimized" / f"{source.stem}.webp"
    target = PUBLIC / target_rel
    return target, "/" + str(target_rel).replace("\\", "/")


def walk_replace(value, replacements):
    if isinstance(value, dict):
        return {key: walk_replace(item, replacements) for key, item in value.items()}
    if isinstance(value, list):
        return [walk_replace(item, replacements) for item in value]
    if isinstance(value, str):
        return replacements.get(value, value)
    return value


def collect_paths(value, paths: set[str]) -> None:
    if isinstance(value, dict):
        for item in value.values():
            collect_paths(item, paths)
    elif isinstance(value, list):
        for item in value:
            collect_paths(item, paths)
    elif isinstance(value, str):
        suffix = Path(value.split("?", 1)[0]).suffix.lower()
        if value.startswith("/") and suffix in IMAGE_EXTS:
            paths.add(value)


def main() -> None:
    if not CONTENT.exists():
        raise SystemExit("content/site.json wurde nicht gefunden. Bitte im Projekt-Hauptordner starten.")

    tool = has_magick()
    data = json.loads(CONTENT.read_text(encoding="utf-8"))
    paths: set[str] = set()
    collect_paths(data, paths)

    if not paths:
        print("Keine Bildpfade in content/site.json gefunden.")
        return

    replacements: dict[str, str] = {}
    for path in sorted(paths):
        result = make_target(path)
        if result is None:
            print(f"Übersprungen: {path}")
            continue
        target, web_path = result
        source = PUBLIC / path.lstrip("/")
        print(f"Optimiere: {path} -> {web_path}")
        optimize_image(tool, source, target)
        replacements[path] = web_path

    if not replacements:
        print("Keine Bilder optimiert.")
        return

    backup = CONTENT.with_suffix(".json.backup-images")
    backup.write_text(CONTENT.read_text(encoding="utf-8"), encoding="utf-8")

    new_data = walk_replace(data, replacements)
    CONTENT.write_text(json.dumps(new_data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    print("\nFertig.")
    print(f"Backup: {backup}")
    print(f"Optimierte Bilder: {len(replacements)}")
    print("Jetzt testen: npm run dev")


if __name__ == "__main__":
    main()
