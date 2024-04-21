import NavBar from '../NavBar/NavBar';
import ModCircle from '../ModCircle/ModCircle';
import './ModList.css';
import { useParams } from 'react-router-dom';

interface User {
    username: string;
    mods: Mod[];
}

interface Mod {
    modname: string;
    download: string;
    image: string;
    requirements: string[];
    description: string;
}

export default function ModList(): JSX.Element {
    const { game, username } = useParams<{ game: string; username: string }>();
    const userJsonUrl = `/silvervirus/ModdingWikiCollection/src/ModList/${username}.json`;

    const [userData, setUserData] = React.useState<User | null>(null);

    React.useEffect(() => {
        fetch(userJsonUrl)
            .then(response => response.json())
            .then((data: User) => setUserData(data))
            .catch(error => console.error('Error fetching user data:', error));
    }, [userJsonUrl]);

    if (!userData)
        return <span>Loading...</span>;

    return (
        <>
            <NavBar />
            <div className="container">
                <h2>{userData.username}'s Mods</h2>
                <div className="table">
                    <div className="tableRow">
                        <ModCircle mods={userData.mods} username={userData.username} />
                    </div>
                </div>
            </div>
        </>
    );
}
