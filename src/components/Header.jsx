import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';
import { useTranslation } from 'react-i18next';
export default function Header() {
  
  const {favoritesCount} = useFavorites();

  const {getTotalItems} = useCart();

  const [isOpen, setIsOpen] = useState(false);

  const {query, setQuery} = useSearch();

  const {t, i18n} = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  
  const toggleMenue = ()=> setIsOpen(!isOpen);

  return (
    <header className="bg-black text-white sticky top-0 ">
      <div className='header-actions'>

        <button className='menu-toggle' onClick={toggleMenue}>
          <i className={`fa-solid ${isOpen? 'fa-times' : 'fa-bars'}`}></i>
        </button>

        <div className='search-bar'>
          <input type="search" placeholder='search' value={query} onChange={(e)=>{setQuery(e.target.value)}}/> 
        </div>


        <div className='icons-group'>
          
          <select className='btn btn-primary m-2' 
             value={i18n.language}
             onChange={(e) => i18n.changeLanguage(e.target.value)}
          >
            <option value="en">En</option>
            <option value="ar" >ع</option>
          </select>

          <select name="" id="" className='btn btn-info m-2' style={{width:'40px'}}>
            <option value="">تسجيل الدخول</option>
            <option value="">طلباتي</option>
          </select>


          <Link to="/cart" style={{ color: 'white', textDecoration: 'none', position: 'relative' }}>
            <button>
                <i className='fas fa-shopping-cart'></i>
            </button>
            <i className="cart-count">{getTotalItems()}</i>
          </Link>

          <Link to="/favorites">
            <button>
              <i className='fa-solid fa-heart' style={{color:'red'}}></i>
              <i className="favorites-count">{favoritesCount}</i>
            </button>
          </Link>
        </div>        

      </div>

      <nav className={`nav ${isOpen ? 'active' : ''}`}>
        <span style={{width:'40%', color:'black'}}>
          <Link to="/" style={{color:'black'}}>
            <h3>Hani Store</h3>
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
                <i className='fa-solid fa-heart' style={{color:'red'}}></i>
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
    </header>
  );
}