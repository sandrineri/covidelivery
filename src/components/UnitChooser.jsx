import React from 'react';
import Select from 'react-select';
//import makeAnimated from 'react-select/animated';

//const animatedComponents = makeAnimated();

const options = [
    { value: 'kilo', label: 'kilo(s)' },
    { value: 'gram', label: 'grammes' },
    { value: 'unit', label: 'pièce(s)' },
    { value: 'packet', label: 'barquette'}
]

const UnitChooser = (props) => {
    //console.log(props);

    return (
        <Select
            className="unit-select"
            closeMenuOnSelect={false}
            //components={animatedComponents}
            options={options}
            placeholder={props.unit}
            defaultValue={props.unit}
            noOptionsMessage={() => null}
            onChange={(value) => (props.setUnitState(value.value))}
        />
    )
};

export default UnitChooser;