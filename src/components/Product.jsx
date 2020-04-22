import React from 'react';
import Select from 'react-select';


const Product = (props) => {
    //console.log('For each product: ', props);
    //console.log('props baseUnitOptions: ', props.baseUnitOptions);

    const changeProduct = (key, value) => {
        const productToOrder = props.product;
        productToOrder[key] = value;

        const newOrder = props.order;
        newOrder[props.product.id] = productToOrder;
        props.setOrder(newOrder);
    }

    if (props.baseUnitOptions.length === 0) {
        return (<React.Fragment></React.Fragment>);
    }

    const selectableUnitsOptions = props.baseUnitOptions.filter(baseUnitOption => props.product.selectableUnits.includes(baseUnitOption.value));
    //console.log('selectableUnitsOptions: ', selectableUnitsOptions);


    //console.log('Product unitOptions', options);

    return (
        <li className="product" id={props.product.id}>
            <span className="prod-info product-name">{props.product.name}</span>
            <span className="prod-info product-origin">{props.product.origin}</span>
            <span className="prod-info product-price">{props.product.price.replace('.', ',')} €</span>
            <span className="prod-info product-unit">{props.product.baseUnitName}</span>
            <span className="prod-info product-promo">{props.product.promo}</span>
            <span className="prod-info product-basket">
                <input className="quantity-input" type="number" min="1" max="999" onChange={(input) => changeProduct('amount', input.target.value)}></input>
                <Select
                    className="unit-select"
                    closeMenuOnSelect={false}
                    options={selectableUnitsOptions}
                    placeholder={`${props.product.baseUnitName}(s)`}
                    defaultValue={{ value: `${props.product.baseUnitId}`, label: `${props.product.baseUnitName}(s)` }}
                    noOptionsMessage={() => null}
                    onChange={(option) => changeProduct('selectedUnitId', option.value)}
                />
            </span>
        </li>
    )
};

export default Product;