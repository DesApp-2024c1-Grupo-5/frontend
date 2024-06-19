import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material'
import '../styles/SelectMultipleAR.css';

function SelectMultipleAR({ options, onSelect, className, placeholder }) {

    const [selectedOptions, setSelectedOptions] = React.useState([]);

    //console.log(options);

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

    const handleChange = (event, selectedValues) => {
        setSelectedOptions(selectedValues.map(option => option.value));
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