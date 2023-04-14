import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Sigin from './Auth/Sigin';
import Siggup from './Auth/Siggup';
import Home from './Home/Home';
import 'antd/dist/reset.css';
import BodySearch from './Home/BodySearch';
import './Settings/Translate/i18next';
import PrivateRouter from './Settings/PrivateRouter';
import CheckUser from './Settings/CheckUser';
import { lazy,Suspense } from 'react';
const CardBody = React.lazy(()=> import("./Home/CardBody") )
function App() {
  return (
   <BrowserRouter>
        <Routes>
           <Route element={<PrivateRouter></PrivateRouter>}>
                <Route element={<Home></Home>} path='/home'>
                    <Route index element ={
                    <Suspense fallback={<p>Loading .....</p>}>
                       <CardBody></CardBody>
                    </Suspense>}>

                    </Route>
                    <Route path='/home/search' element={<BodySearch></BodySearch>}></Route>
                  </Route>
           </Route>
            <Route element={<CheckUser></CheckUser>}>
            <Route element={<Sigin></Sigin>} path='/' ></Route>
            </Route>
            <Route element={<Siggup></Siggup>} path='/Sigup' ></Route>
        </Routes>
       
   </BrowserRouter>
  );
}

export default App;
