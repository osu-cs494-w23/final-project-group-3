import React from "react";
import logo from "../logo.svg";
import {Outlet} from "react-router";
import styled from '@emotion/styled/macro'

import Header from "./Header";

const BodyContainer = styled.div`
  margin-top: 100px;
`

function Root(props) {

  return (
      <div className="App">
        <Header />
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <p>
            {/* Edit <code>src/App.js</code> and save to reload. */}
          </p>
          <BodyContainer>
            <Outlet />
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
              Learn React
            </a>
          </BodyContainer>
        </header>
      </div>
  );
}

export default Root;
