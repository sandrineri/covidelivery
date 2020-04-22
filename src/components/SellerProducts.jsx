import React from 'react';

import SellerProduct from './SellerProduct';

const SellerProducts = (props) => {
    //console.log('SellerProducts props: ', props);
    //console.log(props.products.length);

    return (
                <ul className="sell-products">
                    <li className="sell-product-labels">
                        <span className="sell-product-label sell-product-label-name">Produit</span>
                        <span className="sell-product-label sell-product-label-cat">Catégorie</span>
                        <span className="sell-product-label">Provenance</span>
                        <span className="sell-product-label">Prix (€)</span>
                        <span className="sell-product-label">Unité</span>
                        <span className="sell-product-label">Promo</span>
                        <span className="sell-product-label sell-prod-label-selec">Unités pour le client</span>
                        <span className="sell-product-label sell-prod-btn">Modifier</span>
                        <span className="sell-product-label sell-prod-btn">Supprimer</span>
                    </li>
                    {props.products.map(product => {
                        //console.log('product: ', product);
                        return (
                            <SellerProduct
                                accessToken={props.accessToken} key={product.id} product={product} setMessage={props.setMessage}
                                categoryOptions={props.categoryOptions} baseUnitOptions={props.baseUnitOptions} modifiedProducts={props.modifiedProducts} setModifiedProducts={props.setModifiedProducts}
                            />
                        )
                    })}
                </ul>
    )
}

export default SellerProducts;