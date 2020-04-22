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
    const [families, setFamilies] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [baseUnitOptions, setBaseUnitOptions] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [modifiedProducts, setModifiedProducts] = useState([]);


    // Authorization
    const [accessToken, setAccessToken] = useState(null);
    const { isAuthenticated, getTokenSilently } = useAuth0();
    if (isAuthenticated) {
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

                const apiBaseUnits = response.units;
                const apiCategories = response.categories;
                //console.log('categories: ', apiCategories);
                setCategories(apiCategories);


                const apiFamilies = response.products;
                //console.log('upperCategories: ', apiFamilies);
                setFamilies(apiFamilies);

                const upperCategories = response.products.map((family) => (family.categories));
                //console.log('upperCategories: ', upperCategories);

                let productsWithoutCategories = [];
                let categoriesOptions = [];

                for (let family = 0; family < upperCategories.length; family++) {
                    const categories = upperCategories[family];
                    //console.log('categories: ', categories);

                    for (let category = 0; category < categories.length; category++) {
                        //console.log('category For loop: ', category);
                        const apiProducts = categories[category].products;


                        categoriesOptions.push({ value: `${categories[category].id}`, label: `${categories[category].name}`, name: `${categories[category].name.toLowerCase()}` });

                        for (let product = 0; product < apiProducts.length; product++) {
                            //apiBaseUnits.push({ value: `${apiProducts[product].baseUnitId}`, label: `${apiProducts[product].baseUnitName}`, name: `${apiProducts[product].baseUnitName}` });
                            //console.log('Product For loop: ', product);
                            productsWithoutCategories.push(apiProducts[product]);
                        }
                    }
                }

                //console.log('Form productsWithoutCategories: ', productsWithoutCategories);
                const sortedProductsWithoutCategories = productsWithoutCategories.sort((a, b) => (a.name.localeCompare(b.name)));
                setProducts(sortedProductsWithoutCategories);

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
    //console.log('SellerPage sortedProductsWithoutCategories: ', products);

    return (
        <React.Fragment>
            <Header />
            <Connect accessToken={accessToken} setAccessToken={setAccessToken} />
            <Message message={message} />
            <SellerButtons accessToken={accessToken} products={products} setMessage={setMessage} baseUnitOptions={baseUnitOptions} families={families} categories={categories} categoryOptions={categoryOptions} />
            <article className="sell-products-container">
                <h2>Gérer les produits à vendre</h2>
                <SellerProducts
                    accessToken={accessToken} products={products} setMessage={setMessage} baseUnitOptions={baseUnitOptions} categoryOptions={categoryOptions} modifiedProducts={modifiedProducts} setModifiedProducts={setModifiedProducts}
                />
                <div className="button sell-btn">
                    <button type="submit" title="Modifier plusieurs produits" alt="Modifier plusieurs produits" value="" name="" onClick={modifyProducts}>
                        Modifier plusieurs produits <i className="fas fa-edit"></i>
                    </button>
                </div>
            </article>  
            <Footer />
        </React.Fragment>
    )
}

export default SellerPage;