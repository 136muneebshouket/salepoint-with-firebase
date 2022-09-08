import React, { useState, useEffect,useContext } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { auth, firestore } from "../CONFIG/firebase";
import { getDocs, query, where, collection } from "firebase/firestore";
import { Outlet, Link } from 'react-router-dom'
import { logduser } from '../../App';



export default function Productsnavbar() {

  const loggeduser = useContext(logduser)

  // function Getcurrentuser() {
  //   const [user, setUser] = useState('')
  //   const usercollectionref = collection(firestore, "users")

  //   useEffect(() => {
  //     auth.onAuthStateChanged(userlogged => {
  //       if (userlogged) {
  //         const getUsers = async () => {
  //           const q = query(collection(firestore, "users"), where("uid", "==", userlogged.uid))

  //           const data = await getDocs(q)
  //           setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  //         }
  //         getUsers()
  //       }
  //       else { setUser(null) }
  //     }

  //     )



  //   }, [])
  //   return user;

  // }
  // const loggeduser = Getcurrentuser();

  return (
  <>
     <nav className="navbar navbar-expand-sm  navbar-light bg-light">

      {/* <Dropdown>
        <Dropdown.Toggle className='ml-5' id="dropdown-button-dark-example1" variant="dark">
          Catogery
        </Dropdown.Toggle>

        <Dropdown.Menu variant="dark">

          <Dropdown.Item  >
          <Link to="/MEN" ><button  class="btn btn-secondary">MEN</button></Link>
          </Dropdown.Item>
          <Dropdown.Item ><Link to="/WOMEN" ><button  class="btn btn-secondary">WOMEN</button></Link></Dropdown.Item>
          <Dropdown.Item ><Link to="/KIDS" ><button  class="btn btn-secondary">KIDS</button></Link></Dropdown.Item>
          <Dropdown.Divider />

          {/* <a className="nav-item nav-link mx-5" href="/product-type/MEN">MEN <span className="sr-only">(current)</span></a>
          
         <a className="nav-item nav-link mx-5" href="/product-type/WOMEN">WOMEN</a>
         <a className="nav-item nav-link mx-5" href="/product-type/KIDS">KIDS</a> */}
          {/* <Dropdown.Divider />
        </Dropdown.Menu>
      </Dropdown>  */}
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;

      {/* <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
    
      </div>
    </div> */}

      <div><h4 style={{ color: "black" }}>{loggeduser ? loggeduser[0].email : ""}</h4></div>
    </nav>
    
  </>
  )
}
