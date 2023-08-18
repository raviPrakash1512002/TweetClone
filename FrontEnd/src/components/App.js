import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route,Navigate } from "react-router-dom";

import { useAuth } from "../hooks";
import { Home, Login,Signup,Settings,UserProfile,MobileHome } from "../pages"
import { Loader, Navbar } from "./index";
import {db} from '../utills/firebase';
import { useMediaQuery } from 'react-responsive'
import { useEffect } from "react";



function PrivateRoute({ children }) {
  const auth = useAuth();
  return auth.user? children : <Navigate to="/login" />;
}

const Page = () => {
  return <h1>404</h1>;
};

function App() {
  const auth = useAuth();
  // const islaptop = useMediaQuery({
  //   query: "(max-device-width: 1201px )",
  // });
  // const islaptop = useMediaQuery({
  //   query: '(min-width: 1224px)'
  // })
  const isMobileDevice = useMediaQuery({
    query: "(max-width: 768px)",
  });
  
  
  useEffect(()=>{
  

  },[isMobileDevice])
 

  

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
        <Route exact path="/" element={isMobileDevice?<MobileHome />:<Home />} />
          {/* <Route exact path="/" element={(islaptop&&<Home />)&&(isMobileDevice&&<MobileHome />)} /> */}
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Signup />} />
          
          <Route exact path="/settings"element={<PrivateRoute> <Settings /> </PrivateRoute>}/>
          <Route exact path="/user/:userId"element={<PrivateRoute> <UserProfile /> </PrivateRoute>}/>
          <Route exact path="*" element={<Page />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
