import { Link } from 'react-router-dom';
// import { ShoppingCart, Search } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-black text-white sticky top-0 ">
      <div className='header-actions'>
        <div className='search-bar'>
          <input type="search" placeholder='search'/> 
          <button><i className='fa-solid fa-search'></i></button>
        </div>
        <div>
          <button>
            <Link to="/cart" style={{ color: 'white', textDecoration: 'none', position: 'relative' }}>
              Cart
            </Link>
          </button>
          <button>
            <Link to="/favorites">
              <i className='fa-solid fa-heart text-red'></i>
            </Link>
          </button>
        </div>        

      </div>
      <nav className='nav'>
        <span style={{width:'40%', color:'black'}}>
          <h3>Hani Store</h3>
        </span> 
        <ul>
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