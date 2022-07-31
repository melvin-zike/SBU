import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {AuthContextProvider} from "./context/authContext/AuthContext";
import { MovieContextProvider } from "./context/movieContext/MovieContext";
import { AdContextProvider } from "./context/adContext/AdContext";
import { UserContextProvider } from "./context/userContext/UserContext";
import { TransactionContextProvider } from './context/transactionContext/TransactionContext';
import App from './App';


ReactDOM.render(
  <React.StrictMode>
 
    <TransactionContextProvider>
    <UserContextProvider>
    <AuthContextProvider>
    <AdContextProvider>
     <MovieContextProvider>
       
    <App />
    
     </MovieContextProvider>
     </AdContextProvider>
    </AuthContextProvider>
    </UserContextProvider>
    </TransactionContextProvider>
  
  </React.StrictMode>,
  document.getElementById('root')
);

