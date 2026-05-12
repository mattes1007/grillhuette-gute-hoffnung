#!/usr/bin/env python3
import json
from pathlib import Path
from copy import deepcopy

p = Path('content/site.json')
if not p.exists():
    raise SystemExit('content/site.json nicht gefunden. Bitte im Projektordner ausführen.')

data = json.loads(p.read_text())
site = data.setdefault('site', {})
site.setdefault('logoText', 'GH')
site.setdefault('address', 'Grillhütte Gute Hoffnung\nMünster')

# Bestehende Werte bleiben erhalten. Fehlende Bereiche werden ergänzt.
def merge_missing(target, defaults):
    for key, value in defaults.items():
        if key not in target:
            target[key] = deepcopy(value)
        elif isinstance(target[key], dict) and isinstance(value, dict):
            merge_missing(target[key], value)
    return target

price = site.get('price', '60 €')

defaults = {
    'meta': {
        'metadataBase': 'https://grillhuette-gute-hoffnung.de',
        'titleSuffix': 'Grillhütte am Waldrand',
        'description': 'Grillhütte Gute Hoffnung Münster: Grillhütte am Waldrand für Familienfeiern, Geburtstage und Vereinsabende. Mit Außengelände, Freisitz, Spielgeräten und Seilbahn.',
        'keywords': ['Grillhütte Gute Hoffnung', 'Grillhütte Münster', 'Grillhütte mieten', 'Münster', 'Familienfeier', 'Geburtstag', 'Vereinsfeier', 'Grillplatz'],
        'openGraphDescription': 'Grillhütte am Waldrand in Münster für Feiern, Grillabende und Veranstaltungen. Anfrage bequem per WhatsApp oder E-Mail vorbereiten.',
        'openGraphImage': '/og-grillhuette.jpg',
        'openGraphImageAlt': 'Grillhütte Gute Hoffnung Münster',
        'locale': 'de_DE'
    },
    'hero': {
        'image': '/hero-grillhuette.jpg',
        'imageWebp': '/hero-grillhuette.webp',
        'imageAlt': 'Grillhütte Gute Hoffnung Münster am Waldrand',
        'priceSuffix': 'pro Tag',
        'titleLine1': 'Grillhütte',
        'titleLine2': 'Gute Hoffnung',
        'cardKicker': 'Sofort wissen',
        'cardTitle': 'Passt die Hütte zu eurer Feier?',
        'cardText': 'Die wichtigsten Fakten sind direkt sichtbar — perfekt für mobile Besucher, die schnell entscheiden wollen.'
    },
    'ui': {
        'headerWhatsapp': 'WhatsApp',
        'headerInquiry': 'Anfrage',
        'heroPrimaryButton': 'Termin anfragen',
        'heroWhatsappButton': 'WhatsApp öffnen',
        'heroGalleryButton': 'Bilder ansehen',
        'galleryInquiryButton': 'Jetzt anfragen',
        'requiredLabel': 'Pflicht',
        'faqOpenIcon': '+',
        'mobileCall': 'Anrufen',
        'mobileInquiry': 'Anfrage',
        'mobileWhatsapp': 'WhatsApp'
    },
    'trustItems': [
        {'icon': '📅', 'title': 'Kalender', 'text': 'Termin zuerst prüfen'},
        {'icon': '📲', 'title': 'Direkt anfragen', 'text': 'WhatsApp oder E-Mail'},
        {'icon': '🛝', 'title': 'Familienfreundlich', 'text': 'Spielbereich & Seilbahn'},
        {'icon': '💶', 'title': 'Fair', 'text': f'{price} Tagesmiete'}
    ],
    'sections': {
        'experience': {'eyebrow': 'Das Erlebnis', 'title': 'Keine 08/15-Hütte. Ein Ort, der sich nach Feierabend, Familie und Sommer anfühlt.', 'text': 'Die Startseite ist bewusst wie eine kleine Erlebnisroute aufgebaut: erst Stimmung, dann Fakten, dann Anfrage. Genau so funktioniert gute mobile UX.'},
        'gallery': {'eyebrow': 'Galerie', 'title': 'Große Bilder, schnelle Entscheidung.', 'text': 'Die vorhandenen Fotos werden als modernes Magazin-Layout inszeniert. Neue Bilder kannst du später bequem über TinaCMS ergänzen.'},
        'features': {'eyebrow': 'Ausstattung', 'title': 'Alles, was Besucher sofort wissen wollen.', 'text': 'Klar, lesbar, mobil optimiert — keine versteckten Infos und keine Textwüste.'},
        'inquiry': {'eyebrow': 'Kalender & Anfrage', 'title': 'Der wichtigste Teil: schnell, sauber, ohne Login.', 'text': 'Auf dem Handy bleibt der Weg kurz: Termin prüfen, Daten eintragen, WhatsApp oder E-Mail öffnen. Die Website sendet nichts ungefragt ab.'},
        'guestbook': {'eyebrow': 'Gästebuch', 'title': 'Schön gelöst — und bereit für Cloudflare.', 'text': 'Diese Version zeigt die fertige Oberfläche. Aktuell speichert sie Demo-Einträge lokal; für den Live-Betrieb kann dieselbe Oberfläche später an Cloudflare D1 + Turnstile angeschlossen werden.'},
        'faq': {'eyebrow': 'Fragen', 'title': 'Kurz geklärt, bevor ihr anfragt.', 'text': ''},
        'contact': {'eyebrow': 'Kontakt', 'title': 'Fragen zur Grillhütte? Direkt melden.', 'text': 'Für schnelle Rückfragen ist WhatsApp am bequemsten. Telefonisch bitte die Zeiten beachten.'}
    },
    'mapSection': {
        'enabled': True,
        'eyebrow': 'Anfahrt',
        'title': 'So findet ihr zur Grillhütte.',
        'text': 'Adresse, Karte und Hinweise zur Zufahrt kannst du komplett über TinaCMS pflegen.',
        'addressLabel': 'Adresse / Treffpunkt',
        'address': site.get('address', 'Grillhütte Gute Hoffnung\nMünster'),
        'parkingTitle': 'Parken',
        'parkingNote': 'Parkhinweise bitte ergänzen.',
        'accessTitle': 'Zufahrt',
        'accessNote': 'Zufahrtshinweise bitte ergänzen.',
        'mapLink': '',
        'mapButtonLabel': 'In Google Maps öffnen',
        'embedSrc': '',
        'iframeTitle': 'Google Maps Anfahrt zur Grillhütte Gute Hoffnung',
        'placeholderTitle': 'Karte noch nicht verbunden',
        'placeholderText': 'Füge in TinaCMS den Google-Maps-Einbettungslink ein, dann erscheint hier die Karte.'
    },
    'inquiryContent': {
        'emailSubject': 'Anfrage Grillhütte Gute Hoffnung',
        'calendarKicker': 'Belegung',
        'calendarTitle': 'Kalender prüfen',
        'calendarButton': 'Kalender öffnen',
        'calendarIframeTitle': 'Google Kalender Grillhütte Gute Hoffnung Münster',
        'calendarMobileIcon': '📅',
        'calendarMobileTitle': 'Kalender mobil öffnen',
        'calendarMobileText': 'Auf dem Handy ist der Google-Kalender außerhalb der Seite besser bedienbar.',
        'calendarMobileButton': 'Kalender anzeigen',
        'formKicker': 'Unverbindlich',
        'formTitle': 'Anfrage vorbereiten',
        'formText': 'Pflicht sinnvoll gesetzt: Name, Kontaktmöglichkeit und Datum. Danach kannst du die fertige Nachricht abschicken.',
        'progressTitle': 'Ausgefüllt',
        'progressSuffix': 'bereit',
        'requiredHint': 'Tipp: Name, Wunschtermin und mindestens Telefon oder E-Mail eintragen — dann ist die Anfrage vollständig.',
        'whatsappButton': 'Per WhatsApp senden',
        'emailButton': 'Per E-Mail senden',
        'previewSummary': 'Vorschau der Nachricht anzeigen',
        'messageIntro': 'Hallo, ich möchte die Grillhütte Gute Hoffnung anfragen.',
        'fields': {
            'name': {'label': 'Name', 'placeholder': 'Max Mustermann'},
            'phone': {'label': 'Telefon', 'placeholder': '0176 ...'},
            'email': {'label': 'E-Mail', 'placeholder': 'name@example.de'},
            'date': {'label': 'Wunschtermin', 'placeholder': ''},
            'time': {'label': 'Zeitraum / Uhrzeit', 'placeholder': 'z. B. ab 16 Uhr'},
            'people': {'label': 'Personenzahl', 'placeholder': 'z. B. 35 Personen'},
            'occasion': {'label': 'Anlass', 'placeholder': 'Geburtstag, Familienfeier, Verein ...'},
            'message': {'label': 'Nachricht', 'placeholder': 'Gibt es noch Fragen oder Hinweise?'}
        },
        'messageLabels': {'name': 'Name', 'phone': 'Telefon', 'email': 'E-Mail', 'date': 'Wunschtermin', 'time': 'Zeitraum / Uhrzeit', 'people': 'Personenzahl', 'occasion': 'Anlass', 'message': 'Nachricht'}
    },
    'guestbookContent': {
        'nameLabel': 'Name',
        'namePlaceholder': 'z. B. Familie Schneider',
        'messageLabel': 'Nachricht',
        'messagePlaceholder': 'Wie war euer Tag an der Grillhütte?',
        'submitButton': 'Eintrag speichern',
        'moderationHint': 'Live später moderiert: senden → prüfen → freigeben → öffentlich sichtbar.',
        'validationMessage': 'Bitte Name und Nachricht eintragen.',
        'successMessage': 'Demo gespeichert: Der Eintrag ist aktuell nur auf diesem Gerät sichtbar. Für live: Cloudflare D1 anschließen.',
        'planKicker': 'Live-Plan',
        'planTitle': 'Cloudflare D1 + Moderation + Spam-Schutz',
        'planText': 'Die Oberfläche bleibt. Später ersetzen wir nur den lokalen Speicher durch eine sichere Cloudflare-Funktion.',
        'stars': '★★★★★',
        'localLabel': 'lokal',
        'quoteOpen': '„',
        'quoteClose': '“'
    },
    'contactContent': {
        'callLabel': 'Anrufen',
        'whatsappLabel': 'WhatsApp',
        'whatsappValue': 'Chat öffnen',
        'emailLabel': 'E-Mail',
        'hoursTitle': 'Telefonisch erreichbar',
        'hoursText': 'Außerhalb dieser Zeiten gerne per WhatsApp oder E-Mail anfragen.',
        'fastTitle': 'Der schnellste Weg',
        'fastInquiryLabel': 'Anfrage',
        'fastWhatsappLabel': 'WhatsApp',
        'fastFacebookLabel': 'Facebook',
        'fastText': 'Die finale Terminbestätigung erfolgt immer persönlich.'
    },
    'footerContent': {
        'copyrightPrefix': '©',
        'facebookLabel': 'Facebook',
        'impressumLabel': 'Impressum',
        'datenschutzLabel': 'Datenschutz'
    },
    'legal': {
        'backLabel': '← Zurück zur Startseite',
        'impressum': {
            'title': 'Impressum',
            'intro': 'Bitte vor Veröffentlichung die vollständigen rechtlichen Angaben ergänzen. Diese Seite ist als Platzhalter vorbereitet.',
            'sections': [
                {'title': 'Angaben gemäß § 5 TMG', 'text': 'Grillhütte „Gute Hoffnung“ Münster\nVerantwortliche Person / Verein ergänzen\nStraße und Hausnummer ergänzen\nPLZ und Ort ergänzen'},
                {'title': 'Kontakt', 'text': 'Telefon und E-Mail werden automatisch aus den Grunddaten ergänzt.'},
                {'title': 'Haftung für Inhalte', 'text': 'Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann jedoch keine Gewähr übernommen werden.'}
            ]
        },
        'datenschutz': {
            'title': 'Datenschutzerklärung',
            'intro': 'Bitte vor Veröffentlichung prüfen und anpassen. Diese Seite ist ein vorbereiteter Platzhalter und keine Rechtsberatung.',
            'sections': [
                {'title': 'Verantwortliche Stelle', 'text': 'Verantwortliche Person / Verein ergänzen\nKontakt wird automatisch aus den Grunddaten ergänzt.'},
                {'title': 'Eingebundene Dienste', 'text': 'Auf dieser Website wird ein Google Kalender eingebunden. Beim Laden des Kalenders können Daten an Google übertragen werden. Zusätzlich sind Links zu WhatsApp, E-Mail und Facebook eingebunden. Diese Dienste werden erst geöffnet, wenn Besucher aktiv darauf klicken.'},
                {'title': 'Kontaktaufnahme', 'text': 'Bei Kontaktaufnahme per Telefon, WhatsApp oder E-Mail werden die übermittelten Angaben verarbeitet, um die Anfrage zu beantworten und die Nutzung der Grillhütte abzustimmen.'},
                {'title': 'Gästebuch-Demo', 'text': 'Einträge im vorbereiteten Gästebuch werden aktuell nur lokal im Browser des jeweiligen Besuchers gespeichert. Sie werden nicht automatisch an den Betreiber der Website übertragen.'},
                {'title': 'Hosting', 'text': 'Die Website kann statisch über Cloudflare Pages, Netlify oder einen vergleichbaren Anbieter gehostet werden. Bitte den final verwendeten Hosting-Anbieter in der Datenschutzerklärung ergänzen.'}
            ]
        }
    }
}

before = json.dumps(data, sort_keys=True, ensure_ascii=False)
merge_missing(data, defaults)
after = json.dumps(data, sort_keys=True, ensure_ascii=False)
p.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
print('content/site.json erweitert. Bestehende Inhalte wurden beibehalten.' if before != after else 'content/site.json war bereits vollständig.')
