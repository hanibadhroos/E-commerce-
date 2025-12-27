// import { useReducer, useEffect } from "react";
// import axios from "axios";


// export default function HomeReducer(currentState, action){

//     switch(action.type){
//         case "load":{
//             const fetchProducts = async (action.payload.category = "all") => {
//                 // setLoading(true);
//                 // setError(null);
//                 try{
//                     let apiUrl = "https://fakestoreapi.com/products";
    
//                     if(category !== "all"){
//                         apiUrl = `https://fakestoreapi.com/products/category/${category}`;
//                     }
    
//                     const response = await axios.get(apiUrl);
//                     console.log(response)
//                     setProducts(response.data);
//                 }
//                 catch(e){
//                     setError(e.message);
//                     console.error("Error fetching products:", e);
//                 }
//                 finally {
//                     setLoading(false);
//                 }
//             }
    
//             fetchProducts();
//         }


            
//     }
//     return []
// }