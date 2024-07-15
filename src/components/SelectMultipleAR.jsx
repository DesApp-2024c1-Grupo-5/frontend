import * as React from 'react';
import  { useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material'
import '../styles/SelectMultipleAR.css';

function SelectMultipleAR({ options, seleccionadas, onSelect, className, placeholder }) {

    const [selectedOptions, setSelectedOptions] = React.useState([]);

    //console.log(options)

    //const handleChange = (event) => {
    //    console.log(selectedOptions);
    //    console.log(event);
    //    if (event.target.textContent == "") {
    //        setSelectedOptions([]);
    //        onSelect([]);
    //    } else {
    //        onSelect([...selectedOptions, event.target.value]);
    //        setSelectedOptions([...selectedOptions, event.target.value]);
    //    }

    //};

    useEffect(() => {
        if (seleccionadas && options.length) {
            const valores = options.filter(o => seleccionadas.includes(o.value));
            setSelectedOptions(valores);
            onSelect(valores);
        }
    }, [seleccionadas, options]);

    const handleChange = (event, selectedValues) => {
        //console.log(selectedValues);
        setSelectedOptions(selectedValues);
        onSelect(selectedValues.map(option => option.value));
    };

    return (
        <Box sx={{
            width: '100%'

        }}>
            <Stack id='smar' sx={{   }}>
                <Autocomplete
                    multiple
                    id="tags-outlined"
                    className={className}
                    options={options}
                    onChange={handleChange}
                    getOptionLabel={(option) => option.label || ''}
                    value={selectedOptions}
                    isOptionEqualToValue={(option, value) => option.value === value.value}
                    //defaultValue={[""]}
                    //filterSelectedOptions
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            //label="filterSelectedOptions"
                            placeholder={ placeholder }
                        />
                    )}
                />
            </Stack>
        </Box>
    );
}

export default SelectMultipleAR;