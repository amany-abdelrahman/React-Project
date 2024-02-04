import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Switch} from "react-router-dom"
import Navbar from './Components/Navbar'
import SignUp from './Components/Authentication/SignUp';
import LogIn from './Components/Authentication/LogIn';
import ProductList from './Components/Products/ProductList';
import ProductDetails from './Components/Products/ProductDetails';
import Cart from './Pages/Cart';
import Favorite from './Pages/Favorite';
import NotFound from './Pages/NotFound';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Switch>
          <Route exact path={"/"} component={ProductList} />
          <Route exact path={"/SignUp"} component={SignUp} />
          <Route exact path={"/LogIn"} component={LogIn} />
          <Route exact path={"/ProductList"} component={ProductList}/>
          <Route exact path={"/product/:productId"} component={ProductDetails} />
          <Route exact path={"/Cart"} component={Cart}/>
          <Route exact path={"/Favorite"} component={Favorite}/>
          <Route exact path={"*"} component={NotFound}/>
        </Switch> 
      </BrowserRouter>
    </div>
  );
}

export default App;
