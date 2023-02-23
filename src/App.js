import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from "./components/Root";
import RedfinTest from "./components/RedfinTest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/redfin/test",
        element: <RedfinTest></RedfinTest>
      },
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App;
