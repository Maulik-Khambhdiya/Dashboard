import './App.css';
import Academyperformance from './pages/Academyperformance';
import AddStudent from './pages/AddStudent';
import FeesDetails from './pages/FeesDetails';
import Home from './pages/Home';
import Login from './pages/Login';
import StreamClass from './pages/StreamClass';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {

  return (
    <>
      <Router>

        <Switch>

          <Route exact path="/">
            <Login></Login>
          </Route>

          <Route path="/home">
            <Home></Home>
          </Route>

          <Route path="/streamclass">
            <StreamClass></StreamClass>
          </Route>

          <Route path="/add-student">
            <AddStudent></AddStudent>
          </Route>

          <Route path="/academyperformance">
            <Academyperformance></Academyperformance>
          </Route>

          <Route path="/feesdetails">
            <FeesDetails></FeesDetails>
          </Route>

        </Switch>

      </Router>

    </>
  );
}

export default App;
