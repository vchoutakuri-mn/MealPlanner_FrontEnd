import logo from './logo.svg';
import './App.css';
import Vender from './components/Vender/index';
import Start from './components/Employee/home';
import Finance from './components/FinanaceTeam/finance';
import MyApp from './components/Employee/Emp_home_new';
import Employee from './components/Employee/data/Employee';
import { SET_TOKEN ,GET_TOKEN,VALIDATE_TOKEN} from './components/Vender/data/Storage';
function App() {
 
  return (
    <div className="App" >
      <Start/>
    </div>
  );
}


export default App;
