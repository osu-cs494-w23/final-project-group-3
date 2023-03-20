import React, { useState } from "react";
import {Outlet} from "react-router";

import Header from "./Header";

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
      <div>
        <Header />
          <Outlet context={{ addFavoriteListing, removeFavoriteListing, getFavoriteListings }} />
      </div>
  );
}

export default Root;
