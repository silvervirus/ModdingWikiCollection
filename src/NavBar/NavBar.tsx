import { Link } from 'react-router-dom';
import './NavBar.css';

export default function NavBar() : JSX.Element {
    return (
        <>
            <nav className="navbar">
                <div><a href="./index.html">Home</a></div>
                <div>
                    <a href="#">Subnautica</a>
                    <ul>
                        <li><a href="./snhelp.html">Install Instructions</a></li>
                        <li><Link to="/mods/legacy">Legacy</Link></li>
                        <li><Link href="/mods/stable">LivingLarge</Link></li>
                        <li><a href="#">TestBuilds</a></li>
                        
                    </ul>
                </div>
                <div>
                    <a href="#">BelowZero</a>
                    <ul>
                        <li><a href="./bzhelp.html">Install Instructions</a></li>
                        <li><Link to="/mods/BZlegacy">Legacy</Link></li>
                        <li><a href="#">Stable</a></li>
                        <li><a href="#">TestBuilds</a></li>
                        
                    </ul>
                </div>
                <div>
                    <a href="#">Modding Resources</a>
                    <ul>
                        <li><a href="#">Legacy</a></li>
                        <li><a href="#">Stable</a></li>
                        <li><a href="#">Thunderkit</a></li>
                    </ul>
                </div>
                <div>
                    <a href="#">Communities</a>
                    <ul>
                        <li><a href="#">Modding libraries</a></li>
                        <li><a href="#">Modding Servers</a></li>
                        <li><a href="#">Other Modding Resources</a></li>
                    </ul>
                </div>
            </nav>
        </>
    );
}
