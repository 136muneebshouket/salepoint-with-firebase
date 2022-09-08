
import './App.css';
import { useState,useEffect,createContext } from 'react';
import Header from './component/header/Header';
import Homepage from './component/pages/homepage/Homepage';
import Shoppage from './component/pages/cart/Carts';
import Signup from './component/signup/Signup'
import Sell from './component/pages/form/Sell';
import { BrowserRouter,Routes, Route } from "react-router-dom";
import ALLproductspage from './component/all products page/ALLproductspage';
// import Productsnavbar from './component/header/Productsnavbar';

import { storage, auth, firestore } from "./component/CONFIG/firebase";
import { getDocs, query, where, collection, addDoc } from "firebase/firestore";
import Productsnavbar from './component/header/Productsnavbar';



const logduser = createContext()

function App() {


  function Getcurrentuser() {
    const [user, setUser] = useState('')
    const usercollectionref = collection(firestore, "users")
  
    useEffect(() => {
      auth.onAuthStateChanged(userlogged => {
        if (userlogged) {
          const getUsers = async () => {
            const q = query(collection(firestore, "users"), where("uid", "==", userlogged.uid))
  
            const data = await getDocs(q)
            setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
          }
          getUsers()
        }
        else { setUser(null) }
      }
  
      )
  
  
  
    }, [])
    return user;
  
  }
  const loggeduser = Getcurrentuser();
   
  

  return (
    
      <>
     <logduser.Provider value={loggeduser}>
     <BrowserRouter>
     <Header />
    <Productsnavbar/> 
    <Routes>
      <Route element={<Homepage/>} path="/"></Route>
    </Routes>
    <Routes>
      <Route element={<Shoppage/>} path="/Carts"></Route>
    </Routes>
    <Routes>
      <Route element={<Signup/>} path="/signup"></Route>
    </Routes>
    <Routes>
      <Route element={<Sell/>} path="/Sell"></Route>
    </Routes>
    <Routes>
      <Route element={<ALLproductspage type={'MEN'}/>} path="/MEN"></Route>
      </Routes>
      <Routes>
      <Route element={<ALLproductspage type={'WOMEN'}/>} path="/WOMEN"></Route>
      </Routes>
      <Routes>
      <Route element={<ALLproductspage type={'KIDS'}/>} path="/KIDS"></Route>
    </Routes>

    </BrowserRouter> 
     </logduser.Provider> 
        </> 
  );
}

export default App;
export {logduser};