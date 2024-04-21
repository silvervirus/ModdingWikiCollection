import NavBar from '../NavBar/NavBar';
import ModCircle from '../ModCircle/ModCircle';
import './ModList.css';
import { useParams } from 'react-router-dom';
import { UserData } from '../Data/UserData';

export default function ModList(): JSX.Element {
    const { game, username } = useParams<{ game: string; username: string }>();
    const usersList = UserData[game];

    if (!usersList)
        return <span>User list not defined for {game}</span>;

    const user = usersList.find((user) => user.username === username);
    if (!user)
        return <span>User not found</span>;

    return (
        <>
            <NavBar />
            <div className="container">
                <h2>{user.username}'s Mods</h2>
                <div className="table">
                    <div className="tableRow">
                        {/* Render ModCircle component with user's mods and username */}
                        <ModCircle mods={user.mods} username={user.username} />
                    </div>
                </div>
            </div>
        </>
    );
}
