# TODO vielä...

1. Lisätä nappula joka näyttää lähimmän ravintolan
2. Profiili-sivu
3. Profiili-sivun ominaisuudet
   - Omien tietojen muokkaus
   - Kuvan lisääminen/vaihtaminen
4. Suosikkiravintolan asettaminen
5. Profiilikuvan tallentaminen ja hakeminen tietokannasta käyttäjälle

Muuten aikalailla donski :)

# Ongelmat

1. Kun fetchataan minkä tahansa `Stadin AO` opiskelijaravintoloiden viikkoruoat englanniksi niin Objektin attribuutti `name` on tyhjä. Suomeksi hakemalla Objekti on kuitenkin niinkuin halutaan.
   - **Nykyään 15.4. eteenpäin ->** fetchi toimii englanniksi myös mutta ruoat ovat suomenkielellä, sekä jokaisen viikkopäivän päivämäärät ovat keskenään identtiset. ( ͡° ͜ʖ ͡°)

```json
// Tämän kaltainen ongelma tapahtuu useammassa ravintolassa
// jos fetchi tehdään englanniksi
{
  "days": [
    {
      "date": "Saturday 19 April", // <----
      "courses": [
        { "name": "Lime-korianteriturskaa, perunaa ja kermaviilikastike", "diets": "L" },
        { "name": "Kasviskiusaus vebablastusta", "diets": "M" },
        { "name": "Salaattilounas broileri bbq", "diets": "M" }
      ]
    },
    {
      "date": "Saturday 19 April", // <----
      "courses": [
        { "name": "Salaattilounas fetajuusto", "diets": "L, G" },
        { "name": "Espanjalainen broilerikeitto", "diets": "M, G" },
        { "name": "Juustoinen kukkakaalikeitto", "diets": "L, G" }
      ]
    }
  ]
}
......
```

---

Kaikki `HAMK` ravintolat tuottavat error koodin `500`, silloin kun haetaan `/weekly/`.

```json
{
  "message": "Cannot read properties of undefined (reading 'map')",
  "stack": "Error: Cannot read properties of undefined (reading 'map')\n at getWeeklyMenu (/home/ilkkamtk/apps/sodexo-webscrape/dist/src/api/controllers/restaurantController.js:123:14)\n at process.processTicksAndRejections (node:internal/process/task_queues:95:5)"
}
```

Käyttämällä fetchissä `/daily` kaikki sujuu hyvin, paitsi että joka ikinen `HAMK` menu Objekti on anyway tyhjä...
