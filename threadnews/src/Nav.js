import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap'
import './css/bootstrap_theme.css'
import {LinkContainer} from 'react-router-bootstrap'
export default function Top_nav(props){
    function logout(){
        sessionStorage.clear();
    }

    let nav_items = sessionStorage.getItem('access_token') ? (
        <Nav className='ml-auto' bg="primary" variant="light" >
            <LinkContainer to='/threads'>
                <Nav.Link  style={{float: 'right',}} href="/threads" >Threads</Nav.Link>
            </LinkContainer>
            
            <LinkContainer to='/profile'>
                <Nav.Link >Profile</Nav.Link>
            </LinkContainer>

            <LinkContainer to='/profile'>
                <Nav.Link >{sessionStorage.getItem('user_name')}</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/login' onClick={logout}>
                <Nav.Link>{localStorage.getItem('user_name')}</Nav.Link>
            </LinkContainer>
            
        </Nav>):
        <Nav className='ml-auto'>
            <LinkContainer to='/threads'>
                <Nav.Link  style={{float: 'right',}} href="/threads" >Threads</Nav.Link>
            </LinkContainer>
            <LinkContainer to ='/signup'>
                <Nav.Link  style={{float: 'right',}} href="/signup" >Sign Up</Nav.Link>
            </LinkContainer>
            
            <LinkContainer to='/login'>
                <Nav.Link >Login</Nav.Link>
            </LinkContainer>
            {/* <LinkContainer to='/profile'>
                <Nav.Link  style={{float: 'right',}} href="/profile" >Profile</Nav.Link>
            </LinkContainer> */}alri
            
        </Nav>

    return (
      <div style={{ paddingBottom: "50px" }}>
        <Navbar variant="light" fixed="top" bg="info">
          <Navbar.Brand>Thread News</Navbar.Brand>
          {nav_items}
        </Navbar>
      </div>
    );
}

Top_nav.defaultProps = { signedIn:false}