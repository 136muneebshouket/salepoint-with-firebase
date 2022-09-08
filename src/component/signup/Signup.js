import React, { useState, useEffect } from 'react'
import { auth, firestore } from "../CONFIG/firebase";
import { doc, setDoc, serverTimestamp, addDoc, collection } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendEmailVerification } from "firebase/auth";
export default function Signup() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({})

    useEffect(() => {
        // setUser(auth.currentUser)
        onAuthStateChanged(auth, (user) => {
            if (user) {

                setUser(user)
                // ...
            } else {
                console.log("user is not signed in")

                setUser({})
                // User is signed out
                // ...
            }
        });
        alert('create an account or login/logout')
    }, [])


    const registerUser =  (e) => {
        e.preventDefault()

       
        let obj = {
            email: email,
            password: password,
        }

        // try {
        //                 const docRef = addDoc(collection(firestore,"users"),obj);
        //                 console.log("i am docRef",docRef);
        //                 console.log("i am docRef id",docRef.id);
        //             } catch (error) {
        //                 console.log("i am error",error);
        //             }
       
//         const docRef = addDoc(collection(firestore,"users"),obj);    
//    console.log(docRef)
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                
                   
                    addDoc(collection(firestore,"users"), { email, dateCreated: serverTimestamp(), uid: user.uid });
                    alert('user created');
                    setEmail("");
                    setPassword("");
                   
                })
        .catch ((error) => {
            // const errorCode = error.code;
            // const errorMessage = error.message;
            console.log(error)
            alert("user is not signed in")

        });
       
      
    }



    const loginUser = (e) => {
        e.preventDefault()

       

        signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)


                alert('user logged in ')
              localStorage.setItem('login',true)
                // ...
            })
            .catch((error) => {
                // const errorCode = error.code;
                // const errorMessage = error.message;

                console.log(error)
                alert('user doesn,t exist ')

            });
    }

    const logoutUser = (e) => {
        e.preventDefault()

        signOut(auth).then(() => {

            alert('user loged out')
        }).catch((error) => {
            console.log(error)
            // An error happened.
        });

    }

    const emailVerificationButton = () => {
        sendEmailVerification(auth?.currentUser)
            .then(() => {
                console.log("Email sent")
                // Email verification sent!
                // ...
            });
    }
    return (
        <>
            <div className='d-flex justify-content-center align-items-center flex-column min-vh-100'>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h3 className='text-center text-white'>Current User: {user?.email}</h3>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col">
                        <h3 className='text-center text-secondary'>If doesn,t have account</h3>
                            <h1 className='text-center text-dark'>Sign up</h1>
                        </div>
                        
                    </div>
                   
                    <div className="row mt-3">
                        <div className="col">
                            <form onSubmit={registerUser}>
                                <div className="row">
                                    <div className="col">
                                        <input type="email" placeholder='Email' name='email' className='form-control' onChange={e => { setEmail(e.target.value) }} />
                                    </div>
                                    <div className="col">
                                        <input type="password" placeholder='Password' name='password' className='form-control' onChange={e => { setPassword(e.target.value) }} />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col text-center">
                                        <button className='btn btn-success'>Sign UP</button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>

                <div className="border border-bottom border-1 my-5 w-100"></div>

                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h3 className='text-center text-secondary'>If Already have account</h3>
                            <h1 className='text-center text-dark'>login</h1>
                        </div>
                    </div>
                   
                    <div className="row mt-3">
                        <div className="col">
                            <form onSubmit={loginUser}>
                                <div className="row">
                                    <div className="col">
                                        <input type="email" placeholder='Email' name='email' className='form-control' onChange={e => { setLoginEmail(e.target.value) }} />
                                    </div>
                                    <div className="col">
                                        <input type="password" placeholder='Password' name='password' className='form-control' onChange={e => { setLoginPassword(e.target.value) }} />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col text-center">
                                        <button className='btn btn-success'>Login</button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>

                <div className="border border-bottom border-1 my-5 w-100"></div>

                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h1 className='text-center text-dark'>Logout User</h1>
                        </div>
                    </div>
                   
                    <div className="row mt-3">
                        <div className="col">
                            <div className="row mt-3">
                                <div className="col text-center">
                                    <button className='btn btn-success' onClick={logoutUser}>Logout</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="border border-bottom border-1 my-5 w-100"></div>

                {/* <div className="container">
                    <div className="row">
                        <div className="col">
                            <h1 className='text-center text-white'>Send Email Verification Link</h1>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col">
                            <div className="row mt-3">
                                <div className="col text-center">
                                    <button className='btn btn-success' onClick={emailVerificationButton}>Email Verification</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div> */}

            </div>
        </>
    )
}