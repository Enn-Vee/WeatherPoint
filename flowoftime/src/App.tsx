import React, { useEffect } from 'react';
import { useAppDispatch } from './redux/hooks';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css'
import Success from './components/Authorization/Success';
import Main from './components/MainScreen/Main';
import { getUser } from './redux/reducers/userReducer';

function App() {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch])

  

  return (
    <Router>
        <div className="App" style={{ overflow: "hidden" }}>
          <Switch>
            <Route path="/login/success" component={Success}/>
            <Route exact path="/" component={Main} />
          </Switch>
        </div>
    </Router>
  );
}

export default App;
