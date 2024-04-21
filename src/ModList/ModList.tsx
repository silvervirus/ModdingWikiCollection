import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import ModCircle from '../ModCircle/ModCircle';
import './ModList.css';
import { useParams } from 'react-router-dom';

export interface Mod {
    modname: string;
    download: string;
    image: string;
    requirements: string[];
    description: string;
}

export default function ModList(): JSX.Element {
    const { username } = useParams<{ username: string }>();
    const [mods, setMods] = useState<Mod[]>([]);

    useEffect(() => {
        fetch(`${username}.json`)
            .then(response => response.json())
            .then((data: { mods: Mod[] }) => setMods(data.mods))
            .catch(error => console.error('Error fetching mods:', error));
    }, [username]);

    return (
        <>
            <NavBar />
            <div className="container">
                <h2>{username} Mods</h2>
                <div className="table">
                    <div className="tableRow">
                        <ModCircle mods={mods} />
                    </div>
                </div>
            </div>
        </>
    );
}
