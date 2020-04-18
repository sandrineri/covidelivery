import React, { useState } from 'react';
import Select from 'react-select';
import settings from '../config/settings';


const SellerProduct = (props) => {
    //console.log('SellerProduct props: ', props);
    const [product, setProduct] = useState(props.product);

    const changeProduct = (key, value) => {
        const modifiedProduct = product;
        modifiedProduct[key] = value;
        setProduct(modifiedProduct);
        ///console.log('modifyOrigin: value: ', value + '; name: ');
    }

    const modifyProduct = () => {
        //console.log('product: ', product);

        fetch(`${settings.apiBasePath}/product/` + product.id, {
            method: 'PUT',
            body: JSON.stringify(product),
            headers: {
                "Authorization": `Bearer ${props.accessToken}`
            }
        })
            .then(response => {
                console.log('code http : ', response.status);
                // if (response.status === 204) {
                //     console.log(name + ' supprimé');
                //     props.setMessage(`Le produit "${name}" a bien été supprimé. La liste sera raffraîchie automatiquement d'ici quelques secondes.`);
                //     setTimeout(() => { document.location.reload(); }, 3000);
                // }
                // else {
                //     throw new Error('Code HTTP incorrect');
                // }

                return response.json();
            })
            .catch(error => {
                console.log('Erreur de modification : ', error);
            });
    }

    const deleteProduct = () => {
        console.log('deleteBtn value: ', product.id + '; name: ', product.name);

        if (window.confirm('Voulez-vous supprimer définitivement le produit ' + product.name + ' ?')) {
            fetch(`${settings.apiBasePath}/product/` + product.id, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${props.accessToken}`
                }
            })
                .then(response => {
                    if (response.status === 204) {
                        console.log(product.name + ' supprimé');
                        props.setMessage(`Le produit "${product.name}" a bien été supprimé. La liste sera raffraîchie automatiquement d'ici quelques secondes.`);
                        //setTimeout(() => { document.location.reload(); }, 3000);
                    }
                    else {
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
    }

    return (
        <li className="sell-product" key={product.id} id={product.id}>
            <input className="sell-prod-info sell-product-name" id={`name${product.id}`} defaultValue={product.name} onChange={(e) => changeProduct('name', e.target.value)}></input>

            <Select
                className="sell-prod-info sell-product-cat"
                placeholder={product.category.toLowerCase()}
                defaultValue={{ value: `${product.categoryId}`, label: `${product.category}`, name: `${product.category}` }}
                options={props.categoryOptions}
                onChange={(e) => changeProduct('categoryId', e.value)}
            />

            <input className="sell-prod-info product-origin" defaultValue={product.origin} onChange={(e) => changeProduct('origin', e.target.value)}></input>

            <input type="number" className="sell-prod-info product-price" id={`price${product.id}`} defaultValue={product.price} onChange={(e) => changeProduct('price', e.target.value)}></input>

            <Select
                className="sell-prod-info product-unit"
                placeholder={product.baseUnitName}
                defaultValue={{ value: `${product.baseUnitId}`, label: `${product.baseUnitName}`, name: `${product.baseUnitName}` }}
                options={props.baseUnitOptions}
                onChange={(e) => changeProduct('baseUnitId', e.value)}
            />

            <input className="sell-prod-info product-promo" defaultValue={product.promo} onChange={(e) => changeProduct('promo', e.target.value)}></input>

            <Select
                className="sell-prod-info sell-prod-selectable"
                placeholder={product.selectableUnits}
                defaultValue={product.selectableUnits}
                noOptionsMessage={() => null}
                isMulti
                options={props.baseUnitOptions}
                //onChange={(e) => changeProduct('selectableUnits', e.value)}
            />

            <span className="button sell-btn">
                <button type="submit" title="Modifier" alt="Modifier" value={product.id} name={product.name} onClick={modifyProduct}>
                    <i className="fas fa-edit"></i>
                </button>
            </span>

            <span className="button sell-btn">
                <button type="submit" title="Supprimer" alt="Supprimer" value={product.id} name={product.name} onClick={deleteProduct}>
                    <i className="fas fa-trash-alt"></i>
                </button>
            </span>
        </li>
    )
};

export default SellerProduct;