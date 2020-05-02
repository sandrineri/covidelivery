import React, { useState } from 'react';
import Select from 'react-select';

import settings from '../config/settings';

import ManageCategory from '../components/ManageCategory';

const ManageCategories = (props) => {
    console.log('ManageCategories props: ', props);
    let familyOptions = [
        { value: "" , label: "Nouvelle famille", name: "Nouvelle famille" }
    ];
    props.productInfo.families.forEach(family => {
        familyOptions.push({ value: `${family.id}`, label: `${family.name.toLocaleUpperCase('fr')}`, name: `${family.name}` });
    });

    const [modifiedCategory, setModifiedCategory] = useState({
        "name": '',
        "parentId": ''
    });

    // const categories = props.categories.map(category => {
    //     return ( { "name": category.name, "parentId": category.products_categories_parent_id } )
    // });

    //setFamilyOptions(getFamilyOptions);
    //console.log('familyOptions: ', familyOptions);
    //console.log('newCategory: ', modifiedCategory);


    const changeCategory = (key, value) => {
        //console.log('modifiedCategory: ', key, value);
        
        const modified = modifiedCategory;
        modified[key] = value;
        setModifiedCategory(modified);
    }

    const sendNewCategory = (e) => {
        //console.log('categoryToSend: ', modifiedCategory);
        e.preventDefault();

        if (modifiedCategory.name === "") window.alert("Vous devez donner un nom à votre catégorie pour pouvoir l'enregistrer");
        fetch(`${settings.apiBasePath}/category`, {
            method: 'POST',
            body: JSON.stringify(modifiedCategory),
            headers: {
                "Authorization": `Bearer ${props.accessToken}`
            }
        })
            .then(response => {
                if (response.status === 201) {
                    //console.log(modifiedCategory.name + ' créée');
                    props.setMessage(`La catégorie "${modifiedCategory.name}" a bien été créée. Vous pouvez désormais la modifier dans la liste des catégories ci-dessus. Si vous avez créé une nouvelle famille, vous la trouverez dans la liste des familles à choisir.`);
                    setTimeout(() => {
                        props.setLastResponseStatusCode(response.status);
                        props.setMessage('');
                    }, 3000);
                }
                else {
                    throw new Error('Code HTTP incorrect');
                }
            })
            .catch(error => {
                console.log('Erreur de création : ', error);
                //props.setMessage(`Erreur de création : ${error}`);
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
                        <input className="form-input" type="text" name="produit" placeholder="Herbes, Petite épicerie, Fruits exotiques..." id="category-name" onChange={(input) => changeCategory('name', input.target.value)} />
                    </div>
                    <div className="form-part form-part2">
                        <label htmlFor="family-choice">Choisir la famille :</label>
                        <Select
                            classNamePrefix="rs"
                            options={familyOptions}
                            placeholder="Sélectionnez" 
                            onChange={(option) => changeCategory('parentId', option.value)}
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
                    {props.productInfo.categories.map((category) => {
                        console.log('MangCats : ', category);
                        return (
                            <ManageCategory 
                                accessToken={props.accessToken} 
                                key={category.id} 
                                category={category} 
                                productInfo={props.productInfo}
                                setProductInfo={props.setProductInfo} 
                                familyOptions={familyOptions} 
                                setMessage={props.setMessage} 
                                setLastResponseStatusCode={props.setLastResponseStatusCode}
                            />
                        )
                    })}
                </ul>
            </section>
        </React.Fragment>
    )
}

export default ManageCategories;