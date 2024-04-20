import NavBar from '../NavBar/NavBar';
import Circles from '../Circles/Circles'; // Import Circle component from the correct path
import userData from './users.json'; // Import user data
import './Legacy.css';

export default function Legacy(): JSX.Element {
    return (
        <>
            <NavBar />
           
            <div className="container">
                <h2>Subnautica Legacy Modders</h2>
                <div className="table">
                    <div className="tableRow">
                        {/* Render Circle component with user data */}
                        <Circle users={userData} />
                    </div>
                </div>
            </div>
        </>
    );
}
