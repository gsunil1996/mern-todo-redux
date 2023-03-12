import './App.css';
import {
  Switch,
  Route,
} from "react-router-dom";
import ExternalDrawer from './drawer/ExternalDrawer';

import PageNotFound from './components/PageNotFound';
import TodoBasic from './components/users/TodoBasic';
import Products from './components/products/Products';
import TodoSingle from './components/users/TodoSingle';
import SingleProduct from './components/products/SingleProduct';

function App() {

  return (
    <div className="App" style={{ display: "flex", marginTop: 80, paddingRight: "10px" }} >

      <ExternalDrawer />

      <Switch>
        <Route exact path="/" component={TodoBasic} />
        <Route exact path='/singleTodo/:id' component={TodoSingle} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/singleProduct/:id" component={SingleProduct} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
