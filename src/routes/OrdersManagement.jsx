import React, { useState, useEffect } from 'react';
import { useAuth0 } from '../auth/Auth0Wrapper';

import settings from '../config/settings';

import Header from '../components/Header';
import Footer from '../components/Footer';
//import Message from '../components/Message';
import Orders from '../components/Orders';

const OrdersManagement = () => {
    // Initialisation du state
    //const [errorMessage, setErrorMessage] = useState('');
    const [orders, setOrders] = useState([]);

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
                //console.log('fetch complete', response);

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

    }, [accessToken]);

    if (accessToken === null) return <React.Fragment></React.Fragment>;

    return (
        <React.Fragment>
            <Header />
            {/* <Message message={errorMessage} /> */}
            <Orders accessToken={accessToken} orders={orders} />
            <Footer />
        </React.Fragment>
    )
}

export default OrdersManagement;