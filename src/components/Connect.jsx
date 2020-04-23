import React from 'react';
import { useAuth0 } from '../auth/Auth0Wrapper';

const Connect = (props) => {
    //console.log('Connect props: ', props);
    
    // Authorization
    const { isAuthenticated, getTokenSilently } = useAuth0();
    if (isAuthenticated) {
        getTokenSilently().then(token => {
            props.setAccessToken(token);
            //console.log('token: ', token);
        });
    }

    return (
        <React.Fragment>
            <div className="connect-container">
                <div className={`${isAuthenticated ? 'display-none' : 'display-flex'}`}>
                    <p>Se connecter</p>
                </div>
                <div className={`${isAuthenticated ? 'display-flex' : 'display-none'}`}>
                    <p>Vous êtes connecté</p>
                </div>

                <div className="person">
                    <button type="submit">
                        Commerçant
                        <span className="btn-icon">
                            <i className="fas fa-user-circle"></i>
                        </span>
                    </button>
                </div>
                <div className="person">
                <button type="submit">
                        Client
                        <span className="btn-icon">
                            <i className="fas fa-user-circle"></i>
                        </span>
                    </button>
                </div>
            </div>
        </React.Fragment>
    )
};

export default Connect;