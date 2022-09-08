import React,{useState,useEffect,useContext} from 'react'
import { auth, firestore } from "../../component/CONFIG/firebase";
import { getDocs, query, where, onSnapshot, collection,addDoc } from "firebase/firestore";
import Spinner from 'react-bootstrap/Spinner';
import { async } from '@firebase/util';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Productcontainer from './Productcontainer';


export default function ALLproductspage(props) {




    const [products,setProducts]= useState([]);
    const [isloading,setIsloading]= useState(true);
   




    useEffect(()=>{
      const getproducts = () =>{
            const productsArray = [];

            const path = `products-${props.type}`;

            getDocs(collection(firestore,path)).then((querySnapshot)=>{
              querySnapshot.forEach((doc)=>{
                productsArray.push({...doc.data(),id: doc.id})
                
              })
              setProducts(productsArray)
              setIsloading(false)

            }).catch((err)=>{
              console.log(err.message)
            })
      } 
      getproducts()
    },[])

    
  //   function Getcurrentuser() {
  //     const [user, setUser] = useState('')
  //     const usercollectionref = collection(firestore, "users")

  //     useEffect(() => {
  //         auth.onAuthStateChanged(userlogged => {
  //             if (userlogged) {
  //                 const getUsers = async () => {
  //                     const q = query(collection(firestore, "users"), where("uid", "==", userlogged.uid))

  //                     const data = await getDocs(q)
  //                     setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  //                 }
  //                 getUsers()
  //             }
  //             else { setUser(null) }
  //         }

  //         )



  //     }, [])
  //     return user;

  // }
  // const loggeduser = Getcurrentuser();

    // let title=products.title
    // let image =products.image
    // let discription =products.discription
    // let price =products.price



  //   const addtocart = () => {
  //     if (loggeduser) {
  //         addDoc(collection(firestore, `cart-${loggeduser[0].uid}`), {
  //             title,
  //             image,
  //             discription,
  //             price
  //             , quantity: 1
  //         }).then(() => {
  //             toast.success("added to cart Succesfullty!", {
  //                 position: "top-right",
  //                 autoClose: 2000,
  //                 hideProgressBar: false,
  //                 closeOnClick: true,
  //                 pauseOnHover: true,
  //                 draggable: true,
  //                 progress: undefined,
  //                 theme: "colored",
  //             })

  //             }).catch(() => {
                
  //                     toast.error('error', {
  //                         position: "top-right",
  //                         autoClose: 2000,
  //                         hideProgressBar: false,
  //                         closeOnClick: true,
  //                         pauseOnHover: true,
  //                         draggable: true,
  //                         progress: undefined,
  //                         theme: "colored",
  //                     });

  //         })

  //     } else {
  //         toast.error('login first', {
  //             position: "top-right",
  //             autoClose: 2000,
  //             hideProgressBar: false,
  //             closeOnClick: true,
  //             pauseOnHover: true,
  //             draggable: true,
  //             progress: undefined,
  //             theme: "colored",
  //         });


  //     }

  // }










  return (
    <div>
      
      {/* <Modal
            size="sm"
            show={lgShow}
            onHide={() => setLgShow(false)}
            aria-labelledby="example-modal-sizes-title-md"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    {products.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Card.Img variant="top" src={products.image} style={{ width: '25rem'  ,  alt: "171x180"}}   />

                <Card.Text>
                    {products.discription}
                    <br />
                    {products.price}
                </Card.Text>
                <Button onClick={addtocart} variant="primary ml-5 ">Add TO CART</Button>
            </Modal.Body>
        </Modal>
 */}









      
      
      
       {isloading? 
        <Spinner  className="spinner-border spinner-border-sm"  animation="grow" />
     
        
         : <div className ="d-flex flex-wrap">{products.map((product)=>(<Productcontainer key={product.id}  product={product}/>))}</div>}

       {/* {products.map((product)=>{
          return <Card className="card text-white bg-dark m-3 "
          width={171}
          height={180}
          alt="171x180"
          style={{ width: '18rem' }}>
          <Card.Img variant="top" src={product.image} />
          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>
              {product.discription}
              <br />
              {product.price}
            </Card.Text>
            <Button onClick={() => setLgShow(true)} variant="primary">show more</Button>
          </Card.Body>
        </Card>
  
       })
       } */}
        
      </div>
  )
}
