import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';
import { useTranslation } from 'react-i18next';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import MyOrders from './MyOrders';
import { useModal } from '../context/ModalContext';
import { useSelector } from 'react-redux';
import Toast from './Toast';
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";


export default function Header() {
  
  const dispatch = useDispatch();


  const {favoritesCount} = useFavorites();

  const {getTotalItems} = useCart();
  
  const { openModal } = useModal();

  const [isOpen, setIsOpen] = useState(false);
  
  const [showAuth, setShowAuth] = useState(false);

  const {query, setQuery} = useSearch();

  const {t, i18n} = useTranslation();

  const {user, loading, error, isAuthenticated } = useSelector((state)=> state.auth);

  const authRef = useRef(null);


  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  const showAuthActions = ()=>{
    setShowAuth(prev=>!prev);
  }

  const toggleMenue = ()=> setIsOpen(!isOpen);

  // وظائف فتح المودال
  const handleOpenLogin = () => {
    openModal(<LoginForm onShowToast={showToast} />, t("login"));
  };

  const handleOpenRegister = () => {
    openModal(<RegisterForm onShowToast={showToast} />, t("register"));
  };

  const handleOpenOrders = () => {
    openModal(<MyOrders />, t("my_orders"));
  };

  const handleLogout = async ()=>{
    const credentials = user.email;
    await dispatch(logout(credentials)).unwrap();

  }

  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = "success", duration = 3000) => {
    const id = Date.now(); // معرف فريد
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (authRef.current && !authRef.current.contains(event.target)) {
        setShowAuth(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  

  return (
    <header className="bg-black text-white sticky top-0 ">
      <div className='header-actions'>

        <button className='menu-toggle' onClick={toggleMenue}>
          <i className={`fa-solid ${isOpen? 'fa-times' : 'fa-bars'}`}></i>
        </button>

        <div className='search-bar'>
          <input type="search" placeholder={t("search")} value={query} onChange={(e)=>{setQuery(e.target.value)}}/> 
        </div>

    
        <div className='icons-group'>
          
          <select className='btn btn-primary m-2' 
             value={i18n.language}
             onChange={(e) => i18n.changeLanguage(e.target.value)}
          >
            <option value="en">En</option>
            <option value="ar" >ع</option>
          </select>
          
          {isAuthenticated && user && user.role === 'admin'&& (
            <Link className="btn btn-success m-1" to="/cj-products">
              Store Products
            </Link>
          )
          }

          <button onClick={showAuthActions}>
            <i className="fas fa-user-circle"></i>
            {isAuthenticated ? user?.name : t("login")}
          </button>

          {showAuth && !isAuthenticated && (
            <div className="auth-actions" ref={authRef}>
              <button onClick={handleOpenRegister}>{t("register")}</button>
              <button onClick={handleOpenLogin}>{t("login")}</button>
            </div>
          )}

          {showAuth && isAuthenticated && (
            <div className="auth-actions" ref={authRef}>
              <button onClick={handleOpenOrders}>{t("my_orders")}</button>
              <button onClick={handleLogout}>{t("logout")}</button>
            </div>
          )}

          <Link to="/cart" className="icon-wrapper">
            <button>
              <i className='fas fa-shopping-cart'></i>
            </button>
            <span className="cart-count text-white">{getTotalItems()}</span>
          </Link>

          <Link to="/favorites" className="icon-wrapper">
            <button>
              <i className='fa-solid fa-heart' style={{color:'red'}}></i>
            </button>
            <span className="favorites-count text-white">{favoritesCount}</span>
          </Link>
          
        </div>        

      </div>

      <nav className={`nav ${isOpen ? 'active' : ''}`}>
        <span style={{width:'40%', color:'black'}}>
          <Link to="/" style={{color:'black'}}>
            <h3 style={{textAlign: i18n.language=="en"? "left": "right"}}>Hani Store</h3>
          </Link>
        </span> 
        <ul onClick={() => setIsOpen(false)}>
          <li>
            <Link>
                Samsung
            </Link>
          </li>

          <li>
            <Link>
                iPhone
            </Link>
          </li>

          <li>
            <Link>
                Smart watches
            </Link>
          </li>
        </ul>
      </nav>

      {/* Mobile nav */}
      <nav className={`mobile-menu ${isOpen ? 'show': 'hidden'}`}>
          <ul>
            <li>            
              <Link to="/cart" style={{ color: 'white', textDecoration: 'none', position: 'relative' }}>
                Cart
              </Link>
            </li>
            <li>
              <Link to="/favorites">
                <i className='fa-solid fa-heart' style={{color:'white'}}></i>
              </Link>
            </li>
            <li>
              <Link>
                  Samsung
              </Link>
            </li>

            <li>
              <Link>
                  iPhone
              </Link>
            </li>

            <li>
              <Link>
                  Smart watches
              </Link>
            </li>
          </ul>
      </nav>

      <div style={{ position: "fixed", top: 20, right: 20, zIndex: 9999 }}>
        {toasts.map((t) => (
          <Toast
            key={t.id}
            message={t.message}
            type={t.type}
            duration={t.duration}
            onClose={() => removeToast(t.id)}
          />
        ))}
      </div>
    </header>
  );
}