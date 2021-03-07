import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Landing from './landing'
import Home from './home'
import ViewMsg from './viewMsg'
import Delete from './delete';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path='/'>
          <Landing />
        </Route>
        <Route path='/home'>
          <Home />
        </Route>
        <Route path='/delete'>
          <Delete />
        </Route>
        <Route path='/message/:rs'>
          <ViewMsg />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
