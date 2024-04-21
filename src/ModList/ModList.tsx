import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import ModCircle from '../ModCircle/ModCircle';
import './ModList.css';
import { useParams } from 'react-router-dom';

interface Mod {
    modname: string;
    download: string;
    image: string;
    requirements: string[];
    description: string;
}

export default function ModList(): JSX.Element {
    const { game } = useParams<{ game: string }>();
    const [mods, setMods] = useState<Mod[]>([]);

    useEffect(() => {
        fetch(`./${game}.json`)
            .then(response => response.json())
            .then((data: { mods: Mod[] }) => setMods(data.mods))
            .catch(error => console.error('Error fetching mods:', error));
    }, [game]);

    return (
        <>
        
            <NavBar />
            <div className="container">
                <h2>{game} Modders</h2>
                <div className="table">
                    <div className="tableRow">
                        {mods.map((mod, index) => (
                            <div key={index} className="circle-container">
                                <ModCircle mod={mod} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
