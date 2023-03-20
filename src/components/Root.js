/** @jsxImportSource @emotion/react */

import React, { useState } from "react";
import {Outlet} from "react-router";

import Header from "./Header";
import {css} from "@emotion/react";

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

  const rootContainerStyle = css`
    display: flex;
    flex-direction: column;
    height: 100vh;
    min-width: 100vw;
  `;

  const headerContainerStyle = css`
    display: flex;
    min-height: auto;
    width: 100%;
  `;

  const containerStyle = css`
    display: block;
    flex-direction: column;
    overflow-y: scroll;
    min-height: auto;
  `;

  return (
      <div css={rootContainerStyle}>
        <div css={headerContainerStyle}>
          <Header />
        </div>
        <div css={containerStyle}>
          <Outlet context={{ addFavoriteListing, removeFavoriteListing, getFavoriteListings }} />
        </div>
      </div>
  );
}

export default Root;
