/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled/macro'
import { useOutletContext } from "react-router-dom";
import {css} from "@emotion/react";

const ListingContainer = styled.span`
    border: 1px solid dimgray;
    margin: 5px;
    padding: 5px;
    background-color: ghostwhite;
    min-width: 10vw;
`

const FavoriteButton = styled.button`
    border: none;
    background: none;
    padding: 5px;
`

const DataContainer = styled.div`
    font-size: 12px;
`

const ArticleContainer = styled.article`
  background-color: white;
  border: 1px solid dimgray;
  display: block;
  margin-bottom: 5px;
  width: 15vw;
  height: 20vh;
  background-image: url("https://i.pinimg.com/originals/2e/dc/4b/2edc4b5f7279d8d9bfbae04a75e104a8.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

function ListingCard(props) {
    const id = props.id
    const homeData = props.homeData;
    const { getFavoriteListings, addFavoriteListing, removeFavoriteListing } = useOutletContext()
    const favorites = getFavoriteListings()

    let buttonImage = favorites[id] ? '❤️' : '🤍'

    function handleFavoriteChange() {
        if (!favorites[id]) {
            addFavoriteListing(id, 'region_id', 'type', '1,2,3,4,7,8', '9')
        }
        else {
            removeFavoriteListing(id)
        }
    }

    function formatPrice(price) {
        return "$" + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function formatPropertyType(propertyType) {
        return propertyType.toLowerCase()
            .split('_')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
    }

    const mlsId = homeData?.mlsId;
    const mlsIdSuffix = mlsId?.slice(-3);
    const prefix = 'https://ssl.cdn-redfin.com/photo';
    const dataSourceUrl = homeData?.dataSourceId?.value;
    const imageUrl = `${prefix}/${dataSourceUrl}/bigphoto/${mlsIdSuffix}/${mlsId}_0.webp`;

    const articleStyle = mlsId && dataSourceUrl ?  css`
        background-image: url(${imageUrl})` : css` 
        background-image: url("https://i.pinimg.com/originals/2e/dc/4b/2edc4b5f7279d8d9bfbae04a75e104a8.jpg")`;

    const price = homeData?.priceInfo?.amount?.value ? formatPrice(homeData.priceInfo.amount.value) : 'Price not listed';
    const beds = homeData?.beds?.value ? homeData.beds.value : 0;
    const baths = homeData?.baths?.value ? homeData.baths.value : 0;
    const sqft = homeData?.sqftInfo?.amount?.value ? homeData.sqftInfo.amount.value : 0;
    const propertyType = homeData?.propertyType ? formatPropertyType(homeData.propertyType) : 'Unknown home type';
    const address = homeData?.addressInfo?.formattedStreetLine ? homeData.addressInfo.formattedStreetLine : 'Unknown address';
    const city = homeData?.addressInfo?.city ? homeData.addressInfo.city : 'Unknown city';
    const state = homeData?.addressInfo?.state ? homeData.addressInfo.state : 'Unknown state';
    const broker = homeData?.brokers?.listingBrokerAndAgent?.agentName ? homeData.brokers.listingBrokerAndAgent.agentName : 'No agent';
    const agent = homeData?.brokers?.listingBrokerAndAgent?.brokerName ? homeData.brokers.listingBrokerAndAgent.brokerName : 'No broker';

    return (
        <ListingContainer >
          <ArticleContainer css={articleStyle}>
            <FavoriteButton onClick={handleFavoriteChange}>{buttonImage}</FavoriteButton>
          </ArticleContainer>
          <DataContainer>
              <h2>{price}</h2>
              <p>{beds} bds | {baths} ba | {sqft} sqft | {propertyType}</p>
              <p>{address}, {city}, {state}</p>
              <p>{agent + " | " + broker}</p>
          </DataContainer>
        </ListingContainer>
    )
}

export default ListingCard
