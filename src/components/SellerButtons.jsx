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
                <button type="submit" onClick={displayProductCreator}>
                    Enregistrer un produit
                    <span className="btn-icon">
                        <i className="fas fa-plus-square"></i>
                    </span>
                </button>
                <button type="submit" onClick={displayCategManager}>
                    Gérer les catégories
                    <span className="btn-icon">
                        <i className="fas fa-folder-plus"></i>
                    </span>
                </button>
            </div>

            <article className={`form-container create-form-container ${prodCreationDisplay}`}>
                <CreateProduct accessToken={props.accessToken} products={props.products} baseUnitOptions={props.baseUnitOptions} categoryOptions={props.categoryOptions} setMessage={props.setMessage} setLastResponseStatusCode={props.setLastResponseStatusCode} />
            </article>

            <article className={`form-container cat-form-container ${catManageDisplay}`}>
                <ManageCategories accessToken={props.accessToken} families={props.families} categories={props.categories} />
            </article>
        </React.Fragment>
    )
}

export default SellerButtons;