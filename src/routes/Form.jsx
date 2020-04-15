import React, { useState, useEffect } from 'react';
import Select from 'react-select'
//import CreatableSelect from 'react-select/creatable';
import _ from 'lodash';
import 'react-tippy/dist/tippy.css';
//import { Tooltip, withTooltip } from 'react-tippy';

import Header from '../components/Header';
import SendNewProductForm from '../components/SendNewProductForm';
import SellerProductsList from '../components/SellerProductsList';

import settings from '../config/settings';


/* const placeholder = () => {
    return (
        <Tooltip
  // options
  title="Welcome to React"
  position="bottom"
  trigger="click"
></Tooltip>
    )
}

const placeholderWithTooltip = withTooltip(placeholder, {
    title: 'Welcome to React with tooltip',
  }); */

let unitOptions = [];
let unitArray = [];
let categoryOptions = [];

let productsArray = [];

const Form = () => {
    const [productsArrayState, setProductsArray] = useState(productsArray);

    // const [formProductInfos, setFormProductInfos] = useState( { productName: '', originInput: '', priceNumber: 0, saleUnit: `${defaultSaleUnit}`, promoInput: '', possibleBuyingUnits: ['2', 'grammes', '4'], categoryOption: '' } )

    const [productName, setProductName] = useState('');
    const [originInput, setOriginInput] = useState('');
    const [priceNumber, setPriceNumber] = useState(null);
    const [saleUnit, setSaleUnit] = useState({ value: '2', label: 'kilo' });
    const [promoInput, setPromoInput] = useState('');
    const [possibleBuyingUnits, setPossibleBuyingUnits] = useState([]);
    const [categoryOption, setCategoryOption] = useState('');
    //console.log(formProductInfos);

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

            for (let i = 0; i < familiesArray.length; i++) {
                const categoriesArray = familiesArray[i];
                //console.log('Form categoriesArray: ', categoriesArray);

                for (let category = 0; category < categoriesArray.length; category++) {
                    productsArray = categoriesArray[category].products;
                    setProductsArray(productsArray);
                    //console.log('Form productsArray: ', productsArray);
                    categoryOptions.push({ value: `${categoriesArray[category].id}`, label: `${categoriesArray[category].name}`, name: `${categoriesArray[category].name.toLowerCase()}` });

                    for (let product = 0; product < productsArray.length; product++) {
                        unitArray.push( { value: `${productsArray[product].baseUnitId}`, label: `${productsArray[product].baseUnitName}`, name: `${productsArray[product].baseUnitName}` } );
                    }
                }
            }

            //console.log('unitArray : ',unitArray );
            const uniqueArray = _.uniqWith(unitArray, _.isEqual);
            //console.log("uniqueArray: ", uniqueArray);

            uniqueArray.map(unit => {
                return (
                    unitOptions.push(unit)
                )
            });
            console.log('unitOptions: ', unitOptions);
            console.log('categoryOptions: ', categoryOptions);

        })
    }, [] );

    return (
        <React.Fragment>
            <Header />
            <article>
                <h2>Enregistrer un nouveau produit</h2>

                <p className="instructions-text">Les champs marqués d'un astérisque (<span className="required-sign">*</span>) doivent être remplis.</p>

                <form className="form">
                    <div className="form-part form-part1">
                        <label htmlFor="name">Produit<span className="required-sign">*</span>&nbsp;:</label>
                        <input className="form-input" type="text" name="produit" placeholder="nectarine jaune..." id="name" required onChange={(input) => setProductName(input.target.value)}/>
                    </div>

                    <div className="form-part form-part2">
                        <label htmlFor="origin">Provenance&nbsp;:</label>
                        <input className="form-input" type="text" name="origin" placeholder="Bretagne, Espagne..." id="origin" onChange={(input) => setOriginInput(input.target.value)}/>
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
                            options={unitOptions}
                            placeholder="Sélectionner"
                            defaultValue={saleUnit}
                            //noOptionsMessage={() => null}
                            //formatCreateLabel={(value) => `Ajouter ${value}`}
                            onChange={(option) => {
                                if (option !== null) {
                                    setSaleUnit(option);
                                }
                                else if (option.value === null) {
                                    setSaleUnit(saleUnit);
                                    console.log(saleUnit);
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
                            options={unitOptions}
                            placeholder="Sélectionner"
                            //defaultValue={{ value: '2', label: 'kilo' }}
                            noOptionsMessage={() => null}
                            //formatCreateLabel={(value) => `Ajouter ${value}`}
                            onChange={(option) => {
                                if (option !== null) {
                                    setPossibleBuyingUnits(option.value);
                                }
                                else {
                                    setPossibleBuyingUnits([]);
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
                                    setCategoryOption(option.value);
                                }
                                else {
                                    setCategoryOption('');
                                }
                            }}
                        />
                    </div>

                    <div className="form-part form-part8">
                        <SendNewProductForm productName={productName} originInput={originInput} priceNumber={priceNumber} saleUnit={saleUnit} promoInput={promoInput} possibleBuyingUnits={possibleBuyingUnits} categoryOption={categoryOption} />
                    </div>

                </form>
            </article>
            <SellerProductsList productsArrayState={productsArrayState} />
        </React.Fragment>
    )
}

export default Form;