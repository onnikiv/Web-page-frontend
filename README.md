# Ongelmat

1.  Parastahan on se että kun fetchataan minkä tahansa `Stadin AO` opiskelijaravintoloiden viikkoruoat englanniksi niin Objektin attribuutti `name` on tyhjä. Suomeksi hakemalla Objekti on kuitenkin niinkuin halutaan.
2.  Toiseksi kaikki `HAMK` ravintolat tuottavat error koodin `500`, silloin kun haetaan `/weekly/`.

    ```json
    {
      "message": "Cannot read properties of undefined (reading 'map')",
      "stack": "Error: Cannot read properties of undefined (reading 'map')\n at getWeeklyMenu (/home/ilkkamtk/apps/sodexo-webscrape/dist/src/api/controllers/restaurantController.js:123:14)\n at process.processTicksAndRejections (node:internal/process/task_queues:95:5)"
    }
    ```

    Käyttämällä fetchissä `/daily` kaikki sujuu hyvin, paitsi että joka ikinen `HAMK` menu Objekti on anyway tyhjä...
