import React, { useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

import jsPDF from 'jspdf';

import settings from '../config/settings';
import Order from './Order';

import { displayIfNotOnPage, displayIfSeller } from '../utils/utils';


const getStatus = (orderProcessed) => {
    let isChecked = '';
    let status = 'À traiter';

    if (orderProcessed) {
        isChecked = 'checked';
        status = 'Traitée';
    }

    return { isChecked, status };
};


const Orders = (props) => {
    //console.log('Orders props: ', props);

    const [orderDetails, setOrderDetails] = useState([]);
    const [currentOrder, setCurrentOrder] = useState([]);
    const [currentOrderDate, setCurrentOrderDate] = useState('');
    const [ordersDisplay, setOrdersDisplay] = useState('display-flex');
    const [orderDisplay, setOrderDisplay] = useState('display-none');

    const changeStatus = (id, isChecked) => {
        const processedStatus = {
            processed: false
        };

        if (isChecked === '') {
            processedStatus.processed = true;
        }

        fetch(`${settings.apiBasePath}/order/${id}`, {
            method: 'PUT',
            body: JSON.stringify(processedStatus),
            headers: {
                Authorization: `Bearer ${props.accessToken}`
            }
        })
            .then((response) => {
                if (response.status === 204) {
                    //console.log('changeStatus fetch: ', response);
                    props.setLastResponse(response);
                } else {
                    throw new Error('Code HTTP incorrect');
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    const seeOrder = (id) => {
        //console.log('clicked id: ', id);
        const thisOrder = props.orders.find(order => order.id === id);

        setCurrentOrder(thisOrder);
        const thisOrderDate = format(new Date(thisOrder.date), 'dd-MM-yyyy');
        setCurrentOrderDate(thisOrderDate);

        setOrdersDisplay('display-none');
        setOrderDisplay('display-flex');

        fetch(`${settings.apiBasePath}/order/${id}`, {
            headers: {
                Authorization: `Bearer ${props.accessToken}`
            }
        })
            .then(response => response.json())
            .then((response) => {
                setOrderDetails(response);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const printOrders = () => {
            // eslint-disable-next-line new-cap
            const pdf = new jsPDF();

            const test = pdf.getFontList();
            console.log(test);

            const lineHeight = 10;
            const fontSize = 11;
            const marginLeft = 10;
            const maxElementsPerPage = Math.round(fontSize * 2.4);

            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(fontSize);

            const tmpOrders = [...props.orders, ...props.orders, ...props.orders];

            let count = 1;

            pdf.text('N° Nom Adresse Téléphone E-mail Date Statut', marginLeft, lineHeight);

            tmpOrders.forEach(order => {
                console.log('pdf order ', order);
                const { status } = getStatus(order.processed);

                if (count >= maxElementsPerPage) {
                    pdf.addPage();
                    count = 0;
                }
                pdf.text(`${order.id} ${order.userName} ${order.userAddress} ${order.userPhone} ${order.userEmail}  ${status} `, marginLeft, (count * lineHeight) + lineHeight);
                count++;
            });

            console.log(pdf.output('dataurlnewwindow'));
    };

    return (
        <React.Fragment>
            <article className={`orders-container ${ordersDisplay}`}>
                <div className={`print-btn ${displayIfNotOnPage('/mes_commandes')}`}>
                    <button className={`${displayIfNotOnPage('/mes_commandes')}`} type="button" onClick={printOrders}>
                        Imprimer la liste
                        <span className="btn-icon">
                            <i className="fas fa-print" />
                        </span>
                    </button>
                </div>

                <div className="printable-orders">
                    <h2>Liste des commandes</h2>
                    <ul className="orders">
                        <li className="prod-info-labels orders-prod-labels">
                            <span className="orders-info orders-info-label orders-id-label">N°</span>
                            <span className="orders-info orders-info-label orders-name-label">Nom</span>
                            <span className="orders-info orders-info-label orders-adress-label">Adresse</span>
                            <span className="orders-info orders-info-label orders-phone-label">Téléphone</span>
                            <span className="orders-info orders-info-label orders-mail-label">E-mail</span>
                            <span className="orders-info orders-info-label orders-date-label">Date</span>
                            <span className="orders-info orders-info-label orders-btn-label" />
                            <span className={`orders-info orders-info-label orders-status-label ${displayIfNotOnPage('/mes_commandes')}`}>Statut</span>
                        </li>
                        {props.orders.map(order => {
                            const { isChecked, status } = getStatus(order.processed);

                            return (
                                <li className="orders-prod" key={order.id}>
                                    <span className="orders-info orders-id">{order.id}</span>
                                    <span className="orders-info orders-name">{order.userName}</span>
                                    <span className="orders-info orders-adress">{order.userAddress}</span>
                                    <span className="orders-info orders-phone">{order.userPhone}</span>
                                    <span className="orders-info orders-mail">{order.userEmail}</span>
                                    <span className="orders-info orders-date">{format(new Date(order.date), 'dd-MM-yyyy', { locale: fr })}</span>
                                    <span className="orders-info orders-btn">
                                        <button className="" type="button" value={order.id} onClick={(e) => { seeOrder(Number(e.target.value)); }}>
                                            Voir la commande
                                            <span className="btn-icon">
                                                <i className="fas fa-clipboard-list" />
                                            </span>
                                        </button>
                                    </span>
                                    <span className={`orders-info orders-status ${displayIfNotOnPage('/mes_commandes')} ${displayIfSeller}`}>
                                        {status}
                                        <span>
                                            <input
                                                type="checkbox"
                                                value={order.id}
                                                defaultChecked={isChecked}
                                                onChange={(e) => {
                                                    changeStatus(e.target.value, isChecked);
                                                }}
                                            />
                                        </span>
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </article>

            <article className={`order-container ${orderDisplay}`}>
                <Order currentOrder={currentOrder} orderDetails={orderDetails} currentOrderDate={currentOrderDate} setOrderDisplay={setOrderDisplay} setOrdersDisplay={setOrdersDisplay} />
            </article>
        </React.Fragment>
    );
};

export default Orders;
