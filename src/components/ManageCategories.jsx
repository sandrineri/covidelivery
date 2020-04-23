import React, { useState } from 'react';
import Select from 'react-select';

import settings from '../config/settings';

const ManageCategories = (props) => {
    console.log('ManageCategories props: ', props);
    const [category, setCategory] = useState({
        "name": '',
        "parentId": ''
    });

    let familyOptions = [
        { value: "" , label: "Nouvelle famille", name: "Nouvelle famille" }
    ];
    props.families.forEach(family => {
        familyOptions.push({ value: `${family.id}`, label: `${family.name}`, name: `${family.name}` });
    });
    //console.log('familyOptions: ', familyOptions);

    const createCategory = (key, value) => {
        //console.log(key, value);
        const newCategory = category;
        newCategory[key] = value;
        setCategory(newCategory);
    }

    const changeCategory =(key, value) => {
        console.log('modifiedCategory: ', key, value);
        const modified = category;
        modified[key] = value;
        setCategory(modified);
    }

    console.log('newCategory: ', category);

    const sendNewCategory = (e) => {
        console.log('categoryToSend: ', category);
        e.preventDefault();

        if (category.name === "") window.alert("Vous devez donner un nom à votre catégorie pour pouvoir l'enregistrer");
        fetch(`${settings.apiBasePath}/category`, {
            method: 'POST',
            body: JSON.stringify(category),
            headers: {
                "Authorization": `Bearer ${props.accessToken}`
            }
        })
            .then(response => {
                if (response.status === 201) {
                    console.log(category.name + ' créée');
                    //props.setMessage(`La catégorie "${category.name}" a bien été créée. La liste sera raffraîchie automatiquement d'ici quelques secondes. Vous pourrez ensuite la modifier.`);
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
    }

    const modifyCategory = (e, id) => {
        console.log('changingCategoryToSend: ', category + '; id: ', id);
        e.preventDefault();

        fetch(`${settings.apiBasePath}/category/` + id, {
            method: 'PUT',
            body: JSON.stringify(category),
            headers: {
                "Authorization": `Bearer ${props.accessToken}`
            }
        })
            .then(response => {
                if (response.status === 201) {
                    console.log(category.name + ' changée');
                    //props.setMessage(`La catégorie "${category.name}" a bien été créée. La liste sera raffraîchie automatiquement d'ici quelques secondes. Vous pourrez ensuite la modifier.`);
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
    }

    return (
        <React.Fragment>
            <h2>Gérer les catégories et familles de produits</h2>

            <section>
                <h3>Créer une catégorie ou une famille</h3>
                <p className="instructions-text">Tous les champs sont obligatoires.</p>
                <form className="form category-form">
                    <div className="form-part form-part1">
                        <label htmlFor="category-name">Créer une nouvelle catégorie ou famille :</label>
                        <input className="form-input" type="text" name="produit" placeholder="Herbes, Petite épicerie, Fruits exotiques..." id="category-name" onChange={(input) => createCategory('name', input.target.value)} />
                    </div>
                    <div className="form-part form-part2">
                        <label htmlFor="family-choice">Choisir la famille :</label>
                        <Select
                            options={familyOptions}
                            placeholder="Sélectionnez" 
                            onChange={(option) => createCategory('parentId', option.value)}
                        />
                    </div>
                    <div className="form-part form-part3 button">
                        <button className="form-send-btn" id="new-product-submit" type="submit" onClick={sendNewCategory}>
                            Enregistrer
                            <span className="btn-icon">
                                <i className="fas fa-save"></i>
                            </span>
                        </button>
                    </div>
                </form>
            </section>

            <section className="categories-list">
                <h3>Modifier une catégorie</h3>
                <ul className="categories">
                    {props.categories.map((category) => {
                        return (
                            <li key={category.id} id={category.id}>
                                <input className="cat-modif-name" defaultValue={category.name} onChange={(input) => changeCategory('name', input.target.value)}></input>

                                <Select
                                className="family-select"
                                    options={familyOptions}
                                    defaultValue={familyOptions.find(option => category.products_categories_parent_id === Number(option.value))}
                                    onChange={(option) => changeCategory('parentId', option.value)}
                                />

                                <span className="cat-modif-btn">
                                    <button type="submit" title="Modifier" alt="Modifier" value={category.id} name={category.name} onClick={(e) => modifyCategory(e, category.id)}>
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