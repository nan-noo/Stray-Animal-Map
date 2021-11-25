import React, {Suspense} from "react";
import {Switch, Route} from "react-router-dom";

import LandingPage from './views/LandingPage/LandingPage';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import CommunityPage from './views/CommunityPage/CommunityPage';
import PostDetail from './views/PostDetail/PostDetail';
import NavBar from './views/NavBar/NavBar';
import Footer from './views/Footer/Footer';

import MapProvider from '../context/MapContext';

// Auth(component, loginOption, adminRoute)
import Auth from '../hoc/auth';
import UploadPage from './views/UploadPage/UploadPage';

// const EnhancedComponent = higherOrderComponent(WrappedComponent, opt...); // hoc

function App() {
  return (
    <Suspense fallback={<h1>Loading profile...</h1>}>
        <NavBar/>
        <div style={{
          minHeight: 'calc(100vh - 80px)'
        }}>
          <MapProvider>
            <Switch>
              <Route exact path="/" component={Auth(LandingPage, null)} />
              <Route exact path="/upload" component={Auth(UploadPage, true)} />
              <Route exact path="/login" component={Auth(LoginPage, false)} />
              <Route exact path="/register" component={Auth(RegisterPage, false)} />
              <Route exact path="/community/page/:page(\d+)" component={Auth(CommunityPage, null)} />
              <Route exact path="/community/:postId" component={Auth(PostDetail, null)} />
            </Switch>
          </MapProvider>
        </div>
        <Footer/>
    </Suspense> 
  );
}

export default App;
