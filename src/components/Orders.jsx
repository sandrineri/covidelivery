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

    return (
        <React.Fragment>
            <div className="print-btn">
                <button>
                    Imprimer la liste
                    <span className="btn-icon">
                        <i className="fas fa-print"></i>
                    </span>
                </button>
            </div>

            <article className="orders-container display-flex">
                <h2>Liste des commandes</h2>
                <ul className="orders">
                    <li className="orders-prod-labels">
                        <span className="orders-info orders-info-label orders-id-label">N°</span>
                        <span className="orders-info orders-info-label orders-name-label">Nom</span>
                        <span className="orders-info orders-info-label orders-adress-label">Adresse</span>
                        <span className="orders-info orders-info-label orders-phone-label">Téléphone</span>
                        <span className="orders-info orders-info-label orders-mail-label">E-mail</span>
                        <span className="orders-info orders-info-label orders-date-label">Date</span>
                        <span className="orders-info orders-info-label orders-btn-label"></span>
                        <span className="orders-info orders-info-label orders-status-label">Statut</span>
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
                                <span className="orders-info orders-id">{order.id}</span>
                                <span className="orders-info orders-name">{order.userName}</span>
                                <span className="orders-info orders-adress">{order.userAddress}</span>
                                <span className="orders-info orders-phone"></span>
                                <span className="orders-info orders-mail">{order.userEmail}</span>
                                <span className="orders-info orders-date">{format(new Date(order.date), 'dd-MM-yyyy', { locale: fr })}</span>
                                <span className="orders-info orders-btn">
                                    <button className="" type="button" value={order.id} onClick={(e) => { seeOrder(Number(e.target.value)) }}>
                                        Voir la commande
                                        <span className="btn-icon">
                                            <i className="fas fa-clipboard-list"></i>
                                        </span>
                                    </button>
                                </span>
                                <span className="orders-info orders-status">
                                    {status}
                                    <span>
                                        <input type="checkbox" value={order.id} defaultChecked={isChecked} onChange={(e) => {
                                            console.log('checkbox isChecked: ', order.processed, isChecked);
                                            changeStatus(e.target.value, order.processed, isChecked);
                                        }}></input>
                                    </span>
                                </span>
                            </li>
                        )
                    })}
                </ul>
            </article>

            <article className="order-container display-flex">
                <div className="buttons-container">
                    <div className="print-btn">
                        <button>
                            Imprimer la commande
                            <span className="btn-icon">
                                <i className="fas fa-print"></i>
                            </span>
                        </button>
                    </div>

                    <div className="back-btn">
                        <button>
                            Retourner à la liste
                            <span className="btn-icon">
                                <i className="fas fa-undo-alt"></i>
                            </span>
                        </button>
                    </div>
                </div>

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
                        <li className="order-deliv-labels">
                            <span className="order-info order-name-label">Produit</span>
                            <span className="order-info order-cat-label">Catégorie</span>
                            <span className="order-info order-origin-label">Provenance</span>
                            <span className="order-info order-price-label">Prix à l'unité</span>
                            <span className="order-info order-quantity-label">Commande</span>
                        </li>
                        {orderDetails.map(product => {
                            return (
                                <li className="order-prod" key={product.id}>
                                    <span className="order-info order-name">{product.name}</span>
                                    <span className="order-info order-cat">{product.categoryName.toLowerCase()}</span>
                                    <span className="order-info order-origin">{product.origin}</span>
                                    <span className="order-info order-price">{product.price.replace('.', ',')} € / {product.baseUnitName}</span>
                                    <span className="order-info order-quantity">{product.amount} {product.selectedUnitName}(s)</span>
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