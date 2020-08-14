import React from 'react';
import './App.css';
import NavBar from './components/NavBar'
import Home from './components/Home'
import ContactUs from './components/Contact'
import Carts from './components/Carts'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Footer from './components/footer';
import ItemDetail from './components/ItemDetail';

const App = (props) => {
  return (
    <Router>
      <div className="App">
      <NavBar />
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/contact_us' component={ContactUs}/>
            <Route path='/cart' component={Carts}/>
            <Route path='/items/:item_id' component={ItemDetail} />
          </Switch>
      <Footer />
      </div>
    </Router>
  );
}

export default App;
