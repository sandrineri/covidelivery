import React, { useState, useEffect } from 'react';
import { useAuth0 } from '../auth/Auth0Wrapper';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Connect from '../components/Connect';
import SellerButtons from '../components/SellerButtons';
import Message from '../components/Message';
import SellerProducts from '../components/SellerProducts';

import settings from '../config/settings';

const SellerPage = () => {
    // Initialisation des variables d'état
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

    // Authorization
    const [accessToken, setAccessToken] = useState(null);
    const { isAuthenticated, getTokenSilently, user } = useAuth0();
    if (isAuthenticated) {
        console.log(user);
        getTokenSilently().then(token => {
            setAccessToken(token);
            //console.log('token: ', token);
        });
    }

    const modifyProducts = () => {
        //if (accessToken === null) return;

        //console.log('modifiedProducts: ', modifiedProducts);

        const modifiedProductsToSend = modifiedProducts.filter(() => true);
        //console.log('modifiedProductsToSend: ', modifiedProductsToSend);

        if (modifiedProductsToSend !== []) {
            if (window.confirm('Voulez-vous modifier ces produits ? ' + JSON.stringify(modifiedProductsToSend.map(product => product.name)) + ' ?')) {
                fetch(`${settings.apiBasePath}/products`, {
                    method: 'PUT',
                    body: JSON.stringify(modifiedProductsToSend),
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                })
                    .then(response => {
                        if (response.status === 201) {
                            //console.log(order + ' envoyé');
                            // props.setMessage(`Le produit "${product.name}" a bien été créé. La liste sera raffraîchie automatiquement d'ici quelques secondes. Vous pourrez ensuite la modifier.`);
                            //setTimeout(() => { document.location.reload(); }, 3000);
                            return response.json();
                        }
                        else {
                            throw new Error('Code HTTP incorrect');
                        }
                    })
                    .catch(error => {
                        console.log('Erreur de création : ', error);
                        //props.setMessage(`Erreur de création : ${error}`);
                    });
            } else {
                window.alert('modifier la commande.');
            }
        }


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

                const upperCategories = response.products.map((family) => (family.categories));
                //console.log('upperCategories: ', upperCategories);

                let productsWithoutCategories = [];

                for (let family = 0; family < upperCategories.length; family++) {
                    const categories = upperCategories[family];
                    //console.log('categories: ', categories);

                    for (let category = 0; category < categories.length; category++) {
                        //console.log('category For loop: ', category);
                        const apiProducts = categories[category].products;

                        for (let product = 0; product < apiProducts.length; product++) {
                            //apiBaseUnits.push({ value: `${apiProducts[product].baseUnitId}`, label: `${apiProducts[product].baseUnitName}`, name: `${apiProducts[product].baseUnitName}` });
                            //console.log('Product For loop: ', product);
                            productsWithoutCategories.push(apiProducts[product]);
                        }
                    }
                }

                const sortedProductsWithoutCategories = productsWithoutCategories.sort((a, b) => (a.name.localeCompare(b.name)));
                
                const categoryOptions = response.categories.map( option => {
                    return { value: `${option.id}`, label: `${option.name}`, name: `${option.name}` }
                });

                setProductInfo({
                    categories: response.categories,
                    families: response.products,
                    products: sortedProductsWithoutCategories,
                    baseUnitOptions: response.units.map( option => {
                        return { value: `${option.id}`, label: `${option.name}`, name: `${option.name}` }
                    }),
                    categoryOptions: categoryOptions
                });
                
                let autocompleteCategoryOptions = [];
                autocompleteCategoryOptions = categoryOptions.map(option => {
                    return {
                        ...option,
                        name: option.name.toLowerCase()
                    }
                })

                console.log('proautocompleteCategoryOptionsductInfo: ', autocompleteCategoryOptions);
            })
    }, [lastResponseStatusCode]);

    if (accessToken === null) return <React.Fragment></React.Fragment>;
    //console.log('SellerPage sortedProductsWithoutCategories: ', products);

    return (
        <React.Fragment>
            <Header />
            <nav>
                <div></div>
                <Connect accessToken={accessToken} setAccessToken={setAccessToken} user={user} />
            </nav>
            
            <SellerButtons accessToken={accessToken} setMessage={setMessage} {...productInfo} setLastResponseStatusCode={setLastResponseStatusCode} />
            <Message message={message} />
            <article className="sell-products-container">
                <h2>Gérer les produits à vendre</h2>
                <SellerProducts
                    accessToken={accessToken} setMessage={setMessage}
                    {...productInfo}
                    modifiedProducts={modifiedProducts} setModifiedProducts={setModifiedProducts}
                />
                <div className="sell-btn">
                    <button type="submit" title="Modifier plusieurs produits" alt="Modifier plusieurs produits" value="" name="" onClick={modifyProducts}>
                        Modifier plusieurs produits
                        <span className="btn-icon">
                            <i className="fas fa-edit"></i>
                        </span>
                    </button>
                </div>
            </article>  
            <Footer />
        </React.Fragment>
    )
}

export default SellerPage;