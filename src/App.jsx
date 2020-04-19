import React from 'react';
import { Router, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

import history from './utils/history';
import MarketStall from './routes/MarketStall';
import SellerPage from './routes/SellerPage';
import OrdersManagement from './routes/OrdersManagement';


const App = () => {
    return (
        <Router history={history}>
            <Route path="/" exact render={(props => <MarketStall {...props} />)} />
            <PrivateRoute path="/formulaire" exact render={(props => <SellerPage {...props} />)} />
            <Route path="/commandes" exact render={(props => <OrdersManagement {...props} />)} />
        </Router>
    )
}

export default App;