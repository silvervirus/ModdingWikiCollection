import React from 'react';
import NavBar from '../NavBar/NavBar';
import ModCircle from '../ModCircle/ModCircle';
import './ModList.css';
import { useParams } from 'react-router-dom';
import { UserData, User } from '../Data/UserData';

interface Mod {
    modname: string;
    download: string;
    image: string;
    requirements: string[];
    description: string;
}

export default function ModList(): JSX.Element {
    const { username } = useParams<{ username: string }>();
    const [mods, setMods] = React.useState<Mod[]>([]);

    React.useEffect(() => {
        fetch(`./${username}.json`)
            .then(response => response.json())
            .then((data: { mods: Mod[] }) => setMods(data.mods))
            .catch(error => console.error('Error fetching mods:', error));
    }, [username]);

    return (
        <>
            <NavBar />
            <div className="container">
                <h2>{username}'s Mods</h2>
                <div className="table">
                    <div className="tableRow">
                        {mods.map((mod, index) => (
                            <div key={index} className="circle-container">
                                <ModCircle modname={mod.modname} onClick={() => console.log('Circle clicked')} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
