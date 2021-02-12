import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap'
import './css/bootstrap_theme.css'
export default function Top_nav(){
    return (

        <Navbar variant="light" bg='primary'>
        <Navbar.Brand>Thread-News</Navbar.Brand>
        <Nav>
            <Nav.Link href="#home" >Threads</Nav.Link>
            <Nav.Link href="#features" >Your Account</Nav.Link>
        </Nav>
        </Navbar>

    )
}