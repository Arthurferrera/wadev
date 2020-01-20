import React from 'react';

import './styles.css';

import iconGit from '../../assets/github-icon.svg';
import iconDelete from '../../assets/delete.svg';


export default function DevItem(props) {
    const { dev } = props;

    // esse clique funciona
    async function deleteDev(e) {
        e.preventDefault();
        console.log(dev);
    }
    
    return (
        <li className="dev-item">
            <header>
                <img className="imageUser" src={dev.avatar_url} alt={dev.name}/>
                <div className="user-info">
                    <strong>{dev.name}</strong>
                    <span>{dev.techs.join(", ")}</span>
                </div>
                <img onClick={deleteDev} className="iconDelete" src={iconDelete} alt="Apagar Dev" title="Apagar Dev"/>
            </header>
            <p>{dev.bio}</p>
            {/* eslint-disable-next-line */}
            <a target="_blank" href={`https://github.com/${dev.github_username}`}>Acessar perfil no <img src={iconGit} alt=""/> GitHub</a>
        </li>  
    );
}
