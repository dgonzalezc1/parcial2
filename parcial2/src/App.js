import React from 'react';
import './App.css';
import Table from './components/Table';
import { IntlProvider } from "react-intl";
import { FormattedMessage} from 'react-intl'

import localeES from "./locales/es.json";
import localeEN from "./locales/en.json";
import Grafica from './components/Grafica';

const language = window.navigator.language || navigator.browserLanguage;
//console.log(language);

function App() {


  const selectMessage = ()=>{
    if (language === "en") {
      return localeEN;
    } else {
       return localeES;
    }
  }

  return (
    <div className="App">
      <IntlProvider locale={language} messages={selectMessage()}>
        <Table/>
        <div className="d3block">
          <h3>
            <FormattedMessage id="Visual"/>
          </h3>
          <Grafica/>
        </div>
      </IntlProvider>
    </div>
  );
}

export default App;
