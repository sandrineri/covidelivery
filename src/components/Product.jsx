import React, { useContext } from 'react';
import MaterialSelect from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import OrderContext from '../contexts/OrderContext';

const Product = (props) => {
    //console.log('For each product: ', props);
    const [order, setOrder] = useContext(OrderContext);

    const changeProduct = (key, value) => {
        const productToOrder = props.product;
        productToOrder[key] = value;

        const newOrder = order;
        newOrder[props.product.id] = productToOrder;
        setOrder(newOrder);
    };

    if (props.baseUnitOptions.length === 0) {
        return (<React.Fragment />);
    }

    const selectableUnitsOptions = props.baseUnitOptions.filter(baseUnitOption => props.product.selectableUnits.includes(baseUnitOption.value));

    return (
        <li className="product" id={props.product.id}>
            <span className="prod-info product-name">{props.product.name}</span>
            <span className="prod-info product-origin">{props.product.origin}</span>
            <span className="prod-info product-price">{props.product.price.replace('.', ',')} €</span>
            <span className="prod-info product-unit">{props.product.baseUnitName}</span>
            <span className="prod-info product-promo">{props.product.promo}</span>
            <span className="prod-info product-basket">
                <input className="quantity-input" type="number" min="1" max="999" onChange={(input) => changeProduct('amount', input.target.value)} />
                <FormControl className="select" variant="outlined">
                    <MaterialSelect
                        className="unit-select"
                        defaultValue={props.product.baseUnitId}
                        onChange={(e) => changeProduct('selectedUnitId', e.target.value)}
                    >
                        {selectableUnitsOptions.map(option => (
                            <MenuItem key={option.value} value={option.value}>{option.name}</MenuItem>
                        ))}
                    </MaterialSelect>
                </FormControl>
            </span>
        </li>
    );
};

export default Product;
