import { Box, TextField, FormLabel} from '@mui/material';
import '../styles/PanelConfiguradorGral.css';

export default function PanelConfiguradorGral(
    {isEdit, 
    suggestionThresholdRegularizedSubjects, 
    minimumSubjectsRecommended, 
    specialCarrerName,
    handleUpdateCarrerRegularSuggest, 
    handleUpdateCarrerMinimunSubject, 
    handleUpdateCarrerName}) {
   
    const handleInputChange_1 = (e) => {handleUpdateCarrerRegularSuggest(e.target.value)}
    const handleInputChange_2 = (e) => {handleUpdateCarrerMinimunSubject(e.target.value)}
    const handleInputChange_3 = (e) => {handleUpdateCarrerName(e.target.value)}
    return(
        <Box className='container-config'>
            <Box
                className='container-config-item'>
                <FormLabel
                    sx={
                        {
                            fontWeight: 'bold',
                            fontSize: '14px'
                        }
                    }
                >Materias para generar sugerencias: </FormLabel>
                <TextField
                    type='number'
                    value={suggestionThresholdRegularizedSubjects}
                    variant='standard'
                    className='container-config-item-input'
                    onChange={handleInputChange_1}
                    disabled={!isEdit}
                    inputProps={{style:{fontSize: '14px', textAlign: 'center'}, min: 0}}/>
            </Box>

            <Box
                className='container-config-item'>
                <FormLabel
                    sx={
                        {
                            fontWeight: 'bold',
                            fontSize: '14px'
                        }
                    }
                >Minimo de materias sugeridas para inscribirse:</FormLabel>
                <TextField 
                    type='number'
                    value={minimumSubjectsRecommended}
                    variant='standard'
                    className='container-config-item-input' 
                    onChange={handleInputChange_2}
                    disabled={!isEdit}
                    inputProps={{style:{fontSize: '14px', textAlign: 'center'}, min: 0}} />
            </Box>

            <Box
                className='container-config-item'>
                <FormLabel
                    sx={
                        {
                            fontWeight: 'bold',
                            fontSize: '14px'
                        }
                    }
                >Nombre especial:</FormLabel>
                <TextField 
                sx={{width: '380px'}}
                    value={specialCarrerName}
                    variant='standard'
                    onChange={handleInputChange_3}
                    disabled={!isEdit}
                    inputProps={{style:{fontSize: '14px', textAlign: 'right', paddingRight: '5px'}}}/>
            </Box>

        </Box>
        
    )
}