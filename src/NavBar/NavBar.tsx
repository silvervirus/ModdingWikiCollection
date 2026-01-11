import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';

export default function NavBar(): JSX.Element {
    return (
        <div className="navbar">
            <div><Link to="/">Home</Link></div>
            <div><Link to="/mods/Legacy">Legacy Mods</Link></div>
            <div><Link to="/mods/Stable">Stable Mods</Link></div>
            <div><Link to="/mods/BelowZero-Legacy">Below Zero Legacy Mods</Link></div>
        </div>
    );
}
