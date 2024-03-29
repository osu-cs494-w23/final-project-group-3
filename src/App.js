import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from "./components/Root";
import RedfinTest from "./components/RedfinTest";
import History from './components/History';
import SearchListingsPage from "./components/SearchListingsPage";
import {css, Global} from "@emotion/react";
import Favorites from "./components/Favorites";
import Home from "./components/Home"
import IndividualListing from "./components/IndividualListing";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      children: [
    {
      path: "/",
      element: <Home></Home>
     },
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
            element: <SearchListingsPage />,
          },
          {
            path: "/favorites",
            element: <Favorites />
          },
          {
            path: "/individualListing",
            element: <IndividualListing />
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
              overflow-y: hidden;
              font-family: Arial, Helvetica, sans-serif;
              background-color: AliceBlue;
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
