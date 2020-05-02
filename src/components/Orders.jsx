import React, { useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

import settings from '../config/settings';
import Order from './Order';

//import Order from './Product';

const Orders = (props) => {
    //console.log('Orders props: ', props);

    const [orderDetails, setOrderDetails] = useState([]);
    const [currentOrder, setCurrentOrder] = useState([]);
    const [currentOrderDate, setCurrentOrderDate] = useState('');
    const [ordersDisplay, setOrdersDisplay] = useState('display-flex');
    const [orderDisplay, setOrderDisplay] = useState('display-none');

    const changeStatus = (id, processed, isChecked, status) => {
        //console.log('changeStatus: ', id + '; order: ', processed + '; isChecked: ', isChecked + '; status: ', status);
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
        //console.log(processedStatus);

        fetch(`${settings.apiBasePath}/order/` + id, {
            method: 'PUT',
            body: JSON.stringify(processedStatus),
            headers: {
                "Authorization": `Bearer ${props.accessToken}`
            }
        })
            .then((response) => {
                if (response.status === 204) {
                    //console.log('changeStatus fetch: ', response);
                    props.setLastResponse(response);
                }
                else {
                    throw new Error('Code HTTP incorrect');
                }
            })
            .catch(error => {
                //console.log(error);
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

        setOrdersDisplay('display-none');
        setOrderDisplay('display-flex');

        fetch(`${settings.apiBasePath}/order/` + id, {
            headers: {
                "Authorization": `Bearer ${props.accessToken}`
            }
        })
            .then(response => response.json())
            .then((response) => {
                //console.log('currentOrder fetch ', response);
                //const sortedCurrentOrder = response.sort( (a, b) => (a.categoryName.localeCompare(b.categoryName)))
                setOrderDetails(response);
            })
            .catch(error => {
                //console.log(error);
                //setErrorMessage('Le cageot est tombé du camion');
            });

    }

    return (
        <React.Fragment>
            <article className={`orders-container ${ordersDisplay}`}>
                <div className="print-btn">
                    <button>
                        Imprimer la liste
                    <span className="btn-icon">
                            <i className="fas fa-print"></i>
                        </span>
                    </button>
                </div>
                <h2>Liste des commandes</h2>
                <ul className="orders">
                    <li className="prod-info-labels orders-prod-labels">
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
                                <span className="orders-info orders-phone">{order.userPhone}</span>
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
                                            //console.log('checkbox isChecked: ', order.processed, isChecked);
                                            changeStatus(e.target.value, order.processed, isChecked, status);
                                        }}></input>
                                    </span>
                                </span>
                            </li>
                        )
                    })}
                </ul>
            </article>

            <article className={`order-container ${orderDisplay}`}>
                <Order currentOrder={currentOrder} orderDetails={orderDetails} currentOrderDate={currentOrderDate} setOrderDisplay={setOrderDisplay} setOrdersDisplay={setOrdersDisplay} />
            </article>
        </React.Fragment>
    )
}

export default Orders;