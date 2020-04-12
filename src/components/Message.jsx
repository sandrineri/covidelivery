import React from 'react';

const Message = (props) => {
    if (props.message === '') {
        return (
            <React.Fragment>
                <div className="message display-none" />
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <p className="message">{props.message}</p>
        </React.Fragment>
    );
};

export default Message;
