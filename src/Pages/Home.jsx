import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import ProductComponent from "../components/ProductComponent";
import { useSearch } from "../context/SearchContext";
import { useTranslation } from "react-i18next";
import api from "../api/axios";
import { useSelector, useDispatch} from "react-redux";
import { fetchProducts } from "../features/products/productsSlice";

export default function Home(){

    const {t, i18n} = useTranslation();
    const dispatch = useDispatch();

    // const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);

    const {authReady} = useSelector((state)=> state.auth);

    const {items: products, loading, error} = useSelector((state) => state.products);
    
    const {query} = useSearch();

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

    useEffect(() => {
        if(!authReady) return;
        dispatch(fetchProducts());
    }, [dispatch, authReady]);

    ////Get products
    // useEffect(()=>{
    //     if(!authReady) return;
    //     const fetchProducts = async ()=>{
    //         setLoading(true);
    //         setError(null);
    //         try{

    //             const response = await api.get('/api/products');
    //             setProducts(response.data);
    //         }
    //         catch(e){
    //             setError(e.message);
    //             console.error("Error fetching products:", e);
    //         }
    //         finally {
    //             setLoading(false);
    //         }
    //     }

    //     fetchProducts();
    // },[selectedCategory, authReady])


    const categoriesList = categories.map((c)=>{
        return (<option key={c} value={c} > 
                    {c}
                </option>)
        
    })


    const filteredProducts = useMemo(()=>{
        return products.filter((product)=>
            product.ar_name.toLowerCase().includes(query.toLowerCase())
        );
    }, [products, query]);

    // const filteredProducts = products.filter((product)=>
    //     product.ar_name.toLowerCase().includes(query.toLowerCase())
    // )

    // const featuredProducts = [...filteredProducts].sort((a, b) => b.rating.rate - a.rating.rate);

    return(
        <div style={{ minHeight:'100vh'}}>
            <div className="row fliters">
                <div >{t("all")}</div>
                <div >{t('top_rated')}</div>
                <div >{t('top_demand')}</div>
                <div >{t("might_interest_you")}</div>
            </div>

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

            <div style={{display:'flex', padding: '10px', background:'white'}} className="content">
                {/* Products  */}
                <div className="products-container row w-100" style={{margin:'auto'}}>
                {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                        <ProductComponent key={product.id} product={product}/>
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
                {/* <div className="categories m-2">
                    {!loading && !error? (
                            <div>
                                <ul>
                                    <li>جوالات سامسونج</li>
                                    <li>جوالات ايفون</li>
                                    <li>ساعات رقمية</li>
                                </ul>
                            </div>
                        ) : (
                            <div>
                                Loading...
                            </div>
                        )
                    }
                </div> */}
            </div>
        </div>
    )
}