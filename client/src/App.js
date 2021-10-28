import './App.css';
import Navbar from './components/Navbar';
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import NotFound from "./components/NotFound";
import { Route ,Switch} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route path="/about">
        <About />
      </Route>

      <Route path="/contact">
        <Contact />
      </Route>

      <Route path="/login">
        <Login />
      </Route>

      <Route path="/register">
        <SignUp />
      </Route>
      
      <Route>
        <NotFound/>
      </Route>
      </Switch>
    </div>
  );
}

export default App;
