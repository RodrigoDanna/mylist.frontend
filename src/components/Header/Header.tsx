import Logo from '../../assets/logo.png'
import { ReactComponent as SearchIcon } from '../../assets/search.svg'
import { ReactComponent as FilterIcon } from '../../assets/filter.svg'
import { ReactComponent as MenuIcon } from '../../assets/menu.svg'
import React, { useState, useEffect } from 'react';
import './Header.less';
import { Link } from 'react-router-dom';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleMenu = () => setMenuOpen((open) => !open);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerClass = [className, scrolled ? 'scrolled' : ''].filter(Boolean).join(' ');

  return (
    <header id="header" className={headerClass}>
      <img src={Logo} alt="MyList" className="logo"/>

      <div className="search-bar">
        <SearchIcon className="icon" />
        <input type="text" placeholder="Pesquise sua tarefa" />
      </div>

      <div className="actions">
        <FilterIcon className="icon" title="Filtrar tarefas"/>
        
        <div className="menu-wrapper">
          <MenuIcon className="icon" onClick={toggleMenu} title="Menu"/>

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