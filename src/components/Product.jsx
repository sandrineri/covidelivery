import React, {useState} from 'react';

import UnitChooser from './UnitChooser';


const Product = (props) => {
    //console.log('For each product: ', props);

    const [unitState, setUnitState] = useState({value: `${props.product.baseUnitId}`, label: `${props.product.baseUnitName}`});
    console.log('unitState', unitState);

    return (
        <li className="product">
            <span className="product-info product-name">{props.product.name}</span>
            <span className="product-info product-origin">{props.product.origin}</span>
            <span className="product-info product-price">{props.product.price} €</span>
            <span className="product-info product-unit">{props.product.baseUnitName}</span>
            <span className="product-info product-promo">{props.product.promo}</span>
            <span className="product-info product-basket">
                <input className="quantity-input"></input>
                <UnitChooser unit={unitState} setUnitState={setUnitState} />
                <button><i className="fas fa-shopping-basket"></i></button>
            </span>
        </li>
    )
};

export default Product;