// haetaan kieli localista, TAI sitten html:stä
let LANGUAGE = localStorage.getItem('LANGUAGE') || document.documentElement.lang;
document.documentElement.lang = LANGUAGE;

const languageButton = document.getElementById('language-button');
languageButton.textContent = LANGUAGE.toUpperCase();
languageButton.addEventListener('click', () => {
  LANGUAGE = LANGUAGE === 'fi' ? 'en' : 'fi';
  document.documentElement.lang = LANGUAGE;
  languageButton.textContent = LANGUAGE.toUpperCase();
  localStorage.setItem('LANGUAGE', LANGUAGE);
  location.reload();
});

const getLanguage = () => {
  return LANGUAGE;
};

export default getLanguage;
