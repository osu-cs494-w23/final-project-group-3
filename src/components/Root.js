import React, { useState } from "react";
import logo from "../logo.svg";
import {Outlet} from "react-router";
import styled from '@emotion/styled/macro'

import Header from "./Header";

const BodyContainer = styled.div`
  margin-top: 100px;
`

function Root(props) {

  const [ favoriteListings, setFavoriteListings ] = useState({})

  function addFavoriteListing(listingId, regionId, type, uipt, status) {
      let newFavoriteListings = {
          ...favoriteListings,
      }
      newFavoriteListings[listingId] = {region_id: regionId, type: type, uipt: uipt, status: status}
      setFavoriteListings(newFavoriteListings)
  }
  
  function removeFavoriteListing(listingId) {
      const newFavoriteListings = {
          ...favoriteListings
      }
      delete newFavoriteListings[listingId]
      setFavoriteListings(newFavoriteListings)
  }
  
  function getFavoriteListings() {
      return favoriteListings
  }

  return (
      <div className="App">
        <Header />
        <header className="App-header">
          <BodyContainer>
            <Outlet context={{ addFavoriteListing, removeFavoriteListing, getFavoriteListings }} />
            {/* {console.log("favoriteListings from Root:", favoriteListings)} */}
          </BodyContainer>
        </header>
      </div>
  );
}

export default Root;
