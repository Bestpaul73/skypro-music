import { useState } from 'react'

const MainNav = () => {
  
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenuOpen = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <nav className="main__nav nav">
      <div className="nav__logo logo">
        <img className="logo__image" src="img/logo.png" alt="logo" />
      </div>
      <div className="nav__burger burger" onClick={toggleMenuOpen}>
        <span className="burger__line" />
        <span className="burger__line" />
        <span className="burger__line" />
      </div>
      {menuOpen ? (
        <div className="nav__menu menu">
          <ul className="menu__list">
            <li className="menu__item">
              <a href="#top" className="menu__link">
                Главное
              </a>
            </li>
            <li className="menu__item">
              <a href="#top" className="menu__link">
                Мой плейлист
              </a>
            </li>
            <li className="menu__item">
              <a href="../signin.html" className="menu__link">
                Войти
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </nav>
  )
}

export default MainNav
