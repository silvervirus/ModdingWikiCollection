import './NavBar.css';

export default function NavBar() : JSX.Element {
    return (
        <>
            <nav className="navbar">
                <ul>
                    <li><a href="./index.html">Home</a></li>
                    <li>
                        <a href="#">Subnautica</a>
                        <ul>
                            <li><a href="./snhelp.html">Install Instructions</a></li>
                            <li><a href="./snlegacy.html">Legacy</a></li>
                            <li><a href="#">LivingLarge</a></li>
                            <li><a href="#">TestBuilds</a></li>
                            
                        </ul>
                    </li>
                    <li>
                        <a href="#">BelowZero</a>
                        <ul>
                            <li><a href="./bzhelp.html">Install Instructions</a></li>
                            <li><a href="./Belowzero.html">Legacy</a></li>
                            <li><a href="#">Stable</a></li>
                            <li><a href="#">TestBuilds</a></li>
                            
                        </ul>
                    </li>
                    <li>
                        <a href="#">Modding Resources</a>
                        <ul>
                            <li><a href="#">Legacy</a></li>
                            <li><a href="#">Stable</a></li>
                            <li><a href="#">Thunderkit</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">Communities</a>
                        <ul>
                            <li><a href="#">Modding libraries</a></li>
                            <li><a href="#">Modding Servers</a></li>
                            <li><a href="#">Other Modding Resources</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </>
    );
}