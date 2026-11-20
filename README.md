# AirportGuide Oslo ✈️

Finn frem. Reis enklere.

> 🚧 Status: Under utvikling, ikke klar til bruk ennå.

AirportGuide Oslo er en mobilapp for iPhone og Android som hjelper deg å finne frem på Oslo lufthavn Gardermoen.

---

## Hvorfor lager jeg dette?

Gardermoen er en stor flyplass. Mange synes det er stressende å finne riktig gate, spesielt når tiden er knapp, når gaten plutselig endres, eller når man ikke reiser så ofte.

Informasjonen finnes, men den er spredt: på skjermer i terminalen, på nettsider og på skilt. Jeg vil samle det du trenger på ett sted, i en app som er enkel å bruke for alle, også for de som ikke er vant med teknologi.

Målet er at du skal bruke mindre tid på å lete og mer tid på å slappe av før du flyr.

---

## Hva skal appen kunne gjøre?

- Finne flyet ditt: Skriv inn flynummeret, så ser du avgangstid, status og gate.
- Gi beskjed om endringer: Du får et varsel hvis gaten eller tiden endres.
- Vise kart over terminalen: Se hvor gater, butikker, restauranter og toaletter er.
- Vise vei: Få veibeskrivelse til gaten din, også ruter uten trapper.
- Svare på spørsmål: Spør en assistent, for eksempel «Hvor er nærmeste toalett?» eller «Er flyet mitt forsinket?»
- Senere: Vise piler gjennom mobilkameraet som viser veien.

---

## Mobil først, nett som lettversjon

Inne i terminalen går du med telefonen i hånda, så mobilappen er hovedproduktet. Det er bare der du får varsler i lomma, veivisning mens du går og etter hvert kamera-piler.

I tillegg kommer en enkel nettversjon for det du gjør før du er på flyplassen:

- Sjekke flyet og gaten fra PC-en hjemme.
- Se terminalkartet uten å laste ned noe, for eksempel via en lenke eller QR-kode.
- La familie eller venner følge flyet ditt.

Nettversjonen bruker samme kode som appen, så den koster lite ekstra å lage. Varsler og veivisning finnes bare i mobilappen.

---

## Hva er viktig for meg?

- Ærlig informasjon: Appen skal aldri gjette. Flyinformasjonen kommer fra Avinor, som driver flyplassen. Når noe mangler, sier appen det rett ut.
- Enkel å bruke: Rent og oversiktlig design, store knapper og lett lesbar tekst.
- For alle: Appen skal fungere godt for eldre, for de som reiser for første gang og for de med behov for tilgjengelige ruter.

---

## Hvordan bygges appen?

Appen bygges steg for steg:

1. Grunnmuren: Sette opp prosjektet.
2. Utseendet: Lage skjermene: Hjem, Mitt fly, Kart og Assistent.
3. Flyinformasjon: Hente ekte data fra Avinor.
4. Kart: Lage kart over terminalen.
5. Veivisning: Vise vei til gaten.
6. Assistent og varsler
7. Testing og lansering: Teste og publisere i App Store og Google Play.

Under utviklingen bruker vi eksempeldata, og de er alltid tydelig merket som det.

📄 Den tekniske planen finnes i [docs/PLAN.md](docs/PLAN.md).

---

Laget av Khalid Hashi · MIT-lisens
