import React, { useEffect, useState } from 'react'
// import Directory from '../../../component/directory/Directory';
import { auth, firestore } from "../../CONFIG/firebase";
import { getDocs, query, where, onSnapshot, collection } from "firebase/firestore";
import Productslider from './Productslider';



// import './Homepage.styles.scss';

export default function Homepage() {

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
  // if(loggeduser){console.log(loggeduser[0].email)}


    // fetch all products
   


  return (<>
       
       <Productslider type={'MEN'}/>
       <br />
       <Productslider type={'WOMEN'}/>
       <br />
       <Productslider type={'KIDS'}/>


     
      
   
    </>
  )
}