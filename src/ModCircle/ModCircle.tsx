import React, { useState, useEffect } from 'react';
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
  const [mods, setMods] = useState<Mod[]>([]);

  useEffect(() => {
    fetch(`./${modderName}.json`)
      .then((res) => res.json())
      .then((data) => setMods(data.mods))
      .catch((err) => console.error(err));
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
                <a className="mod-name">{mod.modname} <br /> <a href={mod.download}>Download</a></a>
              </div>
              <div className="mod-reg-background">
                <details>
                  <summary className="regsummary">Mod Requirements</summary>
                  <ul className="nested-ul">
                    {mod.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </details>
              </div>
              <div className="mod-dec-background">
                <details>
                  <summary className="decsummary">Mod Description</summary>
                  <div className="dec-background">{mod.description}</div>
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
