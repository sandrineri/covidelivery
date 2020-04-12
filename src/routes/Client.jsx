import React, { useState, useEffect } from 'react';
import { useAuth0 } from '../auth/Auth0Wrapper';

import settings from '../config/settings';
import { isSeller } from '../utils/utils';

import Loader from '../components/Loader';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Orders from '../components/Orders';

const Client = () => {
    const [orders, setOrders] = useState([]);

    // Authorization
    const [accessToken, setAccessToken] = useState(null);
    const { isAuthenticated, getTokenSilently, user } = useAuth0();
    if (isAuthenticated) {
        getTokenSilently().then(token => {
            setAccessToken(token);
            console.log('token: ', token);
        });
    }

    // Set state of orders from API
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
                setOrders(response);
            })
            .catch(error => {
                console.log(error);
            });
    }, [accessToken]);

    if (isSeller(user) || accessToken === null) {
        return (
            <React.Fragment>
                <Loader />
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <Navigation accessToken={accessToken} setAccessToken={setAccessToken} user={user} isAuthenticated={isAuthenticated} />
            <Orders accessToken={accessToken} orders={orders} />
            <Footer />
        </React.Fragment>
    );
};

export default Client;
