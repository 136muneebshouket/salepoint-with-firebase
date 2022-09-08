// import React, { useEffect, useState } from 'react'
// import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
// import { firestore } from "../config/firebase"

// export default function Delete() {

//   const [documents, setDocuments] = useState([])
//   const [isLoading, setIsLoading] = useState(true)
//   const collectionName = "users"
// //   const docsCollectionRef = collection(firestore, collectionName)


//   useEffect(() => {

//     const readDocs = async () => {

//       let documents = []

//       const querySnapshot = await getDocs(collection(firestore,collectionName));
//       querySnapshot.forEach((doc) => {
//         documents.push({ ...doc.data(), id: doc.id })
//       });

//       setDocuments(documents)
//       setIsLoading(false)
//     }

//     readDocs()

//   }, [])

//   const deleteDocument = async (document) => {

//     console.log(document)
//     await deleteDoc(doc(firestore, "users", document.id));

//     let newArray = documents.filter((item) => {
//       return document.id !== item.id
//     })

//     setDocuments(newArray)
//   }

//   return (
//     <div className='d-flex justify-content-center align-items-center min-vh-100'>
//       <div className="container">

//         <div className="row">
//           <div className="col">
//             <h1 className='text-center text-success'>Delete User</h1>
//           </div>
//         </div>
//         <div className="row mt-3">
//           <div className="col">
//             {isLoading ?
//               <div className="text-center">
//                 <div className="spinner-grow text-white" role="status">
//                   <span className="visually-hidden">Loading...</span>
//                 </div>
//               </div>
//               : <>
//                 {
//                   documents.map((doc) => {
//                     return <p key={doc.id} className="text-success text-center"
//                       onClick={() => { deleteDocument(doc) }}>
//                       Email: {doc.email} || password: {doc.password}
//                     </p>
//                   })
//                 }
//               </>
//             }

//           </div>
//         </div>
//       </div>

//     </div>
//   )
// }





















