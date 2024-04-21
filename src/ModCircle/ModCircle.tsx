import React from 'react';
import { Link } from 'react-router-dom';
import './ModCircle.css';

interface Mod {
    modname: string;
    download: string;
    image: string;
    requirements: string[];
    description: string;
}

interface ModCircleProps {
    mods: Mod[];
    username: string;
}

const ModCircle: React.FC<ModCircleProps> = ({ mods, username }) => {
    return (
        <div className="mod-circle">
            {mods.map((mod, index) => (
                <div key={index} className="mod">
                    <Link to={`/user/${username}`}>
                        <img src={mod.image} alt={mod.modname} />
                    </Link>
                    <h3>{mod.modname}</h3>
                    <p>{mod.description}</p>
                    <a href={mod.download}>Download</a>
                    <ul>
                        {mod.requirements.map((requirement, i) => (
                            <li key={i}><a href="#">{requirement}</a></li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default ModCircle;
