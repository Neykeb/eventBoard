# Event Board

Event Board ist eine responsive Eventverwaltung mit React, TypeScript, Tailwind CSS und TanStack Router. Angemeldete Nutzer können Events suchen, filtern, erstellen, bearbeiten und löschen sowie Teilnehmer verwalten.

## Funktionen

- Anmeldung über Clerk
- Eventübersicht mit Kennzahlen, Suche, Filtern und Sortierung
- Events erstellen, bearbeiten und nach Bestätigung löschen
- Teilnehmer mit Validierung und Kapazitätsprüfung hinzufügen
- Asynchroner Datenabruf aus einer lokalen JSON-Datei
- Lade-, Fehler- und Leerzustände
- Speicherung der Änderungen im LocalStorage
- Responsive und tastaturbedienbare Oberfläche

## Lokale Installation

```bash
npm install
cp .env.example .env
npm run dev
```

Trage anschließend deinen Clerk Publishable Key in `.env` ein.

## Befehle

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Datenfluss

Beim ersten Aufruf lädt `EventsProvider` die Ausgangsdaten asynchron aus `public/events.json`. Änderungen werden zentral im React-State verwaltet und anschließend im LocalStorage gespeichert. Vorhandene gültige LocalStorage-Daten haben Vorrang. Ungültige gespeicherte Daten werden verworfen und durch die JSON-Ausgangsdaten ersetzt.

## Projektstruktur

- `public/events.json`: synthetische Ausgangsdaten
- `src/hooks/useEvents.ts`: gemeinsamer Event-State, Fetching und Datenvalidierung
- `src/components`: wiederverwendbare UI-Komponenten
- `src/routes`: Seiten und geschützte Eventrouten

## Deployment

Ein öffentlicher Live-Link wird nach dem Deployment auf Vercel oder Netlify hier ergänzt.
