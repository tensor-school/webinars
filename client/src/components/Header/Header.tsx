import logo from './bird128.png';

export const Header = () => {
  return (
    <header className="header">
        <a href="/" className="header__link link">
            <img src={logo} height="32" width="32"/>
            <span>Tensor Todo</span>
        </a>
        <input type="search" className="header__input" placeholder="Search by text..."/>
        <div className="header__nav">
            <a href="/" className="header__navLink link">Pricing</a>
            <a href="/" className="header__navLink link">About</a>
        </div>
    </header>
  );
};