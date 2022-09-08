import React,{useState,useEffect} from 'react';
import { auth, firestore } from "../../CONFIG/firebase";
import { getDocs, query, where, onSnapshot, collection } from "firebase/firestore";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import Sliderproductcard from './Sliderproductcard';

export default function Productslider(props) {


    const [products,setProducts]= useState([]);
    // const [isloading,setIsloading]= useState(true);

    useEffect(()=>{
      const getproducts = () =>{
            const productsArray = [];

            const path = `products-${props.type}`;

            getDocs(collection(firestore,path)).then((querySnapshot)=>{
              querySnapshot.forEach((doc)=>{
                productsArray.push({...doc.data(),id: doc.id})
                
              })
              setProducts(productsArray)
    

            }).catch((err)=>{
              console.log(err.message)
            })
      } 
      getproducts()
    },[])


       




    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 10
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 10
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
  return (<>





    <Carousel responsive={responsive}>
    {products.map((product)=>(<Sliderproductcard  key={product.id}  product={product}/>))}
  </Carousel>
  </>
  )
}
