import React from 'react';
import Select from 'react-select';

const ManageCategories = (props) => {
    console.log('ManageCategories props: ', props);

    let familyOptions = [
        { value: "0", label: "Sera une nouvelle famille", name: "Sera une nouvelle famille" }
    ];
    props.families.forEach(family => {
        familyOptions.push({ value: `${family.id}`, label: `${family.name}`, name: `${family.name}` });
    });
    console.log('familyOptions: ', familyOptions);


    return (
        <React.Fragment>
            <h2>Gérer les catégories et familles de produits</h2>

            <section>
                <h3>Créer une catégorie ou une famille</h3>
                <p className="instructions-text">Tous les champs sont obligatoires.</p>
                <form className="form">
                    <div>
                        <label htmlFor="category-name">Créer une nouvelle catégorie ou famille :</label>
                        <input className="form-input" type="text" name="produit" placeholder="Herbes, Petite épicerie, Fruits exotiques..." id="category-name" /* onChange={(input) => changeProduct('name', input.target.value)} */ />
                    </div>
                    <div>
                        <label htmlFor="family-choice">Choisir la famille :</label>
                        <Select
                            id="family-choice"
                            options={familyOptions}
                            placeholder="Sélectionnez" /* onChange={(input) => changeProduct('name', input.target.value)} */
                        />
                    </div>
                    <div>
                        <input className="form-send-btn" id="new-product-submit" type="submit" value="Enregistrer"></input>
                    </div>
                </form>
            </section>

            <section className="categories-list">
                <h3>Modifier une catégorie</h3>
                <ul classname="categories">
                    {props.categories.map((category) => {
                        return (
                            <li key={category.id} id={category.id}>
                                <input placeholder={category.name}></input>
                                <span className="button sell-btn">
                                    <button type="submit" title="Modifier" alt="Modifier" value={category.id} name={category.name}>
                                        <i className="fas fa-edit"></i>
                                    </button>
                                </span>
                            </li>
                        )
                    })}
                </ul>
            </section>
        </React.Fragment>
    )
}

export default ManageCategories;