import React, { useState } from 'react';

import { useAuth0 } from '../auth/Auth0Wrapper';

import settings from '../config/settings';

const SendNewProductForm = (props) => {
    //console.log('SendNewProductForm: ', props);

    // Authorization
    const [accessToken, setAccessToken] = useState(null);
    const { isAuthenticated, getTokenSilently } = useAuth0();
    if (isAuthenticated) {
        getTokenSilently().then(token => {
            setAccessToken(token);
            //console.log('token: ', token);
        });
    }

    const formProductObject = {
        "name": props.productName,
        "origin": props.originInput,
        "price": props.priceNumber,
        "baseUnitId": props.baseUnit.value,
        "promo": props.promoInput,
        "categoryId": props.categoryId,
        "selectableUnits": props.selectableUnits
    }
    //console.log('formProductObject: ', formProductObject);

    const sendForm = () => {
        //e.preventDefault();

        if (accessToken === null) return;
        if (formProductObject.name !== '') {

            fetch(`${settings.apiBasePath}/product`, {
                method: 'POST',
                body: JSON.stringify(formProductObject),
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            })
                .then(response => {
                    console.log('code http : ', response.status);
                    return response.json();
                })
                .then(function (response) {
                    console.log('envoyé', response);
                })
                .catch(function (error) {
                    console.log('Erreur de mise à jour : ', error);
                });

            //console.log('formProductObject sent', formProductObject);
            
        }
    };

    return (
        <input className="form-send-btn" id="new-product-submit" type="submit" value="Enregistrer" onClick={sendForm}></input>
    )
};

export default SendNewProductForm;