import React, { useState, useEffect } from 'react';

import settings from '../config/settings';

const BuyerInfos = (props) => {
    const [buyerInfos, setBuyerInfos] = useState({
        "name": '',
        "phone": '',
        "address": '',
        "email": '',
        "extra": ''
    });
    //console.log(buyerInfos);

    useEffect(() => {
        if (props.accessToken === null) return;

        fetch(`${settings.apiBasePath}/user`, {
            headers: {
                "Authorization": `Bearer ${props.accessToken}`
            }
        })
            .then(response => response.json())
            .then((response) => {
                //console.log('buyerInfos fetch complete', response);

                setBuyerInfos(response);
            })
            .catch(error => {
                console.log(error);
            });
    }, [props.accessToken]);

    const changeInfo = (key, value) => {
        //console.log(key, value);

        const info = buyerInfos;
        info[key] = value;
        setBuyerInfos(info);
    }

    const sendBuyerForm = (e) => {
        e.preventDefault();

        fetch(`${settings.apiBasePath}/user`, {
            method: 'PUT',
            body: JSON.stringify(buyerInfos),
            headers: {
                "Authorization": `Bearer ${props.accessToken}`
            }
        })
            .then(response => {
                if (response.status === 201) {
                    //console.log(buyerInfos + ' créé');
                    //props.setMessage(`Le produit "${product.name}" a bien été créé. La liste sera raffraîchie automatiquement d'ici quelques secondes. Vous pourrez ensuite la modifier.`);
                    //setTimeout(() => { document.location.reload(); }, 3000);
                }
                else {
                    throw new Error('Code HTTP incorrect');
                }
            })
            .catch(error => {
                console.log('Erreur de création : ', error);
                //props.setMessage(`Erreur de création : ${error}`);
            });
    }

    let disabled = '';
    if (buyerInfos.name !== "") disabled = true;


    return (
        <React.Fragment>
            <h2>Vos informations client</h2>

            <p>Remplissez et envoyez ce formulaire avant votre première commande. Vos informations seront sauvegardées pour vos prochaines commandes. Vous pourrez les modifier à tout moment, sauf le nom.</p>

            <p className="instructions-text">Les champs marqués d'un astérisque (<span className="required-sign">*</span>) sont obligatoires.</p>

            <form className="form buyer-infos-form">
                <div className="form-part form-part1">
                    <label htmlFor="name">Votre nom<span className="required-sign">*</span>&nbsp;:</label>
                    <input className="form-input" type="text" name="nom" defaultValue={buyerInfos.name} placeholder="Jean Dupont..." id="name" disabled={disabled} required = "required" onChange={(input) => changeInfo('name', input.target.value)} />
                </div>
                <div className="form-part form-part2">
                    <label htmlFor="phone">Votre numéro de téléphone<span className="required-sign">*</span>&nbsp;:</label>
                    <input className="form-input" type="tel" name="phone" pattern="[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}..." defaultValue={buyerInfos.phone} placeholder="06 00 00 00 00" id="phone" required = "required" onChange={(input) => changeInfo('phone', input.target.value)} />
                </div>
                <div className="form-part form-part3">
                    <label htmlFor="address">Votre adresse<span className="required-sign">*</span>&nbsp;:</label>
                    <input className="form-input" type="text" name="address" defaultValue={buyerInfos.address} placeholder="1250, allée Edward Whittemore, 75012 Paris..." id="address" required = "required" onChange={(input) => changeInfo('address', input.target.value)} />
                </div>
                <div className="form-part form-part4">
                    <label htmlFor="mail">Votre adresse e-mail<span className="required-sign">*</span>&nbsp;:</label>
                    <input className="form-input" type="email" name="mail" defaultValue={buyerInfos.email} placeholder="jeandupont@monmail.com..." id="mail" required = "required" onChange={(input) => changeInfo('email', input.target.value)} />
                </div>
                <div className="form-part form-part5">
                    <label htmlFor="extra">Informations complémentaires&nbsp;:</label>
                    <input className="form-input" type="text" name="extra" defaultValue={buyerInfos.extra} placeholder="Digicode: 0000..." id="extra" onChange={(input) => changeInfo('extra', input.target.value)} />
                </div>

                <div className="form-part form-part6">
                    <button className="form-send-btn" type="submit" onClick={sendBuyerForm}>
                        Enregistrer
                        <span className="btn-icon">
                            <i className="fas fa-save"></i>
                        </span>
                    </button>
                </div>
            </form>
        </React.Fragment>
    )
}

export default BuyerInfos;