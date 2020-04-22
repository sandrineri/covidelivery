import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

import history from './utils/history';
import MarketStall from './routes/MarketStall';
import SellerPage from './routes/SellerPage';
import OrdersManagement from './routes/OrdersManagement';


const App = () => {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/" exact render={(props => <MarketStall {...props} />)} />
                <PrivateRoute path="/formulaire" exact render={(props => <SellerPage {...props} />)} />
                <Route path="/commandes" exact render={(props => <OrdersManagement {...props} />)} />
            </Switch>
        </Router>
    )
}

export default App;