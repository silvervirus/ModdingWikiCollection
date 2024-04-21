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
    mod: Mod;
}

const ModCircle: React.FC<ModCircleProps> = ({ mod }) => {
    const { modname, download, image, requirements, description } = mod;

    return (
        <div className="circle-container">
            <div className="circle">
                <img src={image} alt="Avatar" className="circle-photo" />
            </div>
            <div className="details">
                <div className="text">
                    <div className="mod-name-background">
                        <a className="mod-name">{modname} <br /> <a href={download}>Download</a></a>
                    </div>
                    <div className="mod-reg-background">
                        <details>
                            <summary className="regsummary"><a className="mod-reg">Mod Requirements</a></summary>
                            <ul className="nested-ul">
                                {requirements.map((requirement, i) => (
                                    <li key={i}><a href="#">{requirement}</a></li>
                                ))}
                            </ul>
                        </details>
                    </div>
                    <div className="mod-dec-background">
                        <details>
                            <summary className="decsummary"><a className="mod-dec">Mod Description</a></summary>
                            <div className="dec-background"> <a className="dec">{description}</a> </div>
                        </details>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModCircle;
