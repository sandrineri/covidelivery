import React from 'react';

import SellerProduct from './SellerProduct';

const SellerProducts = (props) => {
    //console.log('SellerProducts props: ', props);
    //console.log(props.productsState.length);

    return (
        <article className="seller-products-list">
            <h2>Produits</h2>

            <div>
                <ul>
                    <li className="sell-product-labels">
                        <span className="sell-product-label sell-product-label-name">Produit</span>
                        <span className="sell-product-label sell-product-label-cat">Catégorie</span>
                        <span className="sell-product-label">Provenance</span>
                        <span className="sell-product-label">Prix (€)</span>
                        <span className="sell-product-label">Unité</span>
                        <span className="sell-product-label">Promo</span>
                        <span className="sell-product-label sell-prod-label-selec">Unités pour le client</span>
                        <span className="sell-product-label">Modifier</span>
                        <span className="sell-product-label">Supprimer</span>
                    </li>
                    {props.productsState.map(product => {
                        //console.log('product: ', product);
                        return (
                            <SellerProduct
                                accessToken={props.accessToken} key={product.id} product={product} setMessage={props.setMessage}
                                categoryOptions={props.categoryOptions}
                            />
                        )
                    })}
                </ul>
            </div>
        </article>
    )
}

export default SellerProducts;