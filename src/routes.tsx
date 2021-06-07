import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import DeletedClips from './pages/DeletedClips';
import DeletedVods from './pages/DeletedVods';
import DownloadClip from './pages/DownloadClip';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
// import api from './services/api';

interface routeProps{
  update: Function
}

const Routes: React.FC<routeProps> = (props: any) => {

  return (
    <Router>
      <Switch>
        <Route path="/DeletedClips">
          <DeletedClips />
        </Route>
        <Route path="/DeletedVods">
          <DeletedVods />
        </Route>
        <Route path="/DownloadClip">
          <DownloadClip />
        </Route>
        <Route path="/404">
          <NotFound />
        </Route>

        <Route path="/" exact>
          <Home {...props} />
        </Route>

        <Redirect to="/404" />
      </Switch>
    </Router>
  );
};

export default Routes;
