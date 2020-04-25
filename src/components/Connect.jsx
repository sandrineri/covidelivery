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
                <div className="brand"></div>
                <div className="users-nav">
                    <div className={`user user-seller ${isAuthenticated ? 'display-flex' : 'display-none'}`}>
                        <Link to="/vendeur/produits">
                            <button type="submit">
                                Gérer vos produits
                                <span className="btn-icon">
                                    <i className="fas fa-user-circle"></i>
                                </span>
                            </button>
                        </Link>
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
                        <button onClick={loginWithRedirect}>Se connecter</button>
                    </div>
                    <div className={`${isAuthenticated ? 'display-flex' : 'display-none'}`}>
                        <button onClick={logout}>Se déconnecter</button>
                    </div>
                </div>
        </React.Fragment>
    )
};

export default Connect;