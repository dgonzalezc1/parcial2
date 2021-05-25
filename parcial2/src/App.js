import React from 'react';
import './App.css';
import Table from './components/Table';
import { IntlProvider } from "react-intl";

import localeES from "./locales/es.json";
import localeEN from "./locales/en.json";

const language = window.navigator.language || navigator.browserLanguage;
console.log(language);

function App() {


  const selectMessage = ()=>{
    if (language === "en") {
      return localeEN;
    } else {
       return localeES;
    }
  }


  return (
    <IntlProvider locale={language} messages={selectMessage()}>
      <Table/>
    </IntlProvider>
  );
}

export default App;
