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
import BuyerInfos from '../components/BuyerInfos';

const MarketStall = () => {
    // Initialize state
    // Initialisation des variables d'état
    const [errorMessage, setErrorMessage] = useState('');
    const [products, setProducts] = useState([]);
    const [order, setOrder] = useState([]);
    const [lastModified, setLastModified] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');
    const [baseUnitOptions, setBaseUnitOptions] = useState([]);
    const [buyerInfosFormDisplay, setBuyerInfosFormDisplay] = useState('display-none');

    // Authorization
    const [accessToken, setAccessToken] = useState(null);
    const { isAuthenticated, getTokenSilently } = useAuth0();
    if (isAuthenticated) {
        getTokenSilently().then(token => {
            setAccessToken(token);
            //console.log('token: ', token);
        });
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
                    return { value: `${option.id}`, label: `${option.name}(s)`, name: `${option.name}` }
                }));

            })
            .catch(error => {
                console.log(error);
                setProducts([]);
                setErrorMessage('Le cageot brûle');
            });

    }, []);

    //console.log('Marketstall');
    //console.log('order: ', order);
    const sendOrder = () => {
        if (accessToken === null) return;

        const orderToSend = order.filter(() => true).map(product => {
            if (product.selectedUnitId === undefined) {
                product.selectedUnitId = product.baseUnitId
            }
            return product;
        });
        console.log('sendOrder orderToSend: ', orderToSend);

        if (orderToSend.length === 0) {
            window.alert("Vous ne pouvez pas envoyer une commande vide.");
            return;
        }

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
                    //setMessage(`Le produit "${product.name}" a bien été créé. La liste sera raffraîchie automatiquement d'ici quelques secondes. Vous pourrez ensuite la modifier.`);
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
    }

    // Accéder au bouton de commande quand on est connecté
    // let orderBtnDisplay = 'display-flex';
    // if (isAuthenticated) orderBtnDisplay = 'display-none';

    const displayBuyerInfosForm = () => {
        if (buyerInfosFormDisplay === 'display-none') {
            setBuyerInfosFormDisplay('display-flex');
        } else {
            setBuyerInfosFormDisplay('display-none');
        }
    }

    return (
        <React.Fragment>
            <Header />
            <nav>
                <div></div>
                <div className={`user user-buyer ${isAuthenticated ? 'display-flex' : 'display-none'}`}>
                    <button type="submit" onClick={displayBuyerInfosForm}>
                        Gérer vos coordonnées
                        <span className="btn-icon">
                         <i className="fas fa-address-card"></i>
                        </span>
                    </button>
                </div>
                <Connect accessToken={accessToken} setAccessToken={setAccessToken} />
            </nav>
            <Message message={errorMessage} />

            <article className={`form-container buyer-form-container ${buyerInfosFormDisplay}`}>
                <BuyerInfos accessToken={accessToken}/>
            </article>

            <article className="stalls">
                <section className={`${isAuthenticated ? 'display-none' : 'display-flex'}`}>
                    <p className="update-infos update-infos-sub">
                        Pour pouvoir commander, vous devez avoir un compte et être connecté.
                    </p>
                </section>
                <section className={`${isAuthenticated ? 'display-flex' : 'display-none'}`}>
                    <p className="update-infos update-infos-sub">
                        Pour commander, choisissez la quantité des produits que vous voulez puis envoyez la commande avec le bouton en bas de la liste.
                    </p>
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

                <Products order={order} setOrder={setOrder} products={products} message={errorMessage} lastModified={lastModified} baseUnitOptions={baseUnitOptions} />

                <span className={`order-btn ${isAuthenticated ? 'display-flex' : 'display-none'}`}>
                    <button type="submit" onClick={sendOrder}>
                        Envoyer ma commande
                        <span className="btn-icon">
                            <i className="fas fa-paper-plane"></i>
                        </span>
                    </button>
                </span>
            </article>
            <Footer />
        </React.Fragment>
    )

}

export default MarketStall;