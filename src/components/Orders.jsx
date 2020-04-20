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
                console.log('fetch ', response);

                setOrderDetails(response);
            })
            .catch(error => {
                console.log(error);
                //setErrorMessage('Le cageot est tombé du camion');
            });

    }

    return (
        <React.Fragment>
            <article className="orders display-flex">
                <h2>Liste des commandes</h2>
                <ul>
                    <li>
                        <span>N°</span>
                        <span>Nom</span>
                        <span>Adresse</span>
                        <span>Téléphone</span>
                        <span>E-mail</span>
                        <span>Date de la commande</span>
                        <span>Statut</span>
                    </li>
                    {props.orders.map(order => {
                        return (
                            <li key={order.id}>
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
                            </li>
                        )
                    })}
                </ul>
            </article>
            <article className="order display-flex">
                <h2>Commande</h2>
                <section>
                    <h3>Informations de livraison <span>(pas de frais de livraison - pas de montant minimum)</span></h3>
                    <div>
                        <p>Nom&nbsp;:
                            <span> {currentOrder.userName}</span>
                        </p>
                        <p>Commande n°&nbsp;:
                            <span> {currentOrder.id}</span>
                        </p>
                        <p>Téléphone&nbsp;:
                            <span> {}</span>
                        </p>
                        <p>E-mail&nbsp;:
                            <span> {currentOrder.userEmail}</span>
                        </p>
                        <p>Adresse&nbsp;:
                            <span> {currentOrder.userAddress}</span>
                        </p>
                        <p>Date de la commande&nbsp;:
                            <span>{currentOrderDate}</span>
                        </p>
                        <p>Complément d'info&nbsp;:</p>
                        <p>Réglement par&nbsp;:
                            <span></span>
                        </p>
                    </div>
                </section>
                <ul>
                    {orderDetails.map(product => {
                        return (
                            <li key={product.id}>
                                <span>{product.categoryName}</span>
                                <span>{product.name}</span>
                                <span>{product.amount}</span>
                                <span>{product.selectedUnitName}(s)</span>
                            </li>
                        )

                    })}
                </ul>
            </article>
        </React.Fragment>
    )
}

export default Orders;