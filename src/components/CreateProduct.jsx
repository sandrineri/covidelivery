import React, { useState } from 'react';
import Select from 'react-select';
import settings from '../config/settings';

const CreateProduct = (props) => {
    //console.log('CreateProduct props: ', props);

    const [product, setProduct] = useState({
        "name": '',
        "origin": '',
        "price": null,
        "baseUnitId": '2',
        "promo": '',
        "categoryId": '',
        "selectableUnits": []
    });

    const changeProduct = (key, value) => {
        //console.log('CreateProduct props: ', props);

        let registeredProduct = '';
        if (['selectableUnits', 'baseUnitId', 'baseUnitId'].includes(key)) return;
        registeredProduct = props.products.filter( product => {
            return product[key].toLowerCase().includes(value);
        }).map(product => product[key]);
        console.log('registeredProduct: ', registeredProduct);
        

        const modifiedProduct = product;
        modifiedProduct[key] = value;
        //console.log('modifiedProduct[key]', modifiedProduct[key]);
        setProduct(modifiedProduct);
        //console.log('createdProduct: ', modifiedProduct);
    }

    //console.log('CreateProduct product: ', product);

    const sendForm = (e) => {
        e.preventDefault();

        if (product.name !== '') {

            fetch(`${settings.apiBasePath}/product`, {
                method: 'POST',
                body: JSON.stringify(product),
                headers: {
                    "Authorization": `Bearer ${props.accessToken}`
                }
            })
                .then(response => {
                    if (response.status === 201) {
                        console.log(product.name + ' créé');
                        props.setMessage(`Le produit "${product.name}" a bien été créé. La liste sera raffraîchie automatiquement d'ici quelques secondes. Vous pourrez ensuite la modifier.`);
                        //setTimeout(() => { document.location.reload(); }, 3000);
                    }
                    else {
                        throw new Error('Code HTTP incorrect');
                    }
                })
                .catch(error => {
                    console.log('Erreur de création : ', error);
                    props.setMessage(`Erreur de création : ${error}`);
                });

            //console.log('formProductObject sent', formProductObject);
        }
    };

    return (
        <React.Fragment>
            <h2>Enregistrer un nouveau produit</h2>

            <p className="instructions-text">Les champs marqués d'un astérisque (<span className="required-sign">*</span>) sont obligatoires.</p>

            <form className="form new-prod-form">
                <div className="form-part form-part1">
                    <label htmlFor="name">Produit<span className="required-sign">*</span>&nbsp;:</label>
                    <input className="form-input" type="text" name="produit" placeholder="nectarine jaune..." id="name" required onChange={(input) => changeProduct('name', input.target.value)} />
                </div>

                <div className="form-part form-part2">
                    <label htmlFor="origin">Provenance&nbsp;:</label>
                    <input className="form-input" type="text" name="origin" placeholder="Bretagne, Espagne..." id="origin" onChange={(input) => changeProduct('origin', input.target.value)} />
                </div>

                <div className="form-part form-part3">
                    <label htmlFor="price">Prix<span className="required-sign">*</span>&nbsp;:</label>
                    <div>
                        <input className="form-input number-input" type="number" name="prix" min="0" placeholder="2,99" step="0.01" lang="fr" id="price" onChange={(input) => changeProduct('price', input.target.value)} />
                        <span> €</span>
                    </div>
                </div>

                <div className="form-part form-part4">
                    <label htmlFor="unit">Unité<span className="required-sign">*</span>&nbsp;:</label>
                    <Select
                        className="form-select form-unit-select"
                        required
                        //isClearable
                        options={props.baseUnitOptions}
                        placeholder="Sélectionner"
                        defaultValue={ {value: '2', label: 'kilo', name: 'kilo' } }
                        //noOptionsMessage={() => null}
                        //formatCreateLabel={(value) => `Ajouter ${value}`}
                        onChange={(option) => {
                            if (option !== null) {
                                changeProduct('baseUnitId', option.value);
                            }
                            else if (option.value === null) {
                                changeProduct('baseUnitId', product.baseUnitId);
                                console.log(product.baseUnitId);
                            }
                        }}

                    />
                </div>

                <div className="form-part form-part5">
                    <label htmlFor="promo">Promo&nbsp;:</label>
                    <input className="form-input" type="text" name="promo" placeholder="2 pour 5 €..." id="promo" onChange={(input) => changeProduct('promo', input.target.value)} />
                </div>

                <div className="form-part form-part6">
                    <label htmlFor="unit">Unités dans lesquelles vos clients pourront commander<span className="required-sign">*</span>&nbsp;:<br></br>
                        <span className="label-plus">(plusieurs options possibles)</span></label>
                    <Select
                        className="form-select form-units-select"
                        isMulti
                        options={props.baseUnitOptions}
                        placeholder="Sélectionner"
                        //defaultValue={{ value: '2', label: 'kilo' }}
                        noOptionsMessage={() => null}
                        //formatCreateLabel={(value) => `Ajouter ${value}`}
                        onChange={(options) => {
                            if (options !== null) {
                                changeProduct('selectableUnits', options.map(option => option.value));
                                //console.log('selectable: ', option.value)
                            }
                            else {
                                changeProduct('selectableUnits', []);
                            }
                        }}
                    />
                </div>

                <div className="form-part form-part7">
                    <label htmlFor="category">Catégorie dans laquelle votre produit apparaîtra<span className="required-sign">*</span>&nbsp;:</label>
                    <Select
                        className="form-select form-category-select"
                        required
                        //isClearable
                        options={props.categoryOptions}
                        placeholder="Sélectionner une catégorie"
                        noOptionsMessage={() => null}
                        //formatCreateLabel={(value) => `Ajouter ${value}`}
                        onChange={(option) => {
                            if (option !== null) {
                                changeProduct('categoryId', option.value);
                            }
                            else {
                                changeProduct('categoryId', '');
                            }
                        }}
                    />
                </div>

                <div className="form-part form-part8">
                    <input className="form-send-btn" id="new-product-submit" type="submit" value="Enregistrer" onClick={sendForm}></input>
                </div>
            </form>
        </React.Fragment>
    )
}

export default CreateProduct;