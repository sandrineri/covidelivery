import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '../auth/Auth0Wrapper';

import {
    displayIfAuthenticated, hideIfAuthenticated, displayIfSeller, displayIfNotOnPage, displayIfClient
} from '../utils/utils';

const Navigation = (props) => {
    //console.log('Navigation props: ', props);

    const { logout, loginWithRedirect } = useAuth0();

    return (
        <React.Fragment>
            <nav>
                <div className="nav-part brand">
                    <h1>C<span>ovidelivery</span></h1>
                </div>

                <div className={`nav-part user ${displayIfAuthenticated(props.accessToken)}`}>
                    <div className={`buttons-container ${displayIfSeller(props.user)}`}>
                        <div className={displayIfNotOnPage('/')}>
                            <Link to="/">
                                <button type="button">
                                    Liste des produits
                                    <span className="btn-icon">
                                        <i className="fas fa-list-alt" />
                                    </span>
                                </button>
                            </Link>
                        </div>
                        <div className={displayIfNotOnPage('/vendeur/produits')}>
                            <Link to="/vendeur/produits">
                                <button type="button">
                                    Gérer vos produits
                                    <span className="btn-icon">
                                        <i className="fas fa-file-alt" />
                                    </span>
                                </button>
                            </Link>
                        </div>

                        <div className={displayIfNotOnPage('/vendeur/commandes')}>
                            <Link to="/vendeur/commandes">
                                <button type="button">
                                    Voir les commandes
                                    <span className="btn-icon">
                                        <i className="fas fa-receipt" />
                                    </span>
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className={`buttons-container ${displayIfClient(props.user)}`}>
                        <button className={`condition-display ${displayIfNotOnPage('/mes_commandes')}`} type="button" onClick={props.displayBuyerInfosForm}>
                            Gérer mes coordonnées
                            <span className="btn-icon">
                                <i className="fas fa-address-card" />
                            </span>
                        </button>
                        <Link to="/mes_commandes">
                            <button className={`condition-display ${displayIfNotOnPage('/mes_commandes')}`} type="button">
                                Voir mes commandes
                                <span className="btn-icon">
                                    <i className="fas fa-receipt" />
                                </span>
                            </button>
                        </Link>
                        <Link to="/">
                            <button className={`condition-display ${displayIfNotOnPage('/')}`} type="button">
                                Retourner à l'accueil
                                <span className="btn-icon">
                                    <i className="fas fa-undo-alt" />
                                </span>
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="nav-part connect-container">
                    <div className={`${hideIfAuthenticated(props.accessToken, props.isAuthenticated)}`}>
                        <button type="button" onClick={loginWithRedirect}>
                            Se connecter
                            <span className="btn-icon">
                                <i className="fas fa-sign-in-alt" />
                            </span>
                        </button>
                    </div>
                    <div className={`${displayIfAuthenticated(props.accessToken)}`}>
                        <button type="button" onClick={() => logout({ returnTo: window.location.origin })}>
                            Se déconnecter
                            <span className="btn-icon">
                                <i className="fas fa-sign-out-alt" />
                            </span>
                        </button>
                    </div>
                </div>
            </nav>
        </React.Fragment>
    );
};

export default Navigation;
