import React from 'react';
import { Router, Route } from 'react-router-dom';

import history from './utils/history';
import MarketStall from './routes/MarketStall';
import Form from './routes/Form';


const App = () => {
    return (
        <Router history={history}>
            <Route path="/" exact render={(props => <MarketStall {...props} />)} />
            <Route path="/formulaire" exact render={(props => <Form {...props} />)} />
        </Router>
    )
}

export default App;