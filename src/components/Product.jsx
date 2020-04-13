import React from 'react';

const Product = (props) => {
    console.log('For each product: ', props);

    

    return (
        <li className="product">
            <span className="product-info product-name">{props.product.name}</span>
            <span className="product-info product-origin">{props.product.origin}</span>
            <span className="product-info product-price">{props.product.price} €</span>
            <span className="product-info product-unit">{props.product.unit}</span>
            <span className="product-info product-promo">{props.product.promo}</span>
        </li>
    )
};

export default Product;