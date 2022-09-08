import React, { useState, useEffect,useContext } from 'react'
// import Collection from '../../collection-item/Collection';
import { storage, auth, firestore } from "../../CONFIG/firebase";
import { getDocs, query, where, collection, addDoc , deleteDoc, doc} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Spinner from 'react-bootstrap/Spinner';
import { async } from '@firebase/util';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { logduser } from '../../../App';






export default function Carts() {

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


  const [islooading,setIslooading]= useState(false);
  const [isloading,setIsloading]= useState(true);
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
            setIsloading(false)
          }).catch('error')
      
        }
        getcartdata();
      }

 
     const deletedoc = async(product)=>{

      setIslooading(true)
   await deleteDoc(doc(firestore,`cart-${loggeduser[0].uid}`,`${product.id}`))
   .then(()=>{

     alert("doc deleted")
     setIslooading(false)
     
   })
        console.log(product.id)

     }

       
    



  return (<>

    <div>
      {isloading ?
        <Spinner className="spinner-border spinner-border-sm" animation="grow" />


        : <div className="d-flex flex-wrap">
          {cartdata.map((product) => {
            return <Card className="card text-white bg-dark m-3 "

              style={{ width: '18rem' }}>
              <Card.Img variant="top" src={product.image} />
              {/* <Figure.Image
        width={171}
        height={180}
        alt="171x180"
        src={product.image}
      /> */}
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>
                  {product.discription}
                  <br />
                  {product.price}
                  <br />
                  {product.quantity}
                </Card.Text>{islooading? 
        <Spinner  className="spinner-border spinner-border-sm"  animation="grow" />
     :
     <Button onClick={() => deletedoc(product)} variant="primary">delete</Button>}
                
              </Card.Body>
            </Card>

          })
          }
        </div>}




    </div></>
  )
}