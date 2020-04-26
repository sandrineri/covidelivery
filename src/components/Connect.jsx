import React from 'react';
import { Link } from "react-router-dom";
import { useAuth0 } from '../auth/Auth0Wrapper';


const Connect = (props) => {
    //console.log('Connect props: ', props);

    // Authorization
    const { isAuthenticated, getTokenSilently, logout, loginWithRedirect } = useAuth0();
    if (isAuthenticated) {
        getTokenSilently().then(token => {
            props.setAccessToken(token);
            //console.log('token: ', token);
        });
    }

    return (
        <React.Fragment>
            <div className={`user user-seller ${isAuthenticated ? 'display-flex' : 'display-none'}`}>
                <div className="buttons-container">
                    <div>
                        <Link to="/">
                            <button type="submit">
                                Liste des produits
                                <span className="btn-icon">
                                    <i className="fas fa-list-alt"></i>
                                </span>
                            </button>
                        </Link>
                    </div>

                    <div>
                        <Link to="/vendeur/produits">
                            <button type="submit">
                                Gérer vos produits
                                <span className="btn-icon">
                                    <i className="fas fa-file-alt"></i>
                                </span>
                            </button>
                        </Link>
                    </div>

                    <div>
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


                {/* <div className={`user user-buyer ${isAuthenticated ? 'display-flex' : 'display-none'}`}>
                        <button type="submit">
                            Gérer vos coordonnées
                            <span className="btn-icon">
                                <i className="fas fa-user-circle"></i>
                            </span>
                        </button>
                    </div> */}
            </div>

            <div className="connect-container">
                <div className={`${isAuthenticated ? 'display-none' : 'display-flex'}`}>
                    <button onClick={loginWithRedirect}>
                        Se connecter
                        <span className="btn-icon">
                            <i className="fas fa-sign-in-alt"></i>
                        </span>
                    </button>
                </div>
                <div className={`${isAuthenticated ? 'display-flex' : 'display-none'}`}>
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