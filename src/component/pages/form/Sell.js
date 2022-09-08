import React, { useState, useEffect ,useContext} from 'react'
import Form from 'react-bootstrap/Form';
import { storage, auth, firestore } from "../../CONFIG/firebase";
import { getDocs, query, where, collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Spinner from 'react-bootstrap/Spinner';
import { logduser } from '../../../App';

// 
// import './Form.css'

export default function Sell() {


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
  // if(loggeduser){console.log(loggeduser[0].email)}




  const [title, setTitle] = useState('');
  const [discription, setDiscription] = useState('');
  const [catogery, setCatogery] = useState(null);
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);


  const [successmsg, setSuccessmsg] = useState('');
  const [Uploaderror, setUploaderror] = useState('');
  const [Imageerror, setImageerror] = useState('');
  const [isloading,setIsloading]= useState(false);


  const types = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG'];
  const handleproductimage = (e) => {
    let selectedfile = e.target.files[0];
    console.log(selectedfile)
    if (selectedfile) {
      if (selectedfile && types.includes(selectedfile.type)) {
        setImage(selectedfile);
        setImageerror('');
      }
      else {
        setImage(null);
        setImageerror('please select an image file')
      }
    }
    else {
      console.log("please select ur file")
    }
  }



  const handleaddproducts = (e) => {
    e.preventDefault();
    console.log(title, discription, price, catogery)
    console.log(image)
    
   setIsloading(true)
    if (catogery  === null ) {
      alert("please fill all inputs")

    } else {
      const storageRef = ref(storage, `product-images${catogery}/${Date.now()}`)
      
      uploadBytes(storageRef, image)
        .then(() => {
          getDownloadURL(storageRef).then(url => {
            addDoc(collection(firestore, `products-${catogery}`), {
              title,
              discription,
              catogery,
              price,
              image: url,
              
            }).then(() => {
              setSuccessmsg('product added successfully')
              setTitle('')
              setDiscription('')
              setPrice('')
              document.getElementById('file').value = '';
              setImageerror('')
              setUploaderror('')
              setTimeout(() => {
                setSuccessmsg('')
              }, 3000);
              setIsloading(false)
            }
            ).catch(error => setUploaderror(error.message));

          }

          )

        }
        )
    }


  }

  return (
    <>
    <div>
      {loggeduser &&<>
      {/* //  loggeduser[0].email == "muneebshouket@gmail.com" ? */}
      <div>
        {successmsg && <>
          <div class="alert alert-success" role="alert">
            {successmsg}
          </div>
        </>}
        <form onSubmit={handleaddproducts} >
          <div className="form-group">
            <label for="exampleInputEmail1">title</label>
            <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="tile"
              onChange={(e) => setTitle(e.target.value)}
              value={title} required />

            <br />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">discription</label>
            <input type="text" className="form-control" placeholder="discription"
              onChange={(e) => setDiscription(e.target.value)}
              value={discription} required />
          </div>
          <br />

          <Form.Select value={catogery} onChange={(e) => setCatogery(e.target.value)} aria-label="Default select example">
          <option >please select catogery</option>
            <option value="MEN">MEN</option>
            <option value="WOMEN">WOMEN</option>
            <option value="KIDS">KIDS</option>
          </Form.Select>



          <br />
          <div className="form-group">
            <label for="exampleInputPassword1">price</label>
            <input type="number" className="form-control" placeholder="price"
              onChange={(e) => setPrice(e.target.value)}
              value={price}  required/>
          </div>
          <br />
          <div className="form-group">
            <label for="exampleFormControlFile1">select image</label>
            <input type="file" className="form-control-file" id="file"
              onChange={handleproductimage} required/>
          </div>
          {Imageerror && <>
            <div class="alert alert-danger" role="alert">
              {Imageerror}
            </div></>}
          <br />
          <button type="submit" className="btn btn-primary"> 
       {isloading? 
        <Spinner  className="spinner-border spinner-border-sm"  animation="grow" />
     :'add product'}</button>
        </form>
        {Uploaderror && <>
          <div class="alert alert-danger" role="alert">
            {Uploaderror}
          </div></>}
      </div>  

      </>}
      <div><h1>login first</h1></div>
      
      </div>

    </>
  )
}
