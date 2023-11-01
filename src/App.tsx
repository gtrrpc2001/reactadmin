import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from './store/store';
import LoginPage from './page/login/login';
import Home from './page/home/home';
import { Graph } from './page/graph/graph';



const App: React.FC = () => {       
  return (    
      <BrowserRouter>
        <Provider store={store}>
            <Routes>               
              <Route path='/' element={<LoginPage/>}/>,
              <Route path='/home' element={<Home/>}/>, 
              <Route path='/home/graph' element={<Graph />}/>             
            </Routes>
       </Provider>          
      </BrowserRouter> 
  );
}

export default App;
