import React,{ useEffect, useState ,useContext } from 'react'
import { Outlet, Link } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
import { auth, firestore } from "../CONFIG/firebase";
import { getDocs, query, where, collection } from "firebase/firestore";
import { logduser } from '../../App';
import Container from 'react-bootstrap/Container';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Header() {

  const loggeduser = useContext(logduser)

    // function Getcurrentuser() {
    //     const [user, setUser] = useState('')
    //     const usercollectionref = collection(firestore, "users")
    
    //     useEffect(() => {
    //       auth.onAuthStateChanged(userlogged => {
    //         if (userlogged) {
    //           const getUsers = async () => {
    //             const q = query(collection(firestore, "users"), where("uid", "==", userlogged.uid))
    
    //             const data = await getDocs(q)
    //             setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    //           }
    //           getUsers()
    //         }
    //         else { setUser(null) }
    //       }
    
    //       )
    
    
    
    //     }, [])
    //     return user;
    
    //   }
    //   const loggeduser = Getcurrentuser();






      const [cartdata,setCartdata] = useState([]);
      if(loggeduser){
      
        const getcartdata = async () =>{
          const cartArray =[];
          const path = `cart-${loggeduser[0].uid}`
          getDocs(collection(firestore,path)).then((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                 
              cartArray.push({...doc.data(), id: doc.id})
            })
            setCartdata(cartArray)
          }).catch('error')
      
        }
        getcartdata();
      }
        


    return (<>
      
        {/* <nav className="navbar navbar-expand-sm sticky-top navbar-light bg-light">
            <div className="container-fluid">
                <h3>SALE POINT</h3>
                
                <Dropdown>
        <Dropdown.Toggle className='ml-5' id="dropdown-button-dark-example1" variant="dark">
          Catogery
        </Dropdown.Toggle>

        <Dropdown.Menu variant="dark">

          <Dropdown.Item  >
          <Link to="/MEN" ><button  class="btn btn-secondary">MEN</button></Link>
          </Dropdown.Item>
          <Dropdown.Item ><Link to="/WOMEN" ><button  class="btn btn-secondary">WOMEN</button></Link></Dropdown.Item>
          <Dropdown.Item ><Link to="/KIDS" ><button  class="btn btn-secondary">KIDS</button></Link></Dropdown.Item>
          <Dropdown.Divider /> */}

          {/* <a className="nav-item nav-link mx-5" href="/product-type/MEN">MEN <span className="sr-only">(current)</span></a>
          
         <a className="nav-item nav-link mx-5" href="/product-type/WOMEN">WOMEN</a>
         <a className="nav-item nav-link mx-5" href="/product-type/KIDS">KIDS</a> */}
          {/* <Dropdown.Divider />
        </Dropdown.Menu>
      </Dropdown> */}
                {/* <form className="d-flex" role="search">
                    <input className="form-control me-2 col-6" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form> */}
                {/* <ul className="navbar-nav">
               
                    <ul className="list-group list-group-horizontal">
                    <li className="btn btn-outline-success"> <Link to="/Sell" className='text-light fw-bold'><button  class="btn btn-dark">Add product</button></Link> </li>

                        <li className="btn btn-outline-success"> <Link to="/" className='text-light fw-bold'><button  class="btn btn-dark">Home</button></Link> </li> &nbsp;&nbsp;
                        <li className="btn btn-outline-success"> <Link to="/Carts" className='text-light fw-bold'><button  class="btn btn-dark">Carts&nbsp;<Badge bg="danger">{cartdata.length}</Badge></button></Link> </li>&nbsp;&nbsp;

                        <li className="btn btn-outline-success"> <Link to="/signup" className='text-light fw-bold'><button  class="btn btn-dark">signup/login</button></Link> </li>
                    </ul>

                </ul>
            </div>
        </nav>
         */}
        



        {/* <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">SALE POINT</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home"><Link to="/" className='text-light fw-bold'><button  class="btn btn-dark">Home</button></Link> </Nav.Link>
            <Nav.Link href="#features"> <Link to="/Carts" className='text-light fw-bold'><button  class="btn btn-dark">Carts&nbsp;<Badge bg="danger">{cartdata.length}</Badge></button></Link></Nav.Link>
            <Nav.Link href="#pricing"> <Link to="/signup" className='text-light fw-bold'><button  class="btn btn-dark">signup/login</button></Link></Nav.Link>
            <Link to="/Sell" className='text-light fw-bold'><button  class="btn btn-dark">Add product</button></Link>
             
            <Dropdown>
        <Dropdown.Toggle className='ml-5' id="dropdown-button-dark-example1" variant="dark">
          Catogery
        </Dropdown.Toggle>

        <Dropdown.Menu variant="dark">

          <Dropdown.Item  >
          <Link to="/MEN" ><button  class="btn btn-secondary">MEN</button></Link>
          </Dropdown.Item>
          <Dropdown.Item ><Link to="/WOMEN" ><button  class="btn btn-secondary">WOMEN</button></Link></Dropdown.Item>
          <Dropdown.Item ><Link to="/KIDS" ><button  class="btn btn-secondary">KIDS</button></Link></Dropdown.Item>
          <Dropdown.Divider /> */}

          {/* <a className="nav-item nav-link mx-5" href="/product-type/MEN">MEN <span className="sr-only">(current)</span></a>
          
         <a className="nav-item nav-link mx-5" href="/product-type/WOMEN">WOMEN</a>
         <a className="nav-item nav-link mx-5" href="/product-type/KIDS">KIDS</a> */}
          {/* <Dropdown.Divider />
        </Dropdown.Menu>
      </Dropdown>
          </Nav>
        </Container>
      </Navbar> */}







      <Navbar collapseOnSelect expand="lg" bg="light" variant="light" sticky="top" >
      <Container>
        <Navbar.Brand href="#home">SALE POINT</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features"><Link to="/" className='text-light fw-bold'><button  class="btn btn-dark">Home</button></Link></Nav.Link>
            <Nav.Link href="#pricing"><Link to="/Carts" className='text-light fw-bold'><button  class="btn btn-dark">Carts&nbsp;<Badge bg="danger">{cartdata.length}</Badge></button></Link></Nav.Link>
            <NavDropdown className='text-dark' title="catogery" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">       <Link to="/MEN" ><button  class="btn btn-secondary">MEN</button></Link></NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
              <Link to="/WOMEN" ><button  class="btn btn-secondary">WOMEN</button></Link>
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3"><Link to="/KIDS" ><button  class="btn btn-secondary">KIDS</button></Link></NavDropdown.Item>
              <NavDropdown.Divider />
             
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#deets"><Link to="/signup" className='text-light fw-bold'><button  class="btn btn-dark">signup/login</button></Link></Nav.Link>
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    </>
    )
}

// className="nav-item list-group-item"
