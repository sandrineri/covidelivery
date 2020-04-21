import React, { useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

import settings from '../config/settings';

//import Order from './Product';

const Orders = (props) => {
    console.log('Orders props: ', props);

    const [orderDetails, setOrderDetails] = useState([]);
    const [currentOrder, setCurrentOrder] = useState([]);
    const [currentOrderDate, setCurrentOrderDate] = useState('');

    const changeStatus = (id, processed, isChecked) => {
        console.log('changeStatus: ', id + '; order: ', processed + '; isChecked: ', isChecked);
        let processedStatus = {}

        if (isChecked === "") {
            processedStatus = {
                "processed": true
            };
        } else {
            processedStatus = {
                "processed": false
            };
        }
        console.log(processedStatus);

        fetch(`${settings.apiBasePath}/order/` + id, {
            method: 'PUT',
            body: JSON.stringify(processedStatus),
            headers: {
                "Authorization": `Bearer ${props.accessToken}`
            }
        })
            .then(response => response.json())
            .then((response) => {
                console.log('fetch ', response);

                setOrderDetails(response);
            })
            .catch(error => {
                console.log(error);
                //setErrorMessage('Le cageot est tombé du camion');
            });

    }

    const seeOrder = (id) => {
        //console.log('clicked id: ', id);
        const thisOrder = props.orders.find(order => {
            //console.log(order);
            return order.id === id
        });

        setCurrentOrder(thisOrder);
        //console.log('currentOrder: ', thisOrder);
        const thisOrderDate = format(new Date(thisOrder.date), 'dd-MM-yyyy');
        //console.log(thisOrderDate);
        setCurrentOrderDate(thisOrderDate);

        fetch(`${settings.apiBasePath}/order/` + id, {
            headers: {
                "Authorization": `Bearer ${props.accessToken}`
            }
        })
            .then(response => response.json())
            .then((response) => {
                console.log('currentOrder fetch ', response);
                //const sortedCurrentOrder = response.sort( (a, b) => (a.categoryName.localeCompare(b.categoryName)))
                setOrderDetails(response);
            })
            .catch(error => {
                console.log(error);
                //setErrorMessage('Le cageot est tombé du camion');
            });

    }

    const printList = () => {
        window.print();
    }

    return (
        <React.Fragment>
            <button onClick={printList}>Imprimer la liste</button>
            
            <article className="orders display-flex" id="orders-to-print">
                <h2>Liste des commandes</h2>
                <ul>
                    <li className="orders-prod-labels">
                        <span>N°</span>
                        <span>Nom</span>
                        <span>Adresse</span>
                        <span>Téléphone</span>
                        <span>E-mail</span>
                        <span>Date</span>
                        <span>Statut</span>
                    </li>
                    {props.orders.map(order => {
                        let isChecked = '';
                        if (order.processed) {
                            isChecked = 'checked';
                        }

                        let status = "A traiter"
                        if (order.processed) {
                            status = "Traitée"
                        }

                        return (
                            <li className="orders-prod" key={order.id}>
                                <span>{order.id}</span>
                                <span>{order.userName}</span>
                                <span>{order.userAddress}</span>
                                <span></span>
                                <span>{order.userEmail}</span>
                                <span>{format(new Date(order.date), 'dd-MM-yyyy', { locale: fr })}</span>
                                <span></span>
                                <span>
                                    <button className="" type="button" value={order.id} onClick={(e) => { seeOrder(Number(e.target.value)) }}>Voir la commande</button>
                                </span>
                                <span>{status}</span>
                                <span>
                                    <input type="checkbox" value={order.id} defaultChecked={isChecked} onChange={(e) => {
                                        console.log('checkbox isChecked: ', order.processed, isChecked);
                                        changeStatus(e.target.value, order.processed, isChecked);
                                    }}></input>
                                </span>
                            </li>
                        )
                    })}
                </ul>
            </article>

            <article className="order display-flex">
                <h2>Commande</h2>
                <section className="delivery-infos-container">
                    <h3>Informations de livraison <span className="deliver-title-sub">(pas de frais de livraison - pas de montant minimum)</span></h3>
                    <div className="delivery-infos">
                        <p className="deliv-label dl1">Nom&nbsp;:
                            <span className="deliv-info deliv-name">{currentOrder.userName}</span>
                        </p>
                        <p className="deliv-label dl2">Commande n°&nbsp;:
                            <span className="deliv-info">{currentOrder.id}</span>
                        </p>
                        <p className="deliv-label dl3">Téléphone&nbsp;:
                            <span className="deliv-info deliv-phone"></span>
                        </p>
                        <p className="deliv-label dl4">E-mail&nbsp;:
                            <span className="deliv-info">{currentOrder.userEmail}</span>
                        </p>
                        <p className="deliv-label dl5">Adresse&nbsp;:
                            <span className="deliv-info deliv-adress">{currentOrder.userAddress}</span>
                        </p>
                        <p className="deliv-label dl6">Date de la commande&nbsp;:
                            <span className="deliv-info">{currentOrderDate}</span>
                        </p>
                        <p className="deliv-label dl7">Complément d'info&nbsp;:
                            <span className="deliv-info"></span>
                        </p>
                        <p className="deliv-label dl8">Réglement par&nbsp;:
                            <span className="deliv-info"></span>
                        </p>
                    </div>
                </section>

                <section className="delivery-order">
                    <ul>
                        <li className="order-prod-labels">
                            <span className="product-info order-cat">Catégorie</span>
                            <span className="product-info order-name">Produit</span>
                            <span className="product-info order-origin">Provenance</span>
                            <span className="product-info order-price">Prix à l'unité</span>
                            <span className="product-info order-quantity">Commande</span>
                        </li>
                        {orderDetails.map(product => {
                            return (
                                <li className="order-prod" key={product.id}>
                                    <span className="product-info order-cat">{product.categoryName.toLowerCase()}</span>
                                    <span className="product-info order-name">{product.name}</span>
                                    <span className="product-info order-origin">{product.origin}</span>
                                    <span className="product-info order-price">{product.price} / {product.baseUnitName}</span>
                                    <span className="product-info order-quantity">{product.amount} {product.selectedUnitName}(s)</span>
                                </li>
                            )
                        })}
                    </ul>
                </section>
            </article>
        </React.Fragment>
    )
}

export default Orders;