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
                        <img src={mod.image} alt="Photo" className="circle-photo" />
                    </label>
                    <div id={`details${index}`} className="details">
                        <div className="text">
                            <div className="mod-name-background">
                                <a className="mod-name">{mod.modname} <br /> <a href={mod.download}>Download</a></a>
                            </div>
                            <div className="mod-reg-background">
                                <details>
                                    <summary className="regsummary"><a className="mod-reg">Mod Requirements</a></summary>
                                    <ul className="nested-ul">
                                        {mod.requirements.map((requirement, i) => (
                                            <li key={i}><a href="#">{requirement}</a></li>
                                        ))}
                                    </ul>
                                </details>
                            </div>
                            <div className="mod-dec-background">
                                <details>
                                    <summary className="decsummary"><a className="mod-dec">Mod Description</a></summary>
                                    <div className="dec-background"> <a className="dec">{mod.description}</a> </div>
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