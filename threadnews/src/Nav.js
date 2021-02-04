import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap'
import './bootstrap_theme.css'
export default function Top_nav(){
    return (
    <div>
            <Navbar variant="light" bg='primary'>
            {/* <Navbar.Link href="#home" >ThreadNews</Navbar.Link> */}
            <Nav>
                <Nav.Link href="#home" >Threads</Nav.Link>
                <Nav.Link href="#features" >Your Account</Nav.Link>
            </Nav>
            </Navbar>
    </div>
    )
}