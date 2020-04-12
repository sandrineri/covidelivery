import React, { useState } from 'react';
import MaterialSelect from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Chip from '@material-ui/core/Chip';

import settings from '../config/settings';


const SellerProduct = (props) => {
    const [product, setProduct] = useState(props.product);

    const selectableUnitsOptions = props.baseUnitOptions.filter(baseUnitOption => props.product.selectableUnits.includes(baseUnitOption.value));

    const changeProduct = (key, value) => {
        console.log('changeProduct');
        const modifiedProduct = product;
        modifiedProduct[key] = value;
        setProduct(modifiedProduct);

        const newProducts = props.modifiedProducts;
        newProducts[product.id] = modifiedProduct;
        props.setModifiedProducts(newProducts);
    };

    const modifyProduct = () => {
        console.log('product: ', props.product);

        fetch(`${settings.apiBasePath}/product/${props.product.id}`, {
            method: 'PUT',
            body: JSON.stringify(props.product),
            headers: {
                Authorization: `Bearer ${props.accessToken}`
            }
        })
            .then(response => {
                if (response.status === 204) {
                    console.log(`${props.product.name} modifié`);
                    props.setMessage(`Le produit "${props.product.name}" a bien été modifié. La liste sera raffraîchie automatiquement d'ici quelques secondes.`);
                } else {
                    throw new Error('Code HTTP incorrect');
                }
            })
            .catch(error => {
                console.log('Erreur de modification : ', error);
            });
    };

    const deleteProduct = () => {
        //console.log('deleteBtn value: ', `${product.id}; name: `, product.name);

        // eslint-disable-next-line no-alert
        if (window.confirm(`Voulez-vous supprimer définitivement le produit ${product.name} ?`)) {
            fetch(`${settings.apiBasePath}/product/${product.id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${props.accessToken}`
                }
            })
                .then(response => {
                    if (response.status === 204) {
                        console.log(`${product.name} supprimé`);
                        props.setMessage(`Le produit "${product.name}" a bien été supprimé. La liste sera raffraîchie automatiquement d'ici quelques secondes.`);
                    } else {
                        throw new Error('Code HTTP incorrect');
                    }
                })
                .catch(error => {
                    console.log('Erreur de suppression : ', error);
                    props.setMessage(`Erreur de suppression : ${error}`);
                });
        } else {
            console.log('Annulé');
        }
    };

    return (
        <li className="sell-product" key={product.id} id={product.id}>
            <input className="sell-prod-info sell-product-name" id={`name${product.id}`} defaultValue={product.name} onChange={(e) => changeProduct('name', e.target.value)} />

            <FormControl variant="outlined" className="select">
                <MaterialSelect
                className="sell-product-cat"
                    defaultValue={product.categoryId}
                    onChange={(e) => changeProduct('categoryId', e.target.value)}
                >
                    {props.categoryOptions.map(option => (
                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                    ))}
                </MaterialSelect>
            </FormControl>

            <input className="sell-prod-info product-origin" defaultValue={product.origin} onChange={(e) => changeProduct('origin', e.target.value)} />

            <input type="number" className="sell-prod-info product-price" id={`price${product.id}`} defaultValue={product.price} onChange={(e) => changeProduct('price', e.target.value)} />

            <FormControl className="select" variant="outlined">
                <MaterialSelect
                    className="sell-product-unit"
                    //placeholder={product.baseUnitName}
                    defaultValue={product.baseUnitId}
                    onChange={(e) => changeProduct('baseUnitId', e.target.value)}
                >
                    {props.baseUnitOptions.map(option => (
                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                    ))}
                </MaterialSelect>
            </FormControl>

            <input className="sell-prod-info product-promo" defaultValue={product.promo} onChange={(e) => changeProduct('promo', e.target.value)} />

            <FormControl className="select" variant="outlined">
                <MaterialSelect
                    className="sell-prod-selectable"
                    multiple
                    defaultValue={selectableUnitsOptions.map(option => option.value)}
                    onChange={(options) => {
                        if (options !== null) {
                            console.log('options ', options.target.value[0].value);
                            changeProduct('selectableUnits', options.target.value.map(option => option.value));
                        } else {
                            changeProduct('selectableUnits', []);
                        }
                    }}
                    renderValue={(selected) => (
                        <div>
                            {selected.map((value) => (
                                <Chip key={value} label={props.baseUnitOptions.find(option => option.value === value).name} />
                            ))}
                        </div>
                    )}
                >
                    {props.baseUnitOptions.map(option => (
                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                    ))}
                </MaterialSelect>
            </FormControl>

            <span className="sell-prod-btn sell-icon-btn">
                <button type="button" title="Modifier" alt="Modifier" value={product.id} name={product.name} onClick={modifyProduct}>
                    <i className="fas fa-edit" />
                </button>
            </span>

            <span className="sell-prod-btn sell-icon-btn">
                <button type="button" title="Supprimer" alt="Supprimer" value={product.id} name={product.name} onClick={deleteProduct}>
                    <i className="fas fa-trash-alt" />
                </button>
            </span>
        </li>
    );
};

export default SellerProduct;
