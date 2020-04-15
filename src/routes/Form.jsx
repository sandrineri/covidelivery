import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import _ from 'lodash';
import 'react-tippy/dist/tippy.css';
//import { Tooltip, withTooltip } from 'react-tippy';

import Header from '../components/Header';
import SendFormButton from '../components/SendFormButton';

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

const Form = () => {
    const defaultSaleUnit = '2';

    // const [formProductInfos, setFormProductInfos] = useState( { productName: '', originInput: '', priceNumber: 0, saleUnit: `${defaultSaleUnit}`, promoInput: '', possibleBuyingUnits: ['2', 'grammes', '4'], categoryOption: '' } )

    const [productName, setProductName] = useState('');
    const [originInput, setOriginInput] = useState('');
    const [priceNumber, setPriceNumber] = useState(0.01);
    const [saleUnit, setSaleUnit] = useState(defaultSaleUnit);
    const [promoInput, setPromoInput] = useState('');
    const [possibleBuyingUnits, setPossibleBuyingUnits] = useState(['2', 'grammes', '4']);
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
                    const productsArray = categoriesArray[category].products;
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

                <form className="form">
                    <div className="form-part">
                        <label htmlFor="name">Produit<span className="required-sign">*</span>&nbsp;:</label>
                        <input className="form-input" type="text" name="produit" placeholder="nectarine jaune..." id="name" required onChange={(input) => setProductName(input.target.value)}/>
                    </div>

                    <div className="form-part">
                        <label htmlFor="origin">Provenance&nbsp;:</label>
                        <input className="form-input" type="text" name="origin" placeholder="Bretagne, Espagne..." id="origin" onChange={(input) => setOriginInput(input.target.value)}/>
                    </div>

                    <div className="form-part">
                        <label htmlFor="price">Prix<span className="required-sign">*</span>&nbsp;:</label>
                        <div>
                            <input className="form-input number-input" type="number" name="prix" min="0" placeholder="2,99" step="0.01" lang="fr" id="price" onChange={(input) => setPriceNumber(input.target.value)} />
                            <span> €</span>
                        </div>
                    </div>

                    <div className="form-part">
                        <label htmlFor="unit">Unité<span className="required-sign">*</span>&nbsp;:</label>
                        <CreatableSelect
                            className="form-select form-unit-select"
                            required
                            isClearable
                            options={unitOptions}
                            placeholder="Sélectionnez une unité dans la liste ou créez-en une nouvelle dans cet espace"
                            defaultValue={{ value: 'kilo', label: 'kilo' }}
                            noOptionsMessage={() => null}
                            formatCreateLabel={(value) => `Ajouter ${value}`}
                            onChange={(option) => {
                                if (option !== null) {
                                    setSaleUnit(option.value);
                                }
                                else {
                                    setSaleUnit(defaultSaleUnit);
                                }
                            }}
                                
                        />
                    </div>

                    <div className="form-part">
                        <label htmlFor="promo">Promo&nbsp;:</label>
                        <input className="form-input" type="text" name="promo" placeholder="2 pour 5 €..." id="promo" onChange={(input) => setPromoInput(input.target.value)} />
                    </div>

                    <div className="form-part">
                        <label htmlFor="unit">Unités dans lesquelles vos clients pourront commander<span className="required-sign">*</span>&nbsp;:<br></br>
                        <span className="label-plus">(plusieurs options possibles)</span></label>
                        <CreatableSelect
                            className="form-select form-unit-select"
                            required
                            isClearable
                            isMulti
                            options={unitOptions}
                            placeholder="Sélectionnez la/les unité(s) et/ou créez-en une/des nouvelle(s) ici"
                            defaultValue={{ value: 'kilo', label: 'kilo' }}
                            noOptionsMessage={() => null}
                            formatCreateLabel={(value) => `Ajouter ${value}`}
                            onChange={(option) => {
                                if (option !== null) {
                                    setPossibleBuyingUnits(option.value);
                                }
                                else {
                                    setPossibleBuyingUnits('');
                                }
                            }}
                        />
                    </div>

                    <div className="form-part">
                        <label htmlFor="category">Catégorie dans laquelle vous voulez voir votre produit apparaître<span className="required-sign">*</span>&nbsp;:</label>
                        <CreatableSelect
                            className="form-select form-category-select"
                            required
                            isClearable
                            options={categoryOptions}
                            placeholder="Sélectionnez la catégorie dans la liste ou créez-en une nouvelle dans cet espace"
                            noOptionsMessage={() => null}
                            formatCreateLabel={(value) => `Ajouter ${value}`}
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

                    <div>
                        <SendFormButton productName={productName} originInput={originInput} priceNumber={priceNumber} saleUnit={saleUnit} promoInput={promoInput} possibleBuyingUnits={possibleBuyingUnits} categoryOption={categoryOption} />
                    </div>

                </form>
            </article>
        </React.Fragment>
    )
}

export default Form;