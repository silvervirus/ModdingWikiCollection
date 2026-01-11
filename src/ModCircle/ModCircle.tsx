import React from 'react';
import './ModCircle.css';

interface Mod {
    modname: string;
    download: string;
    image: string;
    requirements: string[];
    description: string;
}

interface ModCircleProps {
    modderName: string;
}

const ModCircle: React.FC<ModCircleProps> = ({ modderName }) => {
    const [mods, setMods] = React.useState<Mod[]>([]);

    React.useEffect(() => {
        fetch(`./${modderName}.json`)
            .then((response) => response.json())
            .then((data) => setMods(data.mods))
            .catch((error) => console.error('Error fetching mods:', error));
    }, [modderName]);

    return (
        <>
            {mods.map((mod, index) => (
                <div key={index} className="circle-container">
                    <input type="checkbox" id={`toggle${index}`} className="toggle-input" />
                    <label htmlFor={`toggle${index}`} className="circle" title={mod.modname}>
                        <img src={mod.image} alt={mod.modname} className="circle-photo" />
                    </label>

                    <div id={`details${index}`} className="details">
                        <div className="text">
                            <div className="mod-name-background">
                                <span className="mod-name">{mod.modname}</span>
                                <br />
                                <a href={mod.download} target="_blank" rel="noopener noreferrer">Download</a>
                            </div>

                            <div className="mod-reg-background">
                                <details>
                                    <summary className="regsummary"><span className="mod-reg">Mod Requirements</span></summary>
                                    <ul className="nested-ul">
                                        {mod.requirements.map((requirement, i) => (
                                            <li key={i}><span>{requirement}</span></li>
                                        ))}
                                    </ul>
                                </details>
                            </div>

                            <div className="mod-dec-background">
                                <details>
                                    <summary className="decsummary"><span className="mod-dec">Mod Description</span></summary>
                                    <div className="dec-background"><span className="dec">{mod.description}</span></div>
                                </details>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default ModCircle;
