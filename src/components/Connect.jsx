import React from 'react';
import { useAuth0 } from '../auth/Auth0Wrapper';

const Connect = (props) => {
    console.log('Connect props: ', props);
    
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
                    <input className="button" type="button" value="Commerçant"></input>
                </div>
                <div className="person">
                    <input className="button" type="button" value="Client"></input>
                </div>
            </div>
        </React.Fragment>
    )
};

export default Connect;