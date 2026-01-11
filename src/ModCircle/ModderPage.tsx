import { useParams } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import ModCircle from './ModCircle';
import './ModList.css';

export default function ModderPage(): JSX.Element {
    const { Modder } = useParams();

    if (!Modder) return <span>No modder selected</span>;

    return (
        <>
            <NavBar />
            <div className="container">
                <h2>{Modder}'s Mods</h2>
                <div className="circle-container">
                    <ModCircle modderName={Modder} />
                </div>
            </div>
        </>
    );
}
