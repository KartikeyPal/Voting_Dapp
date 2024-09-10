import React from "react";
// import "./App.css";
import Web3StateProvider from "./context/Web3StateProvider";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/Routes";
import Vote from './pages/vote/Vote';
function App() {
  // step 7
  return (  
    <>
        <Web3StateProvider>
          <RouterProvider router = {routes}/>
        </Web3StateProvider>
    </>
  );
}

export default App;

//tested but need improvement