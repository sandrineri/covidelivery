import React, { useState, useEffect } from 'react';
import { useAuth0 } from '../auth/Auth0Wrapper';
//import CreatableSelect from 'react-select/creatable';
//import _ from 'lodash';
//import 'react-tippy/dist/tippy.css';
//import { Tooltip, withTooltip } from 'react-tippy';

import Header from '../components/Header';
import Connect from '../components/Connect';
import CreateProduct from '../components/CreateProduct';
import Message from '../components/Message';
import SellerProducts from '../components/SellerProducts';

import settings from '../config/settings';

const SellerPage = () => {
    const [message, setMessage] = useState('');
    const [productsState, setProductsState] = useState([]);
    const [baseUnitOptions, setBaseUnitOptions] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);

    // Authorization
    const [accessToken, setAccessToken] = useState(null);
    const { isAuthenticated, getTokenSilently } = useAuth0();
    if (isAuthenticated) {
        getTokenSilently().then(token => {
            setAccessToken(token);
            //console.log('token: ', token);
        });
    }

    //console.log('baseUnitOptions: ', baseUnitOptions);
    //console.log('categoryOptions: ', categoryOptions);
    //console.log('categoryId: ', categoryId);

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
                const apiCategories = response.categories;

                const families = response.products.map((family) => (family.categories));



                let productsWithoutCategories = [];
                //let apiBaseUnits = [];
                let categoriesOptions = [];

                for (let family = 0; family < families.length; family++) {
                    const categories = families[family];

                    for (let category = 0; category < categories.length; category++) {
                        //console.log('category For loop: ', category);
                        const products = categories[category].products;


                        categoriesOptions.push({ value: `${categories[category].id}`, label: `${categories[category].name}`, name: `${categories[category].name.toLowerCase()}` });

                        for (let product = 0; product < products.length; product++) {
                            //apiBaseUnits.push({ value: `${products[product].baseUnitId}`, label: `${products[product].baseUnitName}`, name: `${products[product].baseUnitName}` });
                            //console.log('Product For loop: ', product);
                            productsWithoutCategories.push(products[product]);
                        }
                    }
                }

                //console.log('Form productsWithoutCategories: ', productsWithoutCategories);
                const sortedProductsWithoutCategories = productsWithoutCategories.sort((a, b) => (a.name.localeCompare(b.name)));
                setProductsState(sortedProductsWithoutCategories);

                setBaseUnitOptions(apiBaseUnits.map( option => {
                    return { value: `${option.id}`, label: `${option.name}`, name: `${option.name}` }
                }));
                //console.log('baseUnitOptions: ', baseUnitOptions);
                setCategoryOptions(apiCategories.map( option => {
                    return { value: `${option.id}`, label: `${option.name}`, name: `${option.name}` }
                }));
                //console.log('CreateProduct categoryOptions: ', categoryOptions);
            })
    }, []);

    if (accessToken === null) return <React.Fragment></React.Fragment>;

    return (
        <React.Fragment>
            <Header />
            <Connect />
            <div className="buttons-container">
                <input className="button" type="button" value="Voir les commandes"></input>
                <input className="button" type="button" value="Ajouter un produit"></input>
            </div>
            <CreateProduct accessToken={accessToken} setMessage={setMessage} baseUnitOptions={baseUnitOptions} categoryOptions={categoryOptions} />
            <Message message={message} />
            <SellerProducts
                accessToken={accessToken} productsState={productsState} setMessage={setMessage} baseUnitOptions={baseUnitOptions} categoryOptions={categoryOptions}
            />
        </React.Fragment>
    )
}

export default SellerPage;