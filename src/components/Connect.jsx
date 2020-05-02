import React from 'react';
import { Link } from "react-router-dom";
import { useAuth0 } from '../auth/Auth0Wrapper';

import { displayIfAuthenticated, hideIfAuthenticated, displayIfSeller, displayIfNotOnPage, displayIfClient } from '../utils/utils';

const Connect = (props) => {
    //console.log('Connect props: ', props);

    const { logout, loginWithRedirect } = useAuth0();
    
    return (
        <React.Fragment>
            <div className={`nav-part user ${displayIfAuthenticated(props.accessToken)}`}>
                <div className={`buttons-container ${displayIfSeller(props.user)}`}>
                    <div className={displayIfNotOnPage('/')}>
                        <Link to="/">
                            <button type="submit">
                                Liste des produits
                                <span className="btn-icon">
                                    <i className="fas fa-list-alt"></i>
                                </span>
                            </button>
                        </Link>
                    </div>
                    <div className={displayIfNotOnPage('/vendeur/produits')}>
                        <Link to="/vendeur/produits">
                            <button type="submit">
                                Gérer vos produits
                                <span className="btn-icon">
                                    <i className="fas fa-file-alt"></i>
                                </span>
                            </button>
                        </Link>
                    </div>

                    <div className={displayIfNotOnPage('/vendeur/commandes')}>
                        <Link to="/vendeur/commandes">
                            <button type="submit">
                                Voir les commandes
                                <span className="btn-icon">
                                    <i className="fas fa-receipt"></i>
                                </span>
                            </button>
                        </Link>
                    </div>
                </div>

                <div className={`buttons-container ${displayIfClient(props.user)}`}>
                    <button type="submit" onClick={props.displayBuyerInfosForm}>
                        Gérer vos coordonnées
                        <span className="btn-icon">
                            <i className="fas fa-address-card"></i>
                        </span>
                    </button>
                </div>
            </div>

            <div className="nav-part connect-container">
                <div className={`${hideIfAuthenticated(props.accessToken, props.isAuthenticated)}`}>
                    <button onClick={loginWithRedirect}>
                        Se connecter
                        <span className="btn-icon">
                            <i className="fas fa-sign-in-alt"></i>
                        </span>
                    </button>
                </div>
                <div className={`${displayIfAuthenticated(props.accessToken)}`}>
                    <button onClick={logout}>
                        Se déconnecter
                        <span className="btn-icon">
                            <i className="fas fa-sign-out-alt"></i>
                        </span>
                    </button>
                </div>
            </div>
        </React.Fragment>
    )
};

export default Connect;