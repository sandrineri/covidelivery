import React from 'react';

const Product = (props) => {
    console.log('For each product: ', props);

    

    return (
        <li className="product">{props.product.name}</li>
    )
};

export default Product;