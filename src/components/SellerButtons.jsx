import React, { useState } from 'react';

import CreateProduct from './CreateProduct';
import ManageCategories from './ManageCategories';

const SellerButtons = (props) => {
    const [prodCreationDisplay, setDisplayCreatorState] = useState('display-none');
    const [catManageDisplay, setCatManageDisplay] = useState('display-none');

    // Display product creation form on click
    const displayProductCreator = () => {
        if (prodCreationDisplay === 'display-none') {
            setDisplayCreatorState('display-flex');
        } else {
            setDisplayCreatorState('display-none');
        }

        if (catManageDisplay === 'display-flex') setCatManageDisplay('display-none');
    };

    // Display new category form on click
    const displayCategManager = () => {
        if (catManageDisplay === 'display-none') {
            setCatManageDisplay('display-flex');
        } else {
            setCatManageDisplay('display-none');
        }

        if (prodCreationDisplay === 'display-flex') setDisplayCreatorState('display-none');
    };

    return (
        <React.Fragment>
            <div className="buttons-container seller-buttons">
                <button type="button" onClick={displayProductCreator}>
                    Enregistrer un produit
                    <span className="btn-icon">
                        <i className="fas fa-plus-square" />
                    </span>
                </button>
                <button type="button" onClick={displayCategManager}>
                    Gérer les catégories
                    <span className="btn-icon">
                        <i className="fas fa-folder-plus" />
                    </span>
                </button>
            </div>

            <div className={`form-container create-form-container ${prodCreationDisplay}`}>
                <CreateProduct accessToken={props.accessToken} productInfo={props.productInfo} setMessage={props.setMessage} setLastResponseStatusCode={props.setLastResponseStatusCode} />
            </div>

            <div className={`form-container cat-form-container ${catManageDisplay}`}>
                <ManageCategories accessToken={props.accessToken} productInfo={props.productInfo} setMessage={props.setMessage} setLastResponseStatusCode={props.setLastResponseStatusCode} />
            </div>
        </React.Fragment>
    );
};

export default SellerButtons;
