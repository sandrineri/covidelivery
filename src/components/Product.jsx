import React, { useState } from 'react';
import Select from 'react-select';


const Product = (props) => {
    console.log('For each product: ', props);

    const [order, setOrder] = useState([
        {
            "id": '',
            "amount": '',
            "selectedUnit": ''
        }
    ]);


    const orderProduct = (key, value) => {
        const orderedProduct = order;
        orderedProduct[key] = value;
        setOrder(orderedProduct);
        console.log('orderedProduct: ', orderedProduct);
    }


    let options = [];
    if (props.product.baseUnitName === 'kilo' || props.product.baseUnitName === 'pièce') {
        options = [
            { value: "1", label: "grammes", name: "gramme" },
            { value: "2", label: "kilo(s)", name: "kilo" },
            { value: "4", label: "pièce(s)", name: "pièce" }
        ]
    } else {
        options = [
            { value: `${props.product.baseUnitId}`, label: `${props.product.baseUnitName}(s)`, name: `${props.product.baseUnitName}` },
        ]
    }
    //console.log('Product unitOptions', options);

    return (
        <li className="product" id={props.product.id}>
            <span className="product-info product-name">{props.product.name}</span>
            <span className="product-info product-origin">{props.product.origin}</span>
            <span className="product-info product-price">{props.product.price} €</span>
            <span className="product-info product-unit">{props.product.baseUnitName}</span>
            <span className="product-info product-promo">{props.product.promo}</span>
            <span className="product-info product-basket">
                <input className="quantity-input" type="number" min="0" onChange={(input) => orderProduct('amount', input.target.value)}></input>
                <Select
                    className="unit-select"
                    closeMenuOnSelect={false}
                    options={options}
                    placeholder={`${props.product.baseUnitName}(s)`}
                    defaultValue={{ value: `${props.product.baseUnitId}`, label: `${props.product.baseUnitName}(s)` }}
                    noOptionsMessage={() => null}
                    onChange={(option) => orderProduct('selectedUnit', option.value)}
                />
            </span>
        </li>
    )
};

export default Product;