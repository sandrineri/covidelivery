import React from 'react';

const deleteProduct = () => {
    console.log('clic');
}

const SellerProductsList = (props) => {
    console.log('SellerProductsList props: ', props);
    //console.log(props.productsArrayState.length);

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
                    </li>
                    {props.productsArrayState.map( product => {
                        //console.log('product: ', product);
                        return (
                            <li className="sell-product" key={product.id}>
                                <span className="sell-prod-info sell-product-name">{product.name}</span>
                                <span className="sell-prod-info sell-product-cat">{product.category.toLowerCase()}</span>
                                <span className="sell-prod-info product-origin">{product.origin}</span>
                                <span className="sell-prod-info product-price">{product.price} €</span>
                                <span className="sell-prod-info product-unit">{product.baseUnitName}</span>
                                <span className="sell-prod-info product-promo">{product.promo}</span>
                                <span className="sell-prod-info sell-prod-selectable">{product.selectableUnits}</span>
                                <span className="button sell-modify-btn">
                                    <input type="submit" value="Modifier"></input>
                                </span>
                                <span className="button sell-delete-btn">
                                    <input type="submit" value="Supprimer" onClick={deleteProduct}></input>
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