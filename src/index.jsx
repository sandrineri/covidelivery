// Import Sass stylesheet
import './css/style.scss';
import './css/layout.scss';

// Import React framework and libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from './auth/Auth0Wrapper';

// Import files from project
import settings from './config/settings';
import history from './utils/history';

// Import main jsx module
import App from './App';

// Don't display console.logs in production mode
if (process.env.NODE_ENV === 'production') {
    console.log = () => { };
}

const onRedirectCallback = appState => {
    history.push(
        appState && appState.targetUrl
          ? appState.targetUrl
          : window.location.pathname
    );
};

// Render React elements in DOM
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
