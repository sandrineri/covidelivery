import React, { useState, useEffect } from 'react';
import Select from 'react-select'
//import CreatableSelect from 'react-select/creatable';
import _ from 'lodash';
//import 'react-tippy/dist/tippy.css';
//import { Tooltip, withTooltip } from 'react-tippy';

import Header from '../components/Header';
import SendNewProductForm from '../components/SendNewProductForm';
import SellerProductsList from '../components/SellerProductsList';

import settings from '../config/settings';


const Form = () => {
    const [productsArrayState, setProductsArrayState] = useState([]);

    const [productName, setProductName] = useState('');
    const [originInput, setOriginInput] = useState('');
    const [priceNumber, setPriceNumber] = useState(null);
    const [baseUnitId, setBaseUnitId] = useState({ value: '2', label: 'kilo' });
    const [baseUnitIdOptions, setBaseUnitIdOptions] = useState([]);
    const [promoInput, setPromoInput] = useState('');
    const [selectableUnits, setSelectableUnits] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [categoryIdOptions, setCategoryIdOptions] = useState([]);

    useEffect(() => {
        fetch(`${settings.apiBasePath}/products`, {
            headers: {
                //"Authorization": `Bearer ${accessToken}`
            }
        })
            .then(response => response.json())
            .then((products) => {
                console.log('fetch complete', products);

                const familiesArray = products.map((family) => (family.categories));
                let productsArrayWithoutCategories = [];
                let apiBaseUnitIdsArray = [];
                let categoriesOptions = [];

                for (let family = 0; family < familiesArray.length; family++) {
                    const categoriesArray = familiesArray[family];

                    for (let category = 0; category < categoriesArray.length; category++) {
                        //console.log('category For loop: ', category);
                        const productsArray = categoriesArray[category].products;


                        categoriesOptions.push({ value: `${categoriesArray[category].id}`, label: `${categoriesArray[category].name}`, name: `${categoriesArray[category].name.toLowerCase()}` });

                        for (let product = 0; product < productsArray.length; product++) {
                            apiBaseUnitIdsArray.push({ value: `${productsArray[product].baseUnitId}`, label: `${productsArray[product].baseUnitName}`, name: `${productsArray[product].baseUnitName}` });
                            //console.log('Product For loop: ', product);
                            productsArrayWithoutCategories.push(productsArray[product]);
                        }
                    }
                }

                //console.log('Form productsArrayWithoutCategories: ', productsArrayWithoutCategories);
                const sortedProductsArrayWithoutCategories = productsArrayWithoutCategories.sort((a, b) => {
                    if (a.name < b.name) { return -1; }
                    if (a.name > b.name) { return 1; }
                    return 0;
                });
                setProductsArrayState(sortedProductsArrayWithoutCategories);

                //console.log('apiBaseUnitIdsArray : ',apiBaseUnitIdsArray );
                const uniqueArray = _.uniqWith(apiBaseUnitIdsArray, _.isEqual);
                //console.log("uniqueArray: ", uniqueArray);

                setBaseUnitIdOptions(uniqueArray);
                //console.log('baseUnitIdOptions: ', baseUnitIdOptions);
                setCategoryIdOptions(categoriesOptions);
                //console.log('categoryIdOptions: ', categoryIdOptions);
            })
    }, []);

    return (
        <React.Fragment>
            <Header />
            <article>
                <h2>Enregistrer un nouveau produit</h2>

                <p className="instructions-text">Les champs marqués d'un astérisque (<span className="required-sign">*</span>) doivent être remplis.</p>

                <form className="form">
                    <div className="form-part form-part1">
                        <label htmlFor="name">Produit<span className="required-sign">*</span>&nbsp;:</label>
                        <input className="form-input" type="text" name="produit" placeholder="nectarine jaune..." id="name" required onChange={(input) => setProductName(input.target.value)} />
                    </div>

                    <div className="form-part form-part2">
                        <label htmlFor="origin">Provenance&nbsp;:</label>
                        <input className="form-input" type="text" name="origin" placeholder="Bretagne, Espagne..." id="origin" onChange={(input) => setOriginInput(input.target.value)} />
                    </div>

                    <div className="form-part form-part3">
                        <label htmlFor="price">Prix<span className="required-sign">*</span>&nbsp;:</label>
                        <div>
                            <input className="form-input number-input" type="number" name="prix" min="0" placeholder="2,99" step="0.01" lang="fr" id="price" onChange={(input) => setPriceNumber(input.target.value)} />
                            <span> €</span>
                        </div>
                    </div>

                    <div className="form-part form-part4">
                        <label htmlFor="unit">Unité<span className="required-sign">*</span>&nbsp;:</label>
                        <Select
                            className="form-select form-unit-select"
                            required
                            //isClearable
                            options={baseUnitIdOptions}
                            placeholder="Sélectionner"
                            defaultValue={baseUnitId}
                            //noOptionsMessage={() => null}
                            //formatCreateLabel={(value) => `Ajouter ${value}`}
                            onChange={(option) => {
                                if (option !== null) {
                                    setBaseUnitId(option);
                                }
                                else if (option.value === null) {
                                    setBaseUnitId(baseUnitId);
                                    console.log(baseUnitId);
                                }
                            }}

                        />
                    </div>

                    <div className="form-part form-part5">
                        <label htmlFor="promo">Promo&nbsp;:</label>
                        <input className="form-input" type="text" name="promo" placeholder="2 pour 5 €..." id="promo" onChange={(input) => setPromoInput(input.target.value)} />
                    </div>

                    <div className="form-part form-part6">
                        <label htmlFor="unit">Unités dans lesquelles vos clients pourront commander<span className="required-sign">*</span>&nbsp;:<br></br>
                            <span className="label-plus">(plusieurs options possibles)</span></label>
                        <Select
                            className="form-select form-units-select"
                            required
                            //isClearable
                            isMulti
                            options={baseUnitIdOptions}
                            placeholder="Sélectionner"
                            //defaultValue={{ value: '2', label: 'kilo' }}
                            noOptionsMessage={() => null}
                            //formatCreateLabel={(value) => `Ajouter ${value}`}
                            onChange={(option) => {
                                if (option !== null) {
                                    setSelectableUnits(option.value);
                                }
                                else {
                                    setSelectableUnits([]);
                                }
                            }}
                        />
                    </div>

                    <div className="form-part form-part7">
                        <label htmlFor="category">Catégorie dans laquelle vous voulez voir votre produit apparaître<span className="required-sign">*</span>&nbsp;:</label>
                        <Select
                            className="form-select form-category-select"
                            required
                            //isClearable
                            options={categoryIdOptions}
                            placeholder="Sélectionner une catégorie"
                            noOptionsMessage={() => null}
                            //formatCreateLabel={(value) => `Ajouter ${value}`}
                            onChange={(option) => {
                                if (option !== null) {
                                    setCategoryId(option.value);
                                }
                                else {
                                    setCategoryId('');
                                }
                            }}
                        />
                    </div>

                    <div className="form-part form-part8">
                        <SendNewProductForm productName={productName} originInput={originInput} priceNumber={priceNumber} baseUnitId={baseUnitId} promoInput={promoInput} selectableUnits={selectableUnits} categoryId={categoryId} />
                    </div>

                </form>
            </article>
            <SellerProductsList productsArrayState={productsArrayState} />
        </React.Fragment>
    )
}

export default Form;