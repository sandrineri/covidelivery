import React, { useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

import settings from '../config/settings';

import Order from './Product';

const Orders = (props) => {
    console.log('Orders props: ', props);

    const [order, setOrder] = useState([]);

    const seeOrder = (id) => {
        // const displayOrders = document.getElementsByClassName('orders');
        // console.log(displayOrders)
        //displayOrders.classList.replace('orders display-flex', 'orders display-none');
        fetch(`${settings.apiBasePath}/order/` + id, {
            headers: {
                "Authorization": `Bearer ${props.accessToken}`
            }
        })
            .then(response => response.json())
            .then((response) => {
                console.log('fetch ', response);

                setOrder(response);


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
                                    <button className="" type="button" value={order.id} onClick={(e) => { seeOrder(e.target.value) }}>Voir la commande</button>
                                </span>
                            </li>
                        )
                    })}
                </ul>
            </article>
            <article className="order display-flex">
                <h2>Commande</h2>
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
                </ul>
                {/* <Order order={order} /> */}
            </article>
        </React.Fragment>
    )
}

export default Orders;