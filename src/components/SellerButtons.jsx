import React, { useState } from 'react';

import CreateProduct from '../components/CreateProduct';
import ManageCategories from './ManageCategories';

const SellerButtons = (props) => {
    const [prodCreationDisplay, setDisplayCreatorState] = useState('display-none');
    const [catManageDisplay, setCatManageDisplay] = useState('display-none');

    // Affichage du formulaire de création de produit lors du clic
    const displayProductCreator = () => {
        if (prodCreationDisplay === 'display-none') {
            setDisplayCreatorState('display-flex');
        } else {
            setDisplayCreatorState('display-none');
        }

        if (catManageDisplay === 'display-flex') setCatManageDisplay('display-none');
    }

    // Affichage du formulaire de création d'une nouvelle catégorie de produits
    const displayCategManager = () => {
        if (catManageDisplay === 'display-none') {
            setCatManageDisplay('display-flex');
        } else {
            setCatManageDisplay('display-none');
        }

        if (prodCreationDisplay === 'display-flex') setDisplayCreatorState('display-none');
    }

    return (
        <React.Fragment>
            <div className="buttons-container">
                <input className="button" type="button" value="Voir les commandes"></input>
                <input className="button" type="button" value="Ajouter un produit" onClick={displayProductCreator}></input>
                <input className="button" type="button" value="Gérer les catégories" onClick={displayCategManager}></input>
            </div>

            <article className={`form-container create-form-container ${prodCreationDisplay}`}>
                <CreateProduct accessToken={props.accessToken} products={props.products} baseUnitOptions={props.baseUnitOptions} categoryOptions={props.categoryOptions} setMessage={props.setMessage} />
            </article>

            <article className={`form-container cat-form-container ${catManageDisplay}`}>
                <ManageCategories accessToken={props.accessToken} families={props.families} categories={props.categories} />
            </article>
        </React.Fragment>
    )
}

export default SellerButtons;