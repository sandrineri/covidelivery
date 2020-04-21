import React, { useState } from 'react';

import CreateProduct from '../components/CreateProduct';

const SellerButtons = (props) => {

    const [displayCreatorState, setDisplayCreatorState] = useState('display-none');

    const displayProductCreator = () => {
        if (displayCreatorState === 'display-none') {
            setDisplayCreatorState('display-flex');
        } else {
            setDisplayCreatorState('display-none');
        }
        //console.log(displayCreatorState);
    }

    return (
        <React.Fragment>
            <div className="buttons-container">
                <input className="button" type="button" value="Voir les commandes"></input>
                <input className="button" type="button" value="Ajouter un produit" onClick={displayProductCreator}></input>
            </div>

            <article className={displayCreatorState}>
                <CreateProduct accessToken={props.accessToken} setMessage={props.setMessage} baseUnitOptions={props.baseUnitOptions} categoryOptions={props.categoryOptions} />
            </article>
        </React.Fragment>
    )
}

export default SellerButtons;