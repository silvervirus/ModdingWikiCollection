import NavBar from '../NavBar/NavBar';
import Circles from './ModCircle'; // Import Circle component from the correct path
import './ModList.css';
import { useParams } from 'react-router-dom';
import { UserData } from '../Data/ModData';
import { UserData } from '../Data/UserData';

export default function ModList(): JSX.Element {

    // Pulls data from the URL Route that we defined in our router
    // /mods/:game creates a variable named game in location
    const location = useParams();
    const game = location.game!;
    const Modder = location.Modder!;
    const usersList = UserData[game];
    const modList = ModData[Modder];

    if (!usersList)
        return <span>Mod list not defined for {Modder}</span>;

    return (
        <>
            <NavBar />
           
            <div className="container">
                <h2>Subnautica {game} Modders</h2>
                <div className="table">
                    <div className="tableRow">
                        {/* Render Circle component with user data */}
                        <Circles users={usersList} />
                    </div>
                </div>
            </div>
        </>
    );
}
