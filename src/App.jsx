import React from 'react';
import { Router, Route } from 'react-router-dom';

import history from './utils/history';
import MarketStall from './routes/MarketStall';


const App = () => {
    return (
        <Router history={history}>
            <Route path="/" exact render={(props => <MarketStall {...props} />)} />
        </Router>
    )
}

export default App;