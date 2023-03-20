import React, { useState } from "react";
import {Outlet} from "react-router";

import Header from "./Header";
import styled from "@emotion/styled/macro";

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
  
  const RootContainer = styled.div`
      display: flex;
      flex-direction: column;
      height: 100vh;
      min-width: 100vw;
      `;

  const HeaderContainer = styled.div`
      display: flex;
      min-height: auto;
      width: 100%;
      `;

  const Container = styled.div`
      display: block;
      flex-direction: column;
      overflow-y: scroll;
      min-height: auto;
      `;

  return (
      <RootContainer>
        <HeaderContainer>
          <Header />
        </HeaderContainer>
        <Container>
          <Outlet context={{ addFavoriteListing, removeFavoriteListing, getFavoriteListings }} />
        </Container>
      </RootContainer>
  );
}

export default Root;
