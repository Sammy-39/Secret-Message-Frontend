import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Landing from './landing'
import Home from './home'
import ViewMsg from './viewMsg'
import Msg from './msg';

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
        <Route path='/msg'>
          <Msg />
        </Route>
        <Route path='/message'>
          <ViewMsg />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
