import React from 'react';
//import Select from 'react-select';
//mport Creatable from 'react-select/creatable';
import CreatableSelect from 'react-select/creatable';

import Header from '../components/Header';

import settings from '../config/settings';

const unitOptions = [
    { value: 'kilo', label: 'kilo' },
    { value: 'pièce', label: 'pièce' },
    { value: 'botte', label: 'botte' },
    { value: 'barquette', label: 'barquette' }
];

let categoryOptions = [];

const Form = () => {
    fetch(`${settings.apiBasePath}/products`, {
        headers: {
            //"Authorization": `Bearer ${accessToken}`
        }
    })
        .then(response => response.json())
        .then((products) => {
            console.log('fetch complete', products);

            const familiesArray = products.map( (family) => (
                    family.categories
            ));

            for (let i = 0; i < familiesArray.length; i++) {
                const categories = familiesArray[i];
                for (let category = 0; category < categories.length; category++) {
                    categoryOptions.push({ value: `${categories[category].id}`, label: `${categories[category].name}` })
                }
            }
        })



    return (
        <React.Fragment>
            <Header />
            <article className="form">
                <h2>Enregistrer un nouveau produit</h2>

                <form>
                    <div className="form-text">
                        <label htmlFor="name">
                            Produit :
                            <input type="text" id="name" required />
                        </label>
                    </div>

                    <div>
                        <label htmlFor="origin">
                            Provenance :
                            <input type="text" id="origin" />
                        </label>
                    </div>

                    <div>
                        <label htmlFor="price">
                            Prix :
                            <input type="number" min="0" step="1.00" id="price" />
                            <span> €</span>
                        </label>
                    </div>

                    <div>
                        <label htmlFor="unit">
                            Unité :
                            <CreatableSelect
                                className="form-select form-unit-select"
                                required
                                isClearable
                                options={unitOptions}
                                placeholder="Sélectionner une unité dans la liste ou en créer une nouvelle dans cet espace"
                                defaultValue={ {value: 'kilo', label: 'kilo'} }
                                noOptionsMessage={() => null}
                                formatCreateLabel={(value) => `Ajouter ${value}`}
                                //onChange={(value) => (props.setUnitState(value.value))}
                            />
                        </label>
                    </div>

                    <div>
                        <label htmlFor="promo">
                            Promo :
                            <input type="text" id="promo" />
                        </label>
                    </div>

                    <div>
                        <label htmlFor="category">
                            Catégorie :
                            <CreatableSelect
                                className="form-select form-category-select"
                                required
                                isClearable
                                options={categoryOptions}
                                placeholder="Sélectionner la catégorie dans laquelle vous souhaitez voir votre produit apparaître dans la liste ou en créer une nouvelle dans cet espace"
                                noOptionsMessage={() => null}
                                formatCreateLabel={(value) => `Ajouter ${value}`}
                                //onChange={(value) => (props.setUnitState(value.value))}
                            />
                        </label>
                    </div>

                </form>
            </article>
        </React.Fragment>
    )
}

export default Form;