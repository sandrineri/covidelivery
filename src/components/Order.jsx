import React, { useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

import settings from '../config/settings';

const Order = (props) => {
    console.log('Order props: ', props);

   

    
    return (
        <React.Fragment>
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
        </React.Fragment>
    )
}

export default Order;