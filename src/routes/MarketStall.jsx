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
    const [baseUnitOptions, setBaseUnitOptions] = useState([]);

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


                const apiBaseUnits = response.units;

                setProductsList(response.products);
                setLastModified(response.lastModified);
                
                setBaseUnitOptions(apiBaseUnits.map( option => {
                    return { value: `${option.id}`, label: `${option.name}`, name: `${option.name}` }
                }));

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
            <Products productsList={productsList} message={errorMessage} lastModified={lastModified} baseUnitOptions={baseUnitOptions} /> 
        </React.Fragment>
    )
    
}

export default MarketStall;