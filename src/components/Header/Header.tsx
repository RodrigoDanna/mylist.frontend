import Logo from '../../assets/logo.png'
import { ReactComponent as ReturnIcon } from '../../assets/return.svg'
import { ReactComponent as SearchIcon } from '../../assets/search.svg'
import { ReactComponent as FilterIcon } from '../../assets/filter.svg'
import { ReactComponent as MenuIcon } from '../../assets/menu.svg'
import React, { useState, useEffect } from 'react'
import './Header.less'
import { Link, useNavigate } from 'react-router-dom'
import TaskFilterPanel from '../TaskFilterPanel/TaskFilterPanel'

interface HeaderProps {
  className?: string
  type?: string
  searchTerm?: string
  onSearchTermChange?: (value: string) => void
  filterOptions?: any
  setFilterOptions?: any
  sortOption?: any
  setSortOption?: any
}

const Header: React.FC<HeaderProps> = ({
  className = 'header',
  type = 'list',
  searchTerm = '',
  onSearchTermChange,
  filterOptions,
  setFilterOptions,
  sortOption,
  setSortOption
}) => {
  const [filterOpen, setFilterOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggleMenu = () => setMenuOpen((open) => !open)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const headerClass = [className, scrolled ? 'scrolled' : '', type === 'return' ? 'not-fixed' : '']
    .filter(Boolean)
    .join(' ')

  return (
    <header id="header" className={headerClass}>
      <img src={Logo} alt="MyList" className="logo" />

      {type === 'return' ? (
        <ReturnIcon className="icon" onClick={() => navigate('/list')} />
      ) : (
        <div className="search-bar">
          <SearchIcon className="icon" />
          <input
            type="text"
            placeholder="Pesquise sua tarefa"
            value={searchTerm}
            onChange={(e) => onSearchTermChange?.(e.target.value)}
          />
        </div>
      )}

      <div className="actions">
        {type !== 'return' && (
          <>
            <FilterIcon
              onClick={() => setFilterOpen(true)}
              className="icon"
              title="Filtrar tarefas"
            />

            <TaskFilterPanel
              isOpen={filterOpen}
              onClose={() => setFilterOpen(false)}
              filterOptions={filterOptions}
              setFilterOptions={setFilterOptions}
              sortOption={sortOption}
              setSortOption={setSortOption}
            />
          </>
        )}

        <div className="menu-wrapper">
          <MenuIcon className="icon" onClick={toggleMenu} title="Menu" />

          {menuOpen && (
            <div className="dropdown">
              <Link to="/change-password" className="link">
                Trocar Senha
              </Link>
              <Link to="/logout" className="link">
                Sair
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
