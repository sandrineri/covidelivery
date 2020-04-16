import React, { useState } from 'react';

import settings from '../config/settings';
import { useAuth0 } from '../auth/Auth0Wrapper';


const SellerProductsList = (props) => {
    console.log('SellerProductsList props: ', props);
    //console.log(props.productsState.length);

    // Authorization
    const [accessToken, setAccessToken] = useState(null);
    const { isAuthenticated, getTokenSilently } = useAuth0();
    if (isAuthenticated) {
        getTokenSilently().then(token => {
            setAccessToken(token);
            //console.log('token: ', token);
        });
    }

    const deleteProduct = (value, name) => {
        console.log('deleteBtn value: ', value + '; props: ', name);

        if (accessToken === null) return;

        if (window.confirm('Voulez-vous supprimer définitivement le produit ' + name + ' ?')) {
            console.log(value + ' supprimé');

            fetch(`${settings.apiBasePath}/product/` + value, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            })
                .then(response => {
                    console.log('code http : ', response.status);
                    return response.json();
                })
                .then(function (response) {
                    console.log('envoyé', response);
                })
                .catch(function (error) {
                    console.log('Erreur de mise à jour : ', error);
                });

        } else {
            console.log('Annuler');
        }
        
    }


    return (
        <article className="seller-products-list">
            <h2>Produits</h2>

            <div>
                <ul>
                    <li className="sell-product-labels">
                        <span className="sell-product-label sell-product-label-name">Produit</span>
                        <span className="sell-product-label sell-product-label-cat">Catégorie</span>
                        <span className="sell-product-label">Provenance</span>
                        <span className="sell-product-label">Prix</span>
                        <span className="sell-product-label">Unité</span>
                        <span className="sell-product-label">Promo</span>
                        <span className="sell-product-label sell-prod-label-selec">Unités pour le client</span>
                        <span className="sell-product-label">Modifier</span>
                        <span className="sell-product-label">Supprimer</span>
                    </li>
                    {props.productsState.map(product => {
                        //console.log('product: ', product);
                        return (
                            <li className="sell-product" key={product.id} id={product.id}>
                                <span className="sell-prod-info sell-product-name">{product.name}</span>
                                <span className="sell-prod-info sell-product-cat">{product.category.toLowerCase()}</span>
                                <span className="sell-prod-info product-origin">{product.origin}</span>
                                <span className="sell-prod-info product-price">{product.price} €</span>
                                <span className="sell-prod-info product-unit">{product.baseUnitName}</span>
                                <span className="sell-prod-info product-promo">{product.promo}</span>
                                <span className="sell-prod-info sell-prod-selectable">{product.selectableUnits}</span>
                                <span className="button sell-btn">
                                    <button type="submit" title="Modifier" alt="Modifier" value={product.id} name={product.name}>
                                        <i className="fas fa-edit"></i>
                                    </button>
                                </span>
                                <span className="button sell-btn">
                                    <button type="submit" title="Supprimer" alt="Supprimer" value={product.id} name={product.name} onClick={(e) => {
                                        deleteProduct(e.target.value, e.target.name);
                                    }}>
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </span>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </article>
    )
}

export default SellerProductsList;