import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap'

export default function Top_nav(){
    return (
        <div><Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">ThreadNews</Navbar.Brand>
        <Nav className="mr-auto">
        <Nav.Link href="#home">Thread</Nav.Link>
        <Nav.Link href="#features" align="right">Your Account</Nav.Link>
        </Nav>
    </Navbar>
    </div>
    )
}