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
    const [productsState, setProductsState] = useState([]);

    const [productName, setProductName] = useState('');
    const [originInput, setOriginInput] = useState('');
    const [priceNumber, setPriceNumber] = useState(null);
    const [baseUnit, setBaseUnit] = useState({ value: '2', label: 'kilo' });
    const [baseUnitOptions, setBaseUnitOptions] = useState([]);
    const [promoInput, setPromoInput] = useState('');
    const [selectableUnits, setSelectableUnits] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [categoryOptions, setCategoryOptions] = useState([]);


    //console.log('baseUnitOptions: ', baseUnitOptions);
    //console.log('categoryOptions: ', categoryOptions);
    //console.log('categoryId: ', categoryId);

    useEffect(() => {
        fetch(`${settings.apiBasePath}/products`, {
            headers: {
                //"Authorization": `Bearer ${accessToken}`
            }
        })
            .then(response => response.json())
            .then((response) => {
                console.log('fetch complete', response);

                const families = response.map((family) => (family.categories));
                let productsWithoutCategories = [];
                let apiBaseUnits = [];
                let categoriesOptions = [];

                for (let family = 0; family < families.length; family++) {
                    const categories = families[family];

                    for (let category = 0; category < categories.length; category++) {
                        //console.log('category For loop: ', category);
                        const products = categories[category].products;


                        categoriesOptions.push({ value: `${categories[category].id}`, label: `${categories[category].name}`, name: `${categories[category].name.toLowerCase()}` });

                        for (let product = 0; product < products.length; product++) {
                            apiBaseUnits.push({ value: `${products[product].baseUnitId}`, label: `${products[product].baseUnitName}`, name: `${products[product].baseUnitName}` });
                            //console.log('Product For loop: ', product);
                            productsWithoutCategories.push(products[product]);
                        }
                    }
                }

                //console.log('Form productsWithoutCategories: ', productsWithoutCategories);
                const sortedProductsWithoutCategories = productsWithoutCategories.sort((a, b) => {
                    if (a.name < b.name) { return -1; }
                    if (a.name > b.name) { return 1; }
                    return 0;
                });
                setProductsState(sortedProductsWithoutCategories);

                console.log('apiBaseUnits : ',apiBaseUnits );
                const uniqueBaseUnits = _.uniqWith(apiBaseUnits, _.isEqual);
                console.log("uniqueBaseUnits: ", uniqueBaseUnits);

                setBaseUnitOptions(uniqueBaseUnits);
                setCategoryOptions(categoriesOptions);
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
                            options={baseUnitOptions}
                            placeholder="Sélectionner"
                            defaultValue={baseUnit}
                            //noOptionsMessage={() => null}
                            //formatCreateLabel={(value) => `Ajouter ${value}`}
                            onChange={(option) => {
                                if (option !== null) {
                                    setBaseUnit(option);
                                }
                                else if (option.value === null) {
                                    setBaseUnit(baseUnit);
                                    console.log(baseUnit);
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
                            options={baseUnitOptions}
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
                            options={categoryOptions}
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
                        <SendNewProductForm productName={productName} originInput={originInput} priceNumber={priceNumber} baseUnit={baseUnit} promoInput={promoInput} selectableUnits={selectableUnits} categoryId={categoryId} />
                    </div>

                </form>
            </article>
            <SellerProductsList productsState={productsState} />
        </React.Fragment>
    )
}

export default Form;