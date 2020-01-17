import React, { useState, useEffect } from 'react';
import './global.css';
import './Sidebar.css';
import './Main.css';
import './App.css';

function App() {

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>

        <form>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do GitHub</label>
            <input name="github_username" id="github_username" required />
          </div>

          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input name="techs " id="techs" required />
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input name="latitude" id="latitude" required />
            </div>

            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input name="longitude " id="longitude" required />
            </div>
          </div>

          <button type="submit">Salvar</button>
        </form>
      </aside>
      <main>
        <ul>
          <li className="dev-item">
            <header>
              <img src="https://avatars0.githubusercontent.com/u/26979210?s=460&v=4" alt="Arthur Ferreira"/>
              <div className="user-info">
                <strong>Arthur Ferreira</strong>
                <span>Angular, Ionic, PHP</span>
              </div>
            </header>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi voluptate fuga incidunt molestiae, cum nostrum veniam dolor ad aliquid commodi fugiat in labore vel esse alias officiis tempore dolore repudiandae?</p>
            <a href="https://github.com/Arthurferrera">Acessar perfil no GitHub</a>
          </li>
          <li className="dev-item">
            <header>
              <img src="https://avatars0.githubusercontent.com/u/26979210?s=460&v=4" alt="Arthur Ferreira"/>
              <div className="user-info">
                <strong>Arthur Ferreira</strong>
                <span>Angular, Ionic, PHP</span>
              </div>
            </header>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi voluptate fuga incidunt molestiae, cum nostrum veniam dolor ad aliquid commodi fugiat in labore vel esse alias officiis tempore dolore repudiandae?</p>
            <a href="https://github.com/Arthurferrera">Acessar perfil no GitHub</a>
          </li>
          <li className="dev-item">
            <header>
              <img src="https://avatars0.githubusercontent.com/u/26979210?s=460&v=4" alt="Arthur Ferreira"/>
              <div className="user-info">
                <strong>Arthur Ferreira</strong>
                <span>Angular, Ionic, PHP</span>
              </div>
            </header>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi voluptate fuga incidunt molestiae, cum nostrum veniam dolor ad aliquid commodi fugiat in labore vel esse alias officiis tempore dolore repudiandae?</p>
            <a href="https://github.com/Arthurferrera">Acessar perfil no GitHub</a>
          </li>
          <li className="dev-item">
            <header>
              <img src="https://avatars0.githubusercontent.com/u/26979210?s=460&v=4" alt="Arthur Ferreira"/>
              <div className="user-info">
                <strong>Arthur Ferreira</strong>
                <span>Angular, Ionic, PHP</span>
              </div>
            </header>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi voluptate fuga incidunt molestiae, cum nostrum veniam dolor ad aliquid commodi fugiat in labore vel esse alias officiis tempore dolore repudiandae?</p>
            <a href="https://github.com/Arthurferrera">Acessar perfil no GitHub</a>
          </li>
        </ul>
      </main>
    </div>
  );
}

export default App;
