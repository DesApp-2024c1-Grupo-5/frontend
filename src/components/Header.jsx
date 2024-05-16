import logo from '../../assets/img/Logo-UNAHUR.png';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
//import Box from '@mui/material/Box';

const buttons = [
    <Button key="Configuraciones" variant="contained">Configuraciones</Button>,
    <Button key="two" variant="contained">opción 2</Button>,
    <Button key="three" variant="contained">opción 3</Button>,
    <Button key="four" variant="contained">opción 4</Button>,
    <Button key="four" variant="contained">opción 4</Button>,
    <Button key="four" variant="contained">opción 4</Button>,
];
// 
function Header() {
    return (
        <header>
            <img src={logo} alt="UNAHUR" />
            {<ButtonGroup size="large" aria-label="Large button group">{buttons}</ButtonGroup>}
        </header>
    );
}

export default Header;