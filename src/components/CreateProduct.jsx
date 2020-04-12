import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MaterialSelect from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Chip from '@material-ui/core/Chip';


import settings from '../config/settings';

const CreateProduct = (props) => {
    const [product, setProduct] = useState({
        name: '',
        origin: '',
        price: null,
        baseUnitId: '2',
        promo: '',
        categoryId: '',
        selectableUnits: []
    });

    const [error, setError] = useState({
        name: {
            errorText: null
        },
        price: {
            errorText: null
        },
        baseUnitId: {
            errorText: null
        },
        selectableUnits: {
            errorText: ''
        },
        categoryId: {
            errorText: ''
        }
    });

    const validate = (key, value) => {
        console.log('onchange', value);
        const modifiedError = error;
        //console.log('value.length  : ', value.length );
        if (value.length > 0) {
            modifiedError[key].errorText = '';
        } else if (modifiedError[key].errorText !== null) {
            modifiedError[key].errorText = 'Pas bon';
        }
        console.log('errorText : ', modifiedError[key].errorText);
        setError(modifiedError);
    };

    const changeProduct = (key, value) => {
        console.log('key, value: ', key, value);

        const modifiedProduct = product;
        modifiedProduct[key] = value;

        setProduct(modifiedProduct);
        if (Object.keys(error).includes(key)) {
            validate(key, value);
        }
    };

    const sendForm = (e) => {
        e.preventDefault();
        // if there is at least one errorMessage in our error object, we don't want to submit the form
        const errorMessagesCount = Object.entries(error).filter(el => (el[1].errorText === null) || (el[1].errorText.length > 0)).length;

        if (errorMessagesCount === 0) {
            fetch(`${settings.apiBasePath}/product`, {
                method: 'POST',
                body: JSON.stringify(product),
                headers: {
                    Authorization: `Bearer ${props.accessToken}`
                }
            })
                .then(response => {
                    if (response.status === 201) {
                        console.log(`${product.name} créé`);
                        props.setMessage(`Le produit "${product.name}" a bien été créé. Vous pouvez désormais le modifier dans la liste des produits ci-desous.`);
                        setTimeout(() => {
                            props.setLastResponseStatusCode(response.status);
                            props.setMessage('');
                        }, 2500);
                    } else {
                        throw new Error('Code HTTP incorrect');
                    }
                })
                .catch(htmlError => {
                    console.log('Erreur de création : ', htmlError);
                });
        }
    };

    return (
        <React.Fragment>
            <h2>Enregistrer un nouveau produit</h2>

            <p className="instructions-text">Les champs marqués d'un astérisque (<span className="required-sign">*</span>) sont obligatoires.</p>

            <form className="form new-prod-form">
                <div className="form-part form-part1">
                    <label htmlFor="name">Produit<span className="required-sign">*</span>&nbsp;:</label>
                    <Autocomplete
                        className="form-select select"
                        id="name"
                        freeSolo
                        options={props.productInfo.products.map(prod => prod.name)}
                        onChange={(event, value) => {
                            console.log(event, value);
                        }}
                        renderInput={(params) => {
                            if (params.inputProps.value !== null) {
                                changeProduct('name', params.inputProps.value);
                            } else {
                                changeProduct('name', '');
                            }

                            // by default (errorText is null) we don't want to display an error message
                            let hasErrorText = false;
                            // if the errorText is not null and is an empty string, we display an error message
                            if (error.name.errorText && error.name.errorText.length !== 0) hasErrorText = true;

                            return (
                                <TextField
                                    {...params} className="form-select select" variant="outlined" placeholder="Nectarine jaune..."
                                    required
                                    error={hasErrorText}
                                    helpertext={error.name.errorText}
                                />
                            );
                        }}
                    />
                </div>

                <div className="form-part form-part2">
                    <label htmlFor="origin">Provenance&nbsp;:</label>
                    <input className="form-input" type="text" name="origin" placeholder="Bretagne, Espagne..." id="origin" onChange={(input) => changeProduct('origin', input.target.value)} />
                </div>

                <div className="form-part form-part3">
                    <label htmlFor="price">Prix<span className="required-sign">*</span>&nbsp;:</label>
                    <div>
                        <input
                            className="form-input number-input"
                            type="number"
                            name="prix"
                            min="0"
                            placeholder="2,99"
                            step="0.01"
                            lang="fr"
                            id="price"
                            onChange={(input) => changeProduct('price', input.target.value)}
                            required
                            helpertext={error.price.errorText}
                        />
                        <span> €</span>
                    </div>
                    <div>{error.price.errorText}</div>
                </div>

                <div className="form-part form-part4">
                    <label htmlFor="unit">Unité<span className="required-sign">*</span>&nbsp;:</label>
                    <FormControl variant="outlined" className="select">
                        <MaterialSelect
                            className="form-select form-unit-select"
                            placeholder="Sélectionner"
                            defaultValue={props.productInfo.baseUnitOptions[3].value}
                            onChange={(option) => {
                                if (option !== null) {
                                    changeProduct('baseUnitId', option.target.value);
                                } else if (option.target.value === null) {
                                    changeProduct('baseUnitId', product.baseUnitId);
                                }
                            }}
                            required
                            helpertext={error.baseUnitId.errorText}
                        >
                            {props.productInfo.baseUnitOptions.map(option => (
                                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                ))}
                        </MaterialSelect>
                    </FormControl>

                </div>

                <div className="form-part form-part5">
                    <label htmlFor="promo">Promo&nbsp;:</label>
                    <input className="form-input" type="text" name="promo" placeholder="2 pour 5 €..." id="promo" onChange={(input) => changeProduct('promo', input.target.value)} />
                </div>

                <div className="form-part form-part6">
                    <label htmlFor="unit">
                        Unités dans lesquelles vos clients pourront commander<span className="required-sign">*</span>&nbsp;:<br />
                        <span className="label-plus">(plusieurs options possibles)</span>
                    </label>

                    <FormControl className="select" variant="outlined">
                        <MaterialSelect
                            className="form-select form-units-select"
                            multiple
                            defaultValue={[]}
                            placeholder=""
                            displayEmpty
                            onChange={(options) => {
                                console.log('options ? ', options);
                                if (options !== null) {
                                    changeProduct('selectableUnits', options.target.value.map(option => option));
                                } else {
                                    changeProduct('selectableUnits', []);
                                }
                            }}
                            renderValue={(selected) => {
                                if (selected.length === 0) return <p className="placeholder">Sélectionner</p>;

                                return (
                                    <div>
                                        {selected.map((value) => (
                                            <Chip key={value} label={props.productInfo.baseUnitOptions.find(option => option.value === value).name} />
                                        ))}
                                    </div>
                                );
                            }}
                        >
                            {props.productInfo.baseUnitOptions.map(option => (
                                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                            ))}
                        </MaterialSelect>
                    </FormControl>
                </div>

                <div className="form-part form-part7">
                    <label htmlFor="category">Catégorie dans laquelle votre produit apparaîtra<span className="required-sign">*</span>&nbsp;:</label>

                    <FormControl className="select" variant="outlined">
                        <MaterialSelect
                            className="form-select form-category-select"
                            required
                            displayEmpty
                            onChange={(e) => changeProduct('categoryId', e.target.value)}
                            defaultValue=""
                        >
                            <MenuItem value="" disabled>
                                Sélectionner une catégorie
                            </MenuItem>
                            {props.productInfo.categoryOptions.map(option => (
                                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                            ))}
                        </MaterialSelect>
                    </FormControl>
                </div>

                <div className="form-part form-part8">
                    <button className="form-send-btn" id="new-product-submit" type="submit" onClick={sendForm}>
                        Enregistrer
                        <span className="btn-icon">
                            <i className="fas fa-save" />
                        </span>
                    </button>
                </div>
            </form>
        </React.Fragment>
    );
};

export default CreateProduct;
