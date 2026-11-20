# AirportGuide Oslo – Prosjektplan

Navigasjonsapp for Oslo lufthavn Gardermoen. Web, iOS og Android fra én kodebase.

> **Prinsipp:** Ingen oppdiktede fly- eller kartdata presenteres som ekte. All data merkes med kilde: `verified`, `demo` eller `illustration`.

---

## 1. Datagrunnlag – status

### Flydata (Avinor)
- Avinor har et åpent XML-feed (åpen lisens), samme datagrunnlag som skjermene på flyplassen.
- Endepunkter:
  - `https://asrv.avinor.no/XmlFeed/v1.0?airport=OSL&direction=D&TimeFrom=1&TimeTo=7` – fly til/fra norske lufthavner
  - `https://asrv.avinor.no/flightStatuses/v1.0` – statuskoder
  - `https://asrv.avinor.no/airportNames/v1.0` – flyplassnavn
  - `https://asrv.avinor.no/airlineNames/v1.0` – flyselskapsnavn
- URL-er og parametere er **case-sensitive**.
- Dokumentasjon: https://partner.avinor.no/en/services/flight-data/ og xwiki.avinor.no
- **Usikkert:** Boardingtid. Det finnes et operativt feed (`XmlFeedOperativ`) med bl.a. `gateClosedTime`, men tilgangen er ikke bekreftet. Inntil videre er boardingtid «ikke tilgjengelig» i appen.
- **Må avklares:** Vilkår for oppdateringsfrekvens. Backend poller, klientene gjør det ikke.
- Kontakt: Aviation Data Office, ado@avinor.no

### Kartdata
- Ingen åpne innendørs geodata funnet for terminalen.
- Avinor publiserer et oversiktskart (bilde) på avinor.no – ikke grunnlag vi kan bygge på uten tillatelse.
- Tredjepartskart har typisk kun ikke-kommersiell lisens.
- **Tiltak:** Bygg kartmodell og komponenter med tydelig merkede demodata. Be Avinor om tilgang til kartdata/rettigheter.

---

## 2. Arkitektur

### Prosjektstruktur (pnpm workspaces)

```
airport-navigation-app/
├─ apps/
│  ├─ app/            # Expo + Expo Router → iOS, Android og web
│  │  ├─ app/         # ruter: (tabs)/index, my-flight, map, assistant
│  │  └─ src/
│  │     ├─ components/
│  │     ├─ features/{flight,map,assistant}/
│  │     └─ theme/
│  └─ api/            # Node + TypeScript (Fastify)
│     └─ src/
│        ├─ avinor/   # henting, XML-parsing, normalisering
│        ├─ routes/   # /health, /flights/:flightNo
│        └─ cache/
├─ packages/
│  └─ shared/         # felles typer + Zod-skjemaer (Flight, MapFeature, DataSource)
├─ docs/
├─ .github/workflows/ci.yml
└─ README.md
```

### Kodedeling
- Én Expo-app dekker web, iOS og Android. Skjermer, komponenter, tema og logikk deles.
- Plattformforskjeller via filendelser (`MapView.web.tsx` / `MapView.native.tsx`) bak felles grensesnitt – kun for kart, push og senere AR.
- Responsivt: tab-bar på mobil, sidenavigasjon og flerkolonne på desktop (`useWindowDimensions` + NativeWind-breakpoints).
- Typer og validering deles mellom app og API via `packages/shared`.

### Kartteknologi
- Start med eget **SVG-basert etasjekart** (`react-native-svg`): zoom, panorering, etasjevalg, markører. Likt på alle plattformer.
- Gangforbindelser modelleres som graf (noder/kanter med etasje, avstand, tilgjengelighet).
- Bytt til MapLibre bak samme grensesnitt når georefererte data finnes.

---

## 3. Pakker

| Del | Pakker i v1 |
|---|---|
| App | `expo`, `expo-router`, `react-native-web`, `nativewind`, `tailwindcss`, `react-native-svg`, `@tanstack/react-query` |
| API | `fastify`, `fast-xml-parser`, `zod` |
| Verktøy | TypeScript (strict), ESLint, Prettier, Vitest (api/shared), Jest + React Native Testing Library (app) |

**Venter med:** PostgreSQL/PostGIS (fase 4/6), AI-SDK (fase 6), push (fase 6), MapLibre (fase 4), AR (senere).
Flydata caches i minnet i v1. Postgres trengs først for push-abonnementer og kartdata.

---

## 4. Design

- Hvit bakgrunn, mørk lettlest tekst. Primærfarge `#155EEF`.
- Hvite inputfelt med diskrete grå kanter – **aldri svarte inputfelt**.
- Store knapper, avrundede kort, god luft. Inspirert av Apple Maps.
- Hjem: logo, velkomst («Velkommen til Gardermoen» / «Finn frem. Reis enklere.»), flynummersøk + blå «Finn»-knapp, kort for terminalkart og AI-assistent.
- Navigasjon: Hjem, Mitt fly, Kart, AI.

---

## 5. Faser

### Fase 1 – Prosjektoppsett
- [ ] pnpm-monorepo (`apps/app`, `apps/api`, `packages/shared`)
- [ ] Expo + TypeScript (strict) + Expo Router med fire faner
- [ ] NativeWind + designtokens
- [ ] API-skjelett med `/health`
- [ ] ESLint, Prettier, Vitest
- [ ] CI: typesjekk, lint, test, web-bygg
- [ ] README med installasjon og kjøring
- **Ferdig når:** typesjekk/lint/test passerer, web bygger, appen starter på iOS/Android (testes lokalt).

### Fase 2 – Design og frontend
- [ ] Hjem, Mitt fly, Terminalkart, AI-assistent
- [ ] Gjenbrukbare komponenter (Button, Card, SearchInput, Badge, DemoBadge)
- [ ] Statiske demodata med synlig «Demodata»-merke
- [ ] Responsiv layout mobil/desktop

### Fase 3 – Flydata
- [ ] Avklare vilkår/oppdateringsfrekvens med Avinor
- [ ] Hente og parse XmlFeed for OSL
- [ ] Normalisere til `Flight` (manglende felt = `null`, aldri gjettet)
- [ ] Cache + polling i backend
- [ ] `GET /flights/:flightNo`
- [ ] Koble flysøk i appen, vise «sist oppdatert», feil- og tomtilstander

### Fase 4 – Terminalkart
- [ ] Undersøke kartkilder og bruksrettigheter (Avinor)
- [ ] Datamodell: etasjer, områder, POI-er (gate, butikk, toalett …)
- [ ] SVG-kartvisning med zoom, panorering, etasjevalg, søk
- [ ] Legge inn verifiserte data når de finnes

### Fase 5 – Navigasjon
- [ ] Graf for gangforbindelser, inkl. tilgjengelige ruter
- [ ] Ruteberegning (Dijkstra/A*) og gangtid
- [ ] Testing av nøyaktighet
- [ ] Veivisning bak feature-flag til den er validert

### Fase 6 – AI og varsler
- [ ] AI-endepunkt i backend (nøkler kun på server)
- [ ] Verktøy som kun leser fra egne API-er; tydelig ved manglende data
- [ ] Push-varsler ved endret gate/avgangstid (`expo-notifications`; web-push vurderes)
- [ ] PostgreSQL for abonnementer

### Fase 7 – Testing og publisering
- [ ] Test på web, iOS og Android
- [ ] Tilgjengelighetstest (WCAG 2.1 AA) og brukertester
- [ ] Produksjonsmiljø, hosting for API og web
- [ ] App Store / Google Play (EAS Build)

### Senere – AR-navigasjon
Krever verifisert innendørsposisjonering og kartdata. Startes ikke før 2D-navigasjon er pålitelig.

---

## 6. Åpne spørsmål
1. pnpm + Fastify, eller npm + Express?
2. Hvor skal API og web hostes?
3. Hvem kontakter Avinor om kartdata og boardinginformasjon?
4. Skal repoet få nytt navn til `airportguide-oslo`?
