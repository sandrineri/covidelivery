// import des feuilles de style en SASS (scss)
import './css/style.scss';
import './css/layout.scss';

// import du framework React et de sa plateforme web ReactDOM
import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from './auth/Auth0Wrapper';

import settings from './config/settings';
import history from "./utils/history";

// import du module jsx principal
import App from './App';


const onRedirectCallback = appState => {
    history.push(
        appState && appState.targetUrl
          ? appState.targetUrl
          : window.location.pathname
    );
};

// Rendu des éléments React dans le DOM
ReactDOM.render(
    <Auth0Provider
        domain={settings.domain}
        client_id={settings.client_id}
        redirect_uri={window.location.origin}
        onRedirectCallback={onRedirectCallback}
    >
        <App />
    </Auth0Provider>, 
    document.getElementById('covidelivery')
    );
    