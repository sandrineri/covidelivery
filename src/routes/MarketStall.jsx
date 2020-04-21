import React, { useState, useEffect } from 'react';
import { useAuth0 } from '../auth/Auth0Wrapper';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

import settings from '../config/settings';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Connect from '../components/Connect';
import Message from '../components/Message';
import Products from '../components/Products';

const MarketStall = () => {
    // Initialize state
    // Initialisation des variables d'état
    const [errorMessage, setErrorMessage] = useState('');
    const [products, setProducts] = useState([]);
    const [order, setOrder] = useState([]);
    const [lastModified, setLastModified] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');
    const [baseUnitOptions, setBaseUnitOptions] = useState([]);

    // Authorization
    const [accessToken, setAccessToken] = useState(null);
    const { isAuthenticated, getTokenSilently } = useAuth0();
    if (isAuthenticated) {
        getTokenSilently().then(token => {
            setAccessToken(token);
            console.log('token: ', token);
        });
    }

    //console.log('order: ', order);
    const sendOrder = () => {
        if (accessToken === null) return;

        const orderToSend = order.filter(() => true).map(product => {
            if (product.selectedUnitId === undefined) {
                product.selectedUnitId = product.baseUnitId
            }
            return product;
        });
        //console.log('sendOrder orderToSend: ', orderToSend);

        if (orderToSend !== []) {
            if (window.confirm('Voulez-vous envoyer cette commande ? ' + JSON.stringify(orderToSend) + ' ?')) {
                fetch(`${settings.apiBasePath}/order`, {
                    method: 'POST',
                    body: JSON.stringify(orderToSend),
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


    // Set state from API
    // Met à jour l'état de la liste des produits en appelant l’API
    useEffect(() => {

        fetch(`${settings.apiBasePath}/products`)
            .then(response => response.json())
            .then((response) => {
                console.log('fetch complete', response);

                const apiBaseUnits = response.units;

                const lastModifiedDate = new Date(response.lastModified);
                const datePattern = 'eeee d MMMM yyyy';

                const formatLastModif = format(lastModifiedDate, datePattern, { locale: fr });
                //console.log('formatLastModif: ', formatLastModif);
                const formatDeliveryDate = format(lastModifiedDate.setDate(lastModifiedDate.getDate() + 1), datePattern, { locale: fr });

                setProducts(response.products);
                setLastModified(formatLastModif);
                setDeliveryDate(formatDeliveryDate);

                setBaseUnitOptions(apiBaseUnits.map(option => {
                    return { value: `${option.id}`, label: `${option.name}`, name: `${option.name}` }
                }));

            })
            .catch(error => {
                console.log(error);
                setProducts([]);
                setErrorMessage('Le cageot brûle');
            });

    }, []);

    //console.log('Marketstall');

    return (
        <React.Fragment>
            <Header />
            <Connect />
            <Message message={errorMessage} />
            <article className="stalls">
                <h2>Liste des produits et tarifs</h2>
                <div className="update-infos">
                    <p>Mise à jour le&nbsp;
                        <span>{lastModified}</span>
                    </p>
                    <p className="update-infos">Pour une livraison du&nbsp;
                        <span>{deliveryDate}</span>
                    </p>
                    <p className="update-infos update-infos-sub">(Prix et produits actualisés tous les jours en fonction de notre arrivage de Rungis)</p>
                </div>
                <Products order={order} setOrder={setOrder} products={products} message={errorMessage} lastModified={lastModified} baseUnitOptions={baseUnitOptions} />
                <span className="button">
                    <button type="submit" onClick={sendOrder}><i className="fas fa-shopping-basket"></i></button>
                </span>
            </article>
            <Footer />
        </React.Fragment>
    )

}

export default MarketStall;