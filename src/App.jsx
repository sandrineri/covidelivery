import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

import history from './utils/history';
import MarketStall from './routes/MarketStall';
import SellerPage from './routes/SellerPage';
import OrdersManagement from './routes/OrdersManagement';
import Client from './routes/Client';

import './fontawesome/css/all.min.css';

const App = () => (
    <Router history={history}>
        <Switch>
            <Route path="/" exact render={(props => <MarketStall {...props} />)} />
            <PrivateRoute path="/mes_commandes" exact render={(props => <Client {...props} />)} />
            <PrivateRoute path="/vendeur/produits" exact render={(props => <SellerPage {...props} />)} />
            <Route path="/vendeur/commandes" exact render={(props => <OrdersManagement {...props} />)} />
        </Switch>
    </Router>
);

export default App;
