// import des feuilles de style en SASS (scss)
import './css/style.scss';
import './css/layout.scss';

// import du framework React et de sa plateforme web ReactDOM
import React from 'react';
import ReactDOM from 'react-dom';

//import history from "./utils/history";

// import du module jsx principal
import App from './App';


// const onRedirectCallback = appState => {
//     history.push(
//         appState && appState.targetUrl
//           ? appState.targetUrl
//           : window.location.pathname
//     );
// };

// Rendu des éléments React dans le DOM
ReactDOM.render(<App />, document.getElementById('covidelivery'));
    