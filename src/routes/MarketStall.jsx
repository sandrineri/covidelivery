import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useAuth0 } from '../auth/Auth0Wrapper';

import OrderContext from '../contexts/OrderContext';
import settings from '../config/settings';

import Loader from '../components/Loader';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Message from '../components/Message';
import Products from '../components/Products';
import BuyerInfos from '../components/BuyerInfos';

import { displayIfClient } from '../utils/utils';

const MarketStall = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [products, setProducts] = useState([]);
    const [order, setOrder] = useState([]);
    const [lastModified, setLastModified] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');
    const [baseUnitOptions, setBaseUnitOptions] = useState([]);
    const [buyerInfosFormDisplay, setBuyerInfosFormDisplay] = useState('display-none');

    // Authorization
    const [accessToken, setAccessToken] = useState(null);
    const { isAuthenticated, getTokenSilently, user } = useAuth0();
    if (isAuthenticated) {
        getTokenSilently().then(token => {
            setAccessToken(token);
            //console.log('token: ', token);
        });
    }

    // Set state of products list from API
    useEffect(() => {
        fetch(`${settings.apiBasePath}/products`)
            .then(response => response.json())
            .then((response) => {
                console.log('fetch complete', response);

                const apiBaseUnits = response.units;

                const lastModifiedDate = new Date(response.lastModified);
                const datePattern = 'eeee d MMMM yyyy';

                const formatLastModif = format(lastModifiedDate, datePattern, { locale: fr });
                const formatDeliveryDate = format(lastModifiedDate.setDate(lastModifiedDate.getDate() + 1), datePattern, { locale: fr });

                setProducts(response.products);
                setLastModified(formatLastModif);
                setDeliveryDate(formatDeliveryDate);

                setBaseUnitOptions(apiBaseUnits.map(option => ({ value: `${option.id}`, label: `${option.name}(s)`, name: `${option.name}` })));
            })
            .catch(error => {
                console.log(error);
                setProducts([]);
                setErrorMessage('Le cageot est tombé du camion');
            });
    }, []);

    const sendOrder = () => {
        if (accessToken === null) return;

        console.log('order : ', order);
        // remove falsy products (not selected for the order)
        const orderToSend = order.filter(() => true).map(product => {
            if (product.selectedUnitId === undefined) {
                return {
                    ...product,
                    selectedUnitId: product.baseUnitId
                };
            }
            return product;
        });
        console.log('sendOrder orderToSend: ', orderToSend);

        if (orderToSend.length === 0) {
            // eslint-disable-next-line no-alert
            window.alert('Vous ne pouvez pas envoyer une commande vide.');
            return;
        }

        fetch(`${settings.apiBasePath}/order`, {
            method: 'POST',
            body: JSON.stringify(orderToSend),
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(response => {
                if (response.status === 201) {
                    console.log(`${order} envoyé`);
                    return response.text();
                }
                throw new Error('Code HTTP incorrect');
            })
            .catch(error => {
                console.log('Erreur de création : ', error);
            });
    };

    // Display order button when logged in
    const displayBuyerInfosForm = () => {
        if (buyerInfosFormDisplay === 'display-none') {
            setBuyerInfosFormDisplay('display-flex');
        } else {
            setBuyerInfosFormDisplay('display-none');
        }
    };

    if (products.length === 0) {
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
                displayBuyerInfosForm={displayBuyerInfosForm}
                isAuthenticated={isAuthenticated}
            />

            <Message message={errorMessage} />

            <article className={`form-container buyer-form-container ${buyerInfosFormDisplay}`}>
                <BuyerInfos accessToken={accessToken} />
            </article>

            <article className="stalls">
                <section className="instructions">
                    <div className={`${isAuthenticated ? 'display-none' : 'display-flex'}`}>
                        <p className="update-infos update-infos-sub">
                            Pour pouvoir commander, vous devez avoir un compte et être connecté.
                        </p>
                    </div>

                    <div className={`${isAuthenticated ? 'display-flex' : 'display-none'}`}>
                        <p className="update-infos update-infos-sub">
                            <span>
                                <i className="fas fa-exclamation-triangle" />
                                &nbsp;<b>Première visite</b>&nbsp;:&nbsp;
                            </span>
                            Remplissez le formulaire dans Gérer mes coordonnées. Ces dernières sont indispensables pour que vos futures commandes puissent être prises en compte.
                        </p>
                        <p className="update-infos update-infos-sub">
                            <b>Pour commander, choisissez la quantité des produits que vous voulez puis envoyez la commande avec le bouton en bas de la liste.</b>
                        </p>
                    </div>
                </section>

                <h2>Liste des produits et tarifs</h2>

                <section className="update">
                    <p className="update-infos update-infos-sup">Mise à jour le&nbsp;
                        <span>{lastModified}</span>
                    </p>
                    <p className="update-infos">Pour une livraison du&nbsp;
                        <span>{deliveryDate}</span>
                    </p>
                    <p className="update-infos update-infos-sub">(Prix et produits actualisés tous les jours en fonction de notre arrivage de Rungis)</p>
                </section>

                <OrderContext.Provider value={[order, setOrder]}>
                    <Products products={products} message={errorMessage} lastModified={lastModified} baseUnitOptions={baseUnitOptions} />
                </OrderContext.Provider>

                <span className={`order-btn ${displayIfClient(user)}`}>
                    <button type="button" onClick={sendOrder}>
                        Envoyer ma commande
                        <span className="btn-icon">
                            <i className="fas fa-paper-plane" />
                        </span>
                    </button>
                </span>
            </article>
            <Footer />
        </React.Fragment>
    );
};

export default MarketStall;
