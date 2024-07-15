import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';


function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}
export default function SelectMultipleR({ options, onSelect, className, placeholder }) {
    const theme = useTheme();
    const [selectedOptions, setSelectedOptions] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedOptions(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );

        onSelect(value);
        //console.log(value)
    };

    return (
        <Box
            sx={{
                width:'100%'
            }}>
            <FormControl fullWidth>
                <Select
                    id="selectOption"
                    multiple
                    value={selectedOptions}
                    onChange={handleChange}
                    className={className}
                    displayEmpty
                    renderValue={(selected) => {
                        if (selected.length === 0) {
                            return <Box 
                                sx={{
                                    color:'#BBBBBB'
                                }}>{placeholder}</Box>;
                        }

                        return selected.join(', ');
                    }}
                    MenuProps={{
                        PaperProps: {
                            style: {
                                maxHeight: '200px',
                                
                            },
                        },
                    }}
                >
                    <MenuItem disabled value="">{placeholder}</MenuItem>
                    {options.map((option, index) => (
                        <MenuItem
                            key={index}
                            value={option.value}
                            style={getStyles(option.label, selectedOptions, theme)}
                        >
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
