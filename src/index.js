import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import 'bootstrap/dist/js/bootstrap';

// Components
import App from './App';
import LoadingSpinner from './components/LoadingSpinner/index';

// Utils
import languageDetectorOptions from './utils/languageDetectorOptions';
import languagesArray from './utils/languagesArray';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'flag-icon-css/css/flag-icon.min.css';
import './assets/styles/style.css';

const supportedLanguagesArray = languagesArray.map(({ code }) => code);

const fallbackSpinner = LoadingSpinner();

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector) // detect the browser language automatically
  .use(HttpApi) // load resources from a translation.json files
  .init({
    supportedLngs: supportedLanguagesArray,
    fallbackLng: 'en',
    detection: languageDetectorOptions,
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json',
    },
  });

ReactDOM.render(
  <Suspense fallback={fallbackSpinner}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Suspense>,
  document.getElementById('root')
);
