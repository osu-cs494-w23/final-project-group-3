import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from "./components/Root";
import RedfinTest from "./components/RedfinTest";
import History from './components/History';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      children: [
        {
          path: "/redfin/test",
          element: <RedfinTest></RedfinTest>
        },
        {
          path: "/history",
          element: <History />
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={router}/>
  )
}

export default App;
