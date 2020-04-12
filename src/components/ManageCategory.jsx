import React, { useState } from 'react';
import MaterialSelect from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import settings from '../config/settings';

const ManageCategory = (props) => {
    //console.log('ManageCategory props: ', props);
    const [category, setCategory] = useState(props.category);

    const changeCategory = (key, value) => {
        console.log('modifiedCategory: ', key, value);

        const modifiedCategory = props.category;
        modifiedCategory[key] = value;
        setCategory(modifiedCategory);
    };


    const modifyCategory = (e, id, name) => {
        console.log('changingCategoryToSend: ', `${category}; id: `, id);
        e.preventDefault();
        if (category.name === '') { category.name = name; }

        fetch(`${settings.apiBasePath}/category/${id}`, {
            method: 'PUT',
            body: JSON.stringify(category),
            headers: {
                Authorization: `Bearer ${props.accessToken}`
            }
        })
            .then(response => {
                if (response.status === 201) {
                    console.log(`${category.name} changée`);
                    props.setMessage(`La catégorie "${category.name}" a bien été modifiée. Si vous l'avez placée en nouvelle famille, vous la trouverez désormais dans la liste des familles à choisir.`);
                } else {
                    throw new Error('Code HTTP incorrect');
                }
            })
            .catch(error => {
                console.log('Erreur de création : ', error);
            });
    };

    return (
        <li key={props.category.id} id={props.category.id}>
            <input className="cat-modif-name" defaultValue={props.category.name} onChange={(input) => changeCategory('name', input.target.value)} />

            <FormControl className="select" variant="outlined">
                <MaterialSelect
                    className="family-select"
                    defaultValue={props.productInfo.families.find(option => props.category.parentId === Number(option.id)).id}
                    onChange={(e) => changeCategory('parentId', e.target.value)}
                >
                    {props.productInfo.families.map(option => (
                        <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
                    ))}
                </MaterialSelect>
            </FormControl>

            <span className="cat-modif-btn">
                <button type="button" title="Modifier" alt="Modifier" value={props.category.id} name={props.category.name} onClick={(e) => modifyCategory(e, props.category.id, props.category.name)}>
                    <i className="fas fa-edit" />
                </button>
            </span>
        </li>
    );
};

export default ManageCategory;
