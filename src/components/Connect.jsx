import React from 'react';
import { Link } from "react-router-dom";
import { useAuth0 } from '../auth/Auth0Wrapper';

import settings from '../config/settings';

const Connect = (props) => {
    console.log('Connect props: ', props);

    const { logout, loginWithRedirect } = useAuth0();

    const displayIfAuthenticated = () => {
        return props.accessToken ? 'display-flex' : 'display-none';
    }
    const displayIfNotAuthenticated = () => {
        return props.accessToken ? 'display-none' : 'display-flex';
    }
    const displayIfNotOnPage = (pathname) => {
        return window.location.pathname !== pathname ? 'display-flex' : 'display-none';
    }
    const displayIfSeller = () => {
        if (props.user === undefined) return 'display-none';

        return (props.user.nickname === settings.sellerLogin) ? 'display-flex' : 'display-none';
    }
    const displayIfClient = () => {
        if (props.user === undefined) return 'display-none';

        return (props.user.nickname !== settings.sellerLogin) ? 'display-flex' : 'display-none';
    }
    
    return (
        <React.Fragment>
            <div className={`user user-seller ${displayIfAuthenticated()}`}>
                <div className={`buttons-container ${displayIfSeller()}`}>
                    <div className={displayIfNotOnPage('/')}>
                        <Link to="/">
                            <button type="submit">
                                Liste des produitsV
                                <span className="btn-icon">
                                    <i className="fas fa-list-alt"></i>
                                </span>
                            </button>
                        </Link>
                    </div>
                    <div className={displayIfNotOnPage('/vendeur/produits')}>
                        <Link to="/vendeur/produits">
                            <button type="submit">
                                Gérer vos produitsV
                                <span className="btn-icon">
                                    <i className="fas fa-file-alt"></i>
                                </span>
                            </button>
                        </Link>
                    </div>

                    <div className={displayIfNotOnPage('/vendeur/commandes')}>
                        <Link to="/vendeur/commandes">
                            <button type="submit">
                                Voir les commandesV
                                <span className="btn-icon">
                                    <i className="fas fa-receipt"></i>
                                </span>
                            </button>
                        </Link>
                    </div>
                </div>

                <div className={`user user-buyer ${displayIfClient()}`}>
                    <button type="submit" onClick={props.displayBuyerInfosForm}>
                        Gérer vos coordonnées
                        <span className="btn-icon">
                         <i className="fas fa-address-card"></i>
                        </span>
                    </button>
                </div>
            </div>

            <div className="connect-container">
                <div className={`${displayIfNotAuthenticated()}`}>
                    <button onClick={loginWithRedirect}>
                        Se connecter
                        <span className="btn-icon">
                            <i className="fas fa-sign-in-alt"></i>
                        </span>
                    </button>
                </div>
                <div className={`${displayIfAuthenticated()}`}>
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