import React, { useState, useEffect } from 'react';
import { useAuth0 } from '../auth/Auth0Wrapper';

import settings from '../config/settings';

import Header from '../components/Header';
import Footer from '../components/Footer';
//import Message from '../components/Message';
import Orders from '../components/Orders';
import Connect from '../components/Connect';

const OrdersManagement = () => {
    // Initialisation du state
    //const [errorMessage, setErrorMessage] = useState('');
    const [orders, setOrders] = useState([]);
    const [lastResponse, setLastResponse] = useState(null);

    // Authorization
    const [accessToken, setAccessToken] = useState(null);
    const { isAuthenticated, getTokenSilently } = useAuth0();
    if (isAuthenticated) {
        getTokenSilently().then(token => {
            setAccessToken(token);
            console.log('token: ', token);
        });
    }

    // Récupérer le state depuis l'API
    useEffect(() => {
        if (accessToken === null) return;

        fetch(`${settings.apiBasePath}/orders?size=10&from=0`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        })
            .then(response => response.json())
            .then((response) => {
                console.log('fetch complete', response);

                const sortedOrders = response.sort((a, b) => {
                    if(a.id < b.id) { return -1; }
                    if(a.id > b.id) { return 1; }
                    return 0;
                });
                //console.log(sortedOrders);
                setOrders(sortedOrders);
                
            })
            .catch(error => {
                console.log(error);
                //setErrorMessage('Le cageot est tombé du camion');
            });

    }, [accessToken, lastResponse]);

    if (accessToken === null) return <React.Fragment></React.Fragment>;

    return (
        <React.Fragment>
            <Header />
            <nav>
                <div></div>
                <Connect accessToken={accessToken} setAccessToken={setAccessToken} />
            </nav>
            {/* <Message message={errorMessage} /> */}
            <Orders accessToken={accessToken} orders={orders} setLastResponse={setLastResponse} />
            <Footer />
        </React.Fragment>
    )
}

export default OrdersManagement;