import React from 'react';
import '../css/Menu.css';

class Menu extends React.Component {
  render() {
    return (
      <div className="navHeader">
          <nav>
              <span>Fabien NOIZET</span>
              <a href="/#home" title="Home">accueil</a>
              <a href="/#exp">expériences</a>
              <a href="/#art">articles</a>
          </nav>
      </div>
    );
  }
}

export default Menu;
