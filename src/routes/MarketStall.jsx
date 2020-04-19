import React, { useState, useEffect }  from 'react';

import settings from '../config/settings';

import Header from '../components/Header';
import Connect from '../components/Connect';
import Message from '../components/Message';
import Products from '../components/Products';

const MarketStall = () => {
    // Initialize state
    const [errorMessage, setErrorMessage] = useState('');
    const [productsList, setProductsList] = useState([]);
    const [lastModified, setLastModified] = useState("");

    // Set state from API
    useEffect(() => {
        fetch(`${settings.apiBasePath}/products`, {
            headers: {
                //"Authorization": `Bearer ${accessToken}`
            }
        })
            .then(response => response.json())
            .then((response) => {
                console.log('fetch complete', response);

                setProductsList(response.products);
                setLastModified(response.lastModified);

            })
            .catch(error => {
                console.log(error);
                setProductsList([]);
                setErrorMessage('Le cageot brûle');
            });

    }, [] );

    return (
        <React.Fragment>
            <Header />
            <Connect />
            <Message message={errorMessage} />
            <Products productsList={productsList} message={errorMessage} lastModified={lastModified} /> 
        </React.Fragment>
    )
    
}

export default MarketStall;