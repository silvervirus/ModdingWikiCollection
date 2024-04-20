import NavBar from '../NavBar/NavBar';
import './Home.css';

export default function Home() : JSX.Element {
    return (
        <>
            <NavBar />
            <br/>
            <div className="container">
                <h1>Welcome To the Mod Backup wiki</h1>
                <h2>with this wiki we are hoping to backup links used on submodica so if anything happens to Submodica we will have the backups and mods to available to the community</h2>
            </div>
        </>
    );
}