import { useEffect, useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './Pages/Home'
import ProductDetails from './Pages/ProductDetails'
import './Style.css'
import { CartProvider } from './context/CartContext'
import Cart from './Pages/Cart'
import { FavoriteProvider } from './context/FavoritesContext'
import Favorites from './Pages/Favorites'
import { SearchProvider } from './context/SearchContext'
import { useTranslation } from 'react-i18next'
import { ModalProvider } from './context/ModalContext'
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, getCJToken } from "./features/auth/authSlice";
import Payment from './Pages/Payment'
import MyProducts from './Pages/MyProducts';
import SaveProduct from './Pages/SaveProduct';
import { ToastProvider, useToast } from './context/ToastContext'
import Toast from './components/Toast'
import { invalidateProducts, fetchProducts } from './features/products/productsSlice'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      {path: "/", element: <Home/>},
      {path: "/product/:id", element: <ProductDetails/>},
      {path: "/cart", element: <Cart/>},
      {path:"/favorites", element: <Favorites/>},
      {path: "/payment", element: <Payment/>},
      {path: "/cj-products", element: <MyProducts/>},
      {path: "/saveProduct/:id", element: <SaveProduct/>},
    ]
  }
])

///////App Content
function AppContent() {

  const { toast, hideToast } = useToast();

  return (
    <>
      <RouterProvider router={router} />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
    </>
  );
}

export default function App(){

  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  const { token, user, cjToken } = useSelector((state) => state.auth);

  
  useEffect(()=>{
    if(!cjToken){
      dispatch(getCJToken());
    }
  }, [cjToken, dispatch]);
  useEffect(() => {
    if (token && !user) {
      dispatch(fetchUser());
      dispatch(fetchProducts);
    }
  }, [token, user, dispatch]);

  useEffect(() => {
    document.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);
  
  // const [isOnline, setIsOnline] = useState(navigator.onLine);

  // useEffect(() => {
  //   const handleOnline = () => {
  //     setIsOnline(true);
  //     window.location.reload(); // ← أبسط حل (مضمون)
  //   };

  //   const handleOffline = () => {
  //     setIsOnline(false);
  //   };

  //   window.addEventListener('online', handleOnline);
  //   window.addEventListener('offline', handleOffline);

  //   return () => {
  //     window.removeEventListener('online', handleOnline);
  //     window.removeEventListener('offline', handleOffline);
  //   };
  // }, []);


  return(
    <ToastProvider>
    <CartProvider>
      <FavoriteProvider>
        <SearchProvider>
          <ModalProvider>
            <AppContent /> 
          {/* {!isOnline && (
            <div style={{
              background: '#ff4d4f',
              color: 'white',
              textAlign: 'center',
              padding: '10px',
              fontWeight: 'bold'
            }}>
              🚫 لا يوجد اتصال بالإنترنت
            </div>
          )} */}

            {/* لانني استخدمته في App Content */}
            {/* <RouterProvider router={router}/> */}
          </ModalProvider>
        </SearchProvider>
      </FavoriteProvider>
    </CartProvider>
    </ToastProvider>
  )
}
