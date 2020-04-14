import React from 'react';
import CreatableSelect from 'react-select/creatable';

import Header from '../components/Header';

import settings from '../config/settings';

let unitOptions = [
    { value: 'grammes', label: 'grammes', name: "grammes" },
];

let unitArray = [];

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

            const familiesArray = products.map((family) => (family.categories));

            for (let i = 0; i < familiesArray.length; i++) {
                const categoriesArray = familiesArray[i];
                //console.log('Form categoriesArray: ', categoriesArray);

                for (let category = 0; category < categoriesArray.length; category++) {
                    const productsArray = categoriesArray[category].products;
                    //console.log('Form productsArray: ', productsArray);
                    categoryOptions.push({ value: `${categoriesArray[category].id}`, label: `${categoriesArray[category].name}`, name: `${categoriesArray[category].name.toLowerCase()}` });

                    for (let product = 0; product < productsArray.length; product++) {
                        unitArray.push(productsArray[product].unit);
                    }
                }
            }

            //console.log(unitArray);
            const uniqueArray = [...new Set(unitArray)];
            //console.log(uniqueArray);
            uniqueArray.map(unit => {
                return (
                    unitOptions.push({ value: `${unit}`, label: `${unit}`, name: `${unit}` })
                )
            });
            console.log(unitOptions);
            console.log(categoryOptions);

        })

    return (
        <React.Fragment>
            <Header />
            <article>
                <h2>Enregistrer un nouveau produit</h2>

                <form className="form">
                    <div className="form-part">
                        <label htmlFor="name">Produit&nbsp;:</label>
                        <input className="form-input" type="text" name="produit" placeholder="nectarine jaune..." id="name" required />
                    </div>

                    <div className="form-part">
                        <label htmlFor="origin">Provenance&nbsp;:</label>
                        <input className="form-input" type="text" name="provenance" placeholder="Bretagne, Espagne..." id="origin" />
                    </div>

                    <div className="form-part">
                        <label htmlFor="price">Prix&nbsp;:</label>
                        <div>
                            <input className="form-input" type="number" name="prix" min="0" placeholder="2,99" step="1,00" lang="fr" id="price" />
                            <span> €</span>
                        </div>
                    </div>

                    <div className="form-part">
                        <label htmlFor="unit">Unité&nbsp;:</label>
                        <CreatableSelect
                            className="form-select form-unit-select"
                            required
                            isClearable
                            options={unitOptions}
                            placeholder="Sélectionnez une unité dans la liste ou créez-en une nouvelle dans cet espace"
                            defaultValue={{ value: 'kilo', label: 'kilo' }}
                            noOptionsMessage={() => null}
                            formatCreateLabel={(value) => `Ajouter ${value}`}
                        //onChange={(value) => (props.setUnitState(value.value))}
                        />
                    </div>

                    <div className="form-part">
                        <label htmlFor="promo">Promo&nbsp;:</label>
                        <input className="form-input" type="text" name="promo" placeholder="2 pour 5 €..." id="promo" />
                    </div>

                    <div className="form-part">
                        <label htmlFor="unit">Unités dans lesquelles vos clients pourront commander<br></br>(plusieurs options possibles)&nbsp;:</label>
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
                        //onChange={(value) => (props.setUnitState(value.value))}
                        />
                    </div>

                    <div className="form-part">
                        <label htmlFor="category">Catégorie dans laquelle vous voulez voir votre produit apparaître&nbsp;:</label>
                        <CreatableSelect
                            className="form-select form-category-select"
                            required
                            isClearable
                            options={categoryOptions}
                            placeholder="Sélectionnez la catégorie dans la liste ou créez-en une nouvelle dans cet espace"
                            noOptionsMessage={() => null}
                            formatCreateLabel={(value) => `Ajouter ${value}`}
                        //onChange={(value) => (props.setUnitState(value.value))}
                        />
                    </div>

                    <div >
                        <input className="form-send-btn" id="submit" type="submit" value="Ajouter"></input>
                    </div>

                </form>
            </article>
        </React.Fragment>
    )
}

export default Form;