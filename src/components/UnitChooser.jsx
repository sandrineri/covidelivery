import React from 'react';
import Select from 'react-select';
//import makeAnimated from 'react-select/animated';

//const animatedComponents = makeAnimated();
let options = [];

const UnitChooser = (props) => {
    console.log('UnitChooser: ', props);
    
    if ( props.unit.label === 'kilo' || props.unit.label === 'pièce' ) {
        options = [
            { value: '2', label: 'kilo(s)' },
            { value: 'gramme', label: 'grammes' },
            { value: '4', label: 'pièce(s)'}
        ]
    }

    else {
        options = [
            { value: `${props.unit.value}`, label: `${props.unit.label}(s)`}
        ]
    }
    

    return (
        <Select
            className="unit-select"
            closeMenuOnSelect={false}
            //components={animatedComponents}
            options={options}
            placeholder={`${props.unit}(s)`}
            defaultValue={{ value: `${props.unit.value}`, label: `${props.unit.label}(s)` }}
            noOptionsMessage={() => null}
            //onChange={(value) => (props.setUnitState(value.value))}
        />
    )
};

export default UnitChooser;