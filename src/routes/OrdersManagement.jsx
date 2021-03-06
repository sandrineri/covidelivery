import React, { useState, useEffect } from 'react';
import { useAuth0 } from '../auth/Auth0Wrapper';

import settings from '../config/settings';
import { isSeller } from '../utils/utils';

import Loader from '../components/Loader';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Orders from '../components/Orders';

const OrdersManagement = () => {
    const [orders, setOrders] = useState([]);
    const [lastResponse, setLastResponse] = useState(null);

    // Authorization
    const [accessToken, setAccessToken] = useState(null);
    const { isAuthenticated, getTokenSilently, user } = useAuth0();
    if (isAuthenticated) {
        getTokenSilently().then(token => {
            setAccessToken(token);
        });
    }

    useEffect(() => {
        if (accessToken === null) return;

        fetch(`${settings.apiBasePath}/orders?size=10&from=0`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(response => response.json())
            .then((response) => {
                console.log('fetch complete', response);
                const sortedOrders = response.sort((a, b) => {
                    if (a.id < b.id) { return -1; }
                    if (a.id > b.id) { return 1; }
                    return 0;
                });
                // console.log(sortedOrders);
                setOrders(sortedOrders);
            })
            .catch(error => {
                console.log(error);
            });
    }, [accessToken, lastResponse]);

    if (!isSeller(user) || orders.length === 0 || accessToken === null) {
        return (
            <React.Fragment>
                <Loader />
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <Navigation accessToken={accessToken} setAccessToken={setAccessToken} user={user} isAuthenticated={isAuthenticated} />
            <Orders accessToken={accessToken} orders={orders} setLastResponse={setLastResponse} />
            <Footer />
        </React.Fragment>
    );
};

export default OrdersManagement;
