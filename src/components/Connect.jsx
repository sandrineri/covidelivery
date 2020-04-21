import React from 'react';

const Connect = () => {
    
    return (
        <React.Fragment>
            <div className="connect-container">
                <div>
                    <p>Se connecter</p>
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