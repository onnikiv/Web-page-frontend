/**
 * Fetches data from the given URL with the specified options.
 *
 * @param {string} URL - The URL to fetch data from.
 * @param {Object} [options] - The options to pass to the fetch request.
 * @returns {Promise<Object>} The JSON response from the fetch request.
 * @throws {Error} If the response is not ok.
 */
async function fetchData(url, options = {}) {
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    if (!response.ok) {
      if (json.message) {
        throw new Error(`${json.message}, code:${response.status}`);
      }
      throw new Error(`Error ${response.status} occured!`);
    }
    return json;
  } catch (error) {
    console.error('Fetch error:', error);
    console.warn(
      `Olet nähtävästi klikannut johonkin HAMK ravintolaan \n
      /weekly/ haku ei yksinkertaisesti vain toimi HAMK ravintoloihin.
      Korjaus olisi hakea HAMK ravintolat /daily/ fetchillä, mikä tuottaa
      tulosta, mutta olisi turhaa sillä objekti on anyway tyhjä.
      Toivottavasti API korjataan tulevaisuudessa.
    `
    );
  }
}

const sortByName = (a, b) => {
  return a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1;
};

export {sortByName, fetchData};
