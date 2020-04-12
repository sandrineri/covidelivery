import React, { useState, useEffect } from 'react';
import { useAuth0 } from '../auth/Auth0Wrapper';

import Loader from '../components/Loader';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Message from '../components/Message';
import SellerButtons from '../components/SellerButtons';
import SellerProducts from '../components/SellerProducts';

import settings from '../config/settings';
import { isSeller } from '../utils/utils';

const SellerPage = () => {
    console.log('SellerPage ');

    // Authorization
    const [accessToken, setAccessToken] = useState(null);
    const { isAuthenticated, getTokenSilently, user } = useAuth0();
    if (isAuthenticated) {
        getTokenSilently().then(token => {
            setAccessToken(token);
            //console.log('token: ', token);
        });
    }

    const [message, setMessage] = useState('');
    const [lastResponseStatusCode, setLastResponseStatusCode] = useState(null);
    const [modifiedProducts, setModifiedProducts] = useState([]);

    const [productInfo, setProductInfo] = useState({
        products: [],
        families: [],
        categories: [],
        baseUnitOptions: [],
        categoryOptions: []
    });


    useEffect(() => {
        fetch(`${settings.apiBasePath}/products`)
            .then(response => response.json())
            .then((response) => {
                //console.log('fetch complete', response);
                const upperCategories = response.products.map((family) => (family.categories));
                const productsWithoutCategories = [];

                for (let family = 0; family < upperCategories.length; family++) {
                    const categories = upperCategories[family];

                    for (let category = 0; category < categories.length; category++) {
                        const apiProducts = categories[category].products;

                        for (let product = 0; product < apiProducts.length; product++) {
                            productsWithoutCategories.push(apiProducts[product]);
                        }
                    }
                }

                const sortedProductsWithoutCategories = productsWithoutCategories.sort((a, b) => (a.name.localeCompare(b.name)));

                const categoryOptions = response.categories.map(option => ({ value: `${option.id}`, label: `${option.name}`, name: `${option.name}` }));

                setProductInfo({
                    categories: response.categories,
                    families: response.products,
                    products: sortedProductsWithoutCategories,
                    baseUnitOptions: response.units.map(option => ({ value: `${option.id}`, label: `${option.name}`, name: `${option.name}` })),
                    categoryOptions
                });
            });
    }, [lastResponseStatusCode, message]);


    const modifyProducts = () => {
        const modifiedProductsToSend = modifiedProducts.filter(() => true);

        if (modifiedProductsToSend.length > 0) {
            // eslint-disable-next-line no-alert
            if (window.confirm(`Voulez-vous modifier ces produits ? ${JSON.stringify(modifiedProductsToSend.map(product => product.name))} ?`)) {
                fetch(`${settings.apiBasePath}/products`, {
                    method: 'PUT',
                    body: JSON.stringify(modifiedProductsToSend),
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                    .then(response => {
                        if (response.status === 201) {
                            //console.log(order + ' envoyé');
                            return response.json();
                        }
                        throw new Error('Code HTTP incorrect');
                    })
                    .catch(error => {
                        console.log('Erreur de création : ', error);
                    });
            } else {
                // eslint-disable-next-line no-alert
                window.alert('modifier la commande.');
            }
        }
    };

    if (!isSeller(user) || productInfo.products.length === 0 || accessToken === null) {
        return (
        <React.Fragment>
            <Loader />
        </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <Navigation
                accessToken={accessToken}
                setAccessToken={setAccessToken}
                user={user}
                isAuthenticated={isAuthenticated}
            />

            <SellerButtons
                accessToken={accessToken}
                setProductInfo={setProductInfo}
                setMessage={setMessage}
                productInfo={productInfo}
                setLastResponseStatusCode={setLastResponseStatusCode}
            />

            <Message message={message} />

            <article className="sell-products-container">
                <h2>Gérer les produits à vendre</h2>
                <SellerProducts
                    accessToken={accessToken}
                    setMessage={setMessage}
                    {...productInfo}
                    modifiedProducts={modifiedProducts}
                    setModifiedProducts={setModifiedProducts}
                />

                <div className="sell-btn">
                    <button type="button" title="Modifier plusieurs produits" alt="Modifier plusieurs produits" value="" name="" onClick={modifyProducts}>
                        Modifier plusieurs produits
                        <span className="btn-icon">
                            <i className="fas fa-edit" />
                        </span>
                    </button>
                </div>
            </article>

            <Footer />
        </React.Fragment>
    );
};

export default SellerPage;
