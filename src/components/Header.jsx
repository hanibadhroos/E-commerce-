import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

export default function Header() {
  
  const {favoritesCount} = useFavorites();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenue = ()=> setIsOpen(!isOpen);

  return (
    <header className="bg-black text-white sticky top-0 ">
      <div className='header-actions'>

        <button className='menu-toggle' onClick={toggleMenue}>
          <i className={`fa-solid ${isOpen? 'fa-times' : 'fa-bars'}`}></i>
        </button>

        <div className='search-bar'>
          <input type="search" placeholder='search'/> 
          <button>
            <i className='fa-solid fa-search'></i>
          </button>
        </div>


        <div className='icons-group'>
          <button>
            <Link to="/cart" style={{ color: 'white', textDecoration: 'none', position: 'relative' }}>
              Cart
            </Link>
          </button>

          <Link to="/favorites">
            <button>
                <i className='fa-solid fa-heart' style={{color:'red'}}></i>
            </button>
          </Link>
          <i className="favorites-count">{favoritesCount}</i>
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