import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductComponent from "../components/ProductComponent";
import { Link } from "react-router-dom";

export default function Home(){

    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);


    ////Get categories
    useEffect( ()=>{
        const fetchCategories = async ()=>{
            try{
                const response = await axios.get("https://fakestoreapi.com/products/categories");
                setCategories(response.data);
            }
            catch(e){
                console.error("Error fetching categories ", e);
            }
        }

        fetchCategories();
    }, []);

    ////Get products
    useEffect(()=>{
        const fetchProducts = async (category = "all")=>{
            setLoading(true);
            setError(null);
            try{
                let apiUrl = "https://fakestoreapi.com/products";

                if(category !== "all"){
                    apiUrl = `https://fakestoreapi.com/products/category/${category}`;
                }

                const response = await axios.get(apiUrl);
                setProducts(response.data);
            }
            catch(e){
                setError(e.message);
                console.error("Error fetching products:", e);
            }
            finally {
                setLoading(false);
            }
        }

        fetchProducts();
    },[selectedCategory])

    const categoriesList = categories.map((c)=>{
        return (<option key={c} value={c} > 
                    {c}
                </option>)
        
    })

    const featuredProducts = [...products];
    featuredProducts.sort((a, b)=>b.rating.rate - a.rating.rate);


    function getProductDetails(e){
        
    }


    return(
        <div style={{backgroundColor:'#000000ab', minHeight:'100vh'}}>
            <select name="" id="" className="category-select" onChange={(e)=>{getProductDetails(e)}}>
                {categoriesList}
            </select>
            

            {loading && (
                <div style={{ textAlign: 'center', margin: '20px' }}>
                <div style={{ color: '#4CAF50', fontSize: '18px' }}>
                    Loading products...
                </div>
                </div>
            )}

            {error && (
                <div style={{ color: '#ff6b6b', margin: '20px', textAlign: 'center' }}>
                Error: {error}
                </div>
            )}

            <div style={{display:'flex'}} className="content">
                {/* Products  */}
                <div className="products-container">
                {products.length > 0 ? (
                products.map((product) => (
                        <Link key={product.id} to={`product/${product.id}`} style={{textDecoration:'none',}}>
                            <ProductComponent product={product}/>
                        </Link>
                    ))
                ) : (
                !loading && !error && (
                    <div style={{ 
                    gridColumn: '1/-1', 
                    textAlign: 'center', 
                    color: '#aaa',
                    fontSize: '18px'
                    }}>
                    No products found
                    </div>
                )
                )}
                </div>

                {/* Featured products */}
                <div className="featured-products">
                    <h2 style={{color:'white'}}>Most Rating</h2>
                    <hr />
                    <ul>
                        {featuredProducts.length > 0? (
                            featuredProducts.map((p)=>{
                                return(
                                    <li key={p.id} style={{color:'white'}}>
                                        <img 
                                            className="product-img" src={p.image} alt={p.title} style={{width:'60px', height:'60px', }} 
                                        />
                                        <br />
                                        <div>
                                            <b style={{width:'90%'}}>{p.title}</b> 
                                            <i>⭐{p.rating.rate}</i>
                                        </div>
                                        <hr />
                                    </li>
                                )
                            })
                        ) : <div></div>

                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}