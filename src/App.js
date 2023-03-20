// import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from "./components/Root";
import RedfinTest from "./components/RedfinTest";
import History from './components/History';
import SearchListingsPage from "./components/SearchListingsPage";
import {css, Global} from "@emotion/react";
import Favorites from "./components/Favorites";

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
        },
        {
          path: "/search",
          element: <SearchListingsPage />
        },
        {
          path: "/favorites",
          element: <Favorites />
        }
      ]
    }
  ]);

  return (
      <div>
        <Global
            styles={css`
            body {
              margin: 0;
              padding: 0;
              min-height: 100vh;
              max-width: 100vw;
            }
          `}
        />
        <Global
            styles={{
              'body.noScroll': {
                overflow: 'hidden',
              },
            }}
        />
    <RouterProvider router={router}/>
        </div>
  )
}

export default App;
