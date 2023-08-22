import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Wallet from "./Pages/wallet";
import Home from "./Pages/Home";
import Members from "./Pages/Members";
import './App.css'

function App() {
  
const router = createBrowserRouter([
  {path:'/',element:<Wallet/>},
  {path:'/home',element:<Home/>},
  {path:'/members',element:<Members/>},
])
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App;
