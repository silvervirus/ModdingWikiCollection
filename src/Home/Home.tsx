import NavBar from '../NavBar/NavBar';
import './Home.css';

export default function Home(): JSX.Element {
    return (
        <>
            <NavBar />
            <br/>
            <div className="container">
                <h1>Welcome To the Mod Backup Wiki</h1>
                <h2>
                    With this wiki, we hope to backup links used on Submodica. 
                    If anything happens to Submodica, we will have the backups and mods available to the community.
                </h2>
            </div>
        </>
    );
}
