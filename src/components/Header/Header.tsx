import Logo from '../../assets/logo.png'
import { ReactComponent as SearchIcon } from '../../assets/search.svg'
import { ReactComponent as FilterIcon } from '../../assets/filter.svg'
import { ReactComponent as MenuIcon } from '../../assets/menu.svg'
import React, { useState } from 'react';
import './Header.less';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((open) => !open);

  return (
    <header id="header">
      <img src={Logo} alt="MyList" className="logo"/>

      <div className="search-bar">
        <SearchIcon className="icon" />
        <input type="text" placeholder="Pesquise sua tarefa" />
      </div>

      <div className="actions">
        <FilterIcon className="icon" />
        
        <div className="menu-wrapper">
          <MenuIcon className="icon" onClick={toggleMenu} />
          {menuOpen && (
            <div className="dropdown">
                <Link to="/change-password" className="link">Trocar Senha</Link>
                <Link to="/logout" className="link">Sair</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;