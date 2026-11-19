# Level 18 – zo werk je de bedragen bij

Alle bedragen staan in **één bestand**: `data/regels.json`.
De game (`app/index.html`) en de website (`index.html`) worden daaruit gebouwd.

## Stappen (voor mens of AI-agent)
1. Controleer elke waarde in `data/regels.json` bij de bron in `bronnen` (veld `voor` zegt welke sleutels bij welke bron horen).
2. Pas gewijzigde waarden aan. Zet `gecontroleerd` op de datum van vandaag (JJJJ-MM-DD).
   Nieuw jaar? Zet ook `jaar` en `geldig_tot` goed en vervang de bronlinks door die van het nieuwe jaar.
3. Draai `python3 build.py`. Dit bouwt `index.html` en `app/index.html` opnieuw.
4. Test: open `app/index.html`, speel de challenges en het Rekenlab.
5. Laat een mens de wijzigingen goedkeuren (lijst: oude waarde → nieuwe waarde → bron). Pas daarna publiceren.

## Teksten die niet automatisch meeveranderen
De meeste bedragen in teksten zijn sjabloon-velden (`{{er}}`, `{{ht_vrij}}` …) in `app/index.template.html`.
Controleer bij een nieuw jaar daarnaast handmatig:
- het jaartal "2026" in teksten (zoek op `2026` in de sjablonen);
- incassokosten (WIK: 15%, minimaal € 40) in level 3 en de challenge;
- de nieuwsdatum `bnpl_datum` (achteraf betalen) – na een jaar mag die tekst weg of anders;
- statistieken op de website (Nibud, CBS, Wijzer in geldzaken) – vervang door nieuwer onderzoek als dat er is.

## Nooit doen
- Geen bedrag publiceren zonder bron.
- Geen persoonsgegevens of tracking toevoegen.
