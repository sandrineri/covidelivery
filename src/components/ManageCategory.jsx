import React, { useState } from 'react';
import Select from 'react-select';

import settings from '../config/settings';

const ManageCategory = (props) => {
    const [category, setCategory] = useState(props.category);

    console.log('ManageCategory props: ', props);

    const changeCategory =(key, value) => {
        console.log('modifiedCategory: ', key, value);
        
        const modifiedCategory = props.category;
        modifiedCategory[key] = value;
        setCategory(modifiedCategory);
    }


    const modifyCategory = (e, id, name) => {
        console.log('changingCategoryToSend: ', category + '; id: ', id);
        e.preventDefault();
        if (category.name === "") { category.name = name; };
        fetch(`${settings.apiBasePath}/category/` + id, {
            method: 'PUT',
            body: JSON.stringify(category),
            headers: {
                "Authorization": `Bearer ${props.accessToken}`
            }
        })
            .then(response => {
                if (response.status === 201) {
                    console.log(category.name + ' changée');
                    //props.setMessage(`La catégorie "${category.name}" a bien été créée. La liste sera raffraîchie automatiquement d'ici quelques secondes. Vous pourrez ensuite la modifier.`);
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


    return (
        <li key={props.category.id} id={props.category.id}>
            <input className="cat-modif-name" defaultValue={props.category.name} onChange={(input) => changeCategory('name', input.target.value)}></input>

            <Select
                className="family-select"
                classNamePrefix="rs"
                options={props.familyOptions}
                defaultValue={props.familyOptions.find(option => props.category.parentId === Number(option.value))}
                onChange={(option) => changeCategory('parentId', option.value)}
            />

            <span className="cat-modif-btn">
                <button type="submit" title="Modifier" alt="Modifier" value={props.category.id} name={props.category.name} onClick={(e) => modifyCategory(e, props.category.id, props.category.name)}>
                    <i className="fas fa-edit"></i>
                </button>
            </span>
        </li>
    )

}

export default ManageCategory;