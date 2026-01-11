import './Home.css';
import Circles from '../Circles/Circles';
import { UserData } from '../Data/UserData';

const Home = () => {
  return (
    <div>
      <h1>Modding Hub</h1>
      <div className="circle-container">
        <Circles users={UserData['Legacy']} />
      </div>
    </div>
  );
};

export default Home;
