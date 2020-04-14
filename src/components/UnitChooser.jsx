import React from 'react';
import Select from 'react-select';
//import makeAnimated from 'react-select/animated';

//const animatedComponents = makeAnimated();
let options = [];

const UnitChooser = (props) => {
    //console.log(props);
    
    if ( props.unit === 'kilo' || props.unit === 'piéce' ) {
        options = [
            { value: 'kilo', label: 'kilo(s)' },
            { value: 'gramme', label: 'grammes' },
            { value: 'pièce', label: 'pièce(s)'}
        ]
    }

    else {
        options = [
            { value: `${props.unit}`, label: `${props.unit}(s)`}
        ]
    }
    

    return (
        <Select
            className="unit-select"
            closeMenuOnSelect={false}
            //components={animatedComponents}
            options={options}
            placeholder={`${props.unit}(s)`}
            defaultValue={{ value: `${props.unit}`, label: `${props.unit}(s)` }}
            noOptionsMessage={() => null}
            onChange={(value) => (props.setUnitState(value.value))}
        />
    )
};

export default UnitChooser;