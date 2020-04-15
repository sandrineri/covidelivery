import React from 'react';

const sendForm = (formProductObject) => {
    if (formProductObject.name !== '') {
        console.log('formProductObject sent', formProductObject);
    }
    else {
        return;
    }
    
}

const SendFormButton = (props) => {
    console.log('SendFormButton: ', props)

    const formProductObject = {
        "name": props.productName,
        "origin": props.originInput,
        "price": props.priceNumber,
        "baseUnitId": props.saleUnit,
        "promo" : props.promoInput,
        "categoryId": props.categoryOption
    }
    console.log('formProductObject: ', formProductObject);

    return(
        <input className="form-send-btn" id="submit" type="submit" value="Enregistrer" onClick={() => sendForm(formProductObject)}></input>
    )
};

export default SendFormButton;