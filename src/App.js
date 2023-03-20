import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from "./components/Root";
import RedfinTest from "./components/RedfinTest";
import History from './components/History';
import Home from './components/Home';

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
      },
	  {
        path: "/",
        element: <Home></Home>
      }
    ]
  }
]);

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
