import React, { useState,useEffect,useContext } from 'react'
import { storage, auth, firestore } from "../CONFIG/firebase";
import { getDocs, query, where, collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Spinner from 'react-bootstrap/Spinner';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logduser } from '../../App';

export default function Productcontainer(product) {


    const loggeduser = useContext(logduser)

  const [lgShow, setLgShow] = useState(false);
  const [isloading,setIsloading]= useState(false);



//   function Getcurrentuser() {
//       const [user, setUser] = useState('')
//       const usercollectionref = collection(firestore, "users")

//       useEffect(() => {
//           auth.onAuthStateChanged(userlogged => {
//               if (userlogged) {
//                   const getUsers = async () => {
//                       const q = query(collection(firestore, "users"), where("uid", "==", userlogged.uid))

//                       const data = await getDocs(q)
//                       setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
//                   }
//                   getUsers()
//               }
//               else { setUser(null) }
//           }

//           )



//       }, [])
//       return user;

//   }
//   const loggeduser = Getcurrentuser();



  let title=product.product.title;
  let image =product.product.image;
  let discription =product.product.discription;
  let price =product.product.price;



  const addtocart = () => {
   
      if (loggeduser) {
        setIsloading(true)
          addDoc(collection(firestore, `cart-${loggeduser[0].uid}`), {
              title,
              image,
              discription,
              price
              , quantity: 1
          }).then(() => {
            setLgShow(false)
            setIsloading(false)
              toast.success("added to cart Succesfullty!", {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
              })

              }).catch(() => {
                
                      toast.error('error', {
                          position: "top-right",
                          autoClose: 2000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "colored",
                      });

          })

      } else {
        setLgShow(false)
          toast.error('login first', {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
          });

      }

  }



  return (<>
    <div>
<Modal
            size="sm"
            show={lgShow}
            onHide={() => setLgShow(false)}
            aria-labelledby="example-modal-sizes-title-md"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    {product.product.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                {/* <Card.Img variant="top" src={product.product.image}    /> */}
                {/* <img src={product.product.image}  className="max-width: 100%;" /> */}
                <Card.Img variant="top" src={product.product.image} />
                <Card.Text>
                    {product.product.discription}
                    <br /> <p>RS:&nbsp;{product.product.price}</p>
                </Card.Text>
                {isloading? 
        <Spinner  className="spinner-border spinner-border-sm"  animation="grow" />
     :
                <Button onClick={addtocart} variant="primary ml-5 ">Add TO CART</Button>}
            </Modal.Body>
        </Modal>




<Card className="card text-white bg-dark m-3 "

style={{ width: '18rem' }}>
<Card.Img variant="top" src={product.product.image} />
<Card.Body>
    <Card.Title>{product.title}</Card.Title>
    <Card.Text>
        {product.product.discription}
        <br />  <p>RS:&nbsp;{product.product.price}</p>
    </Card.Text>
    <Button onClick={() => setLgShow(true)} variant="primary">show more</Button>
</Card.Body>
</Card>


    </div>
    <ToastContainer />
    </>
  )
}
