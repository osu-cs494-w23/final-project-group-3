/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled/macro'
import { Link, useOutletContext } from "react-router-dom";
import {css} from "@emotion/react";

const breakpoints = {
    sm: 768,
    med: 1024
}

const ListingContainer = styled.span`
    border: 1px solid dimgray;
    border-radius: 5px;
    margin: 5px;
    padding: 5px;
    background-color: ghostwhite;
    min-width: 210px;
    max-width: 300px;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: center;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`

const FavoriteButton = styled.button`
    border: none;
    background: none;
    padding: 10px;
    padding-top: 15px;
    font-size: 20px;
`

const DataContainer = styled.div`
    font-size: 10px;
    @media (min-width: ${breakpoints.sm + 1}px) and (max-width: ${breakpoints.med}px) {
        font-size: 14px;
    }
    @media (max-width: ${breakpoints.sm}px) {
        font-size: 24px;
    }
`

const ArticleContainer = styled.article`
  background-color: white;
  display: block;
  margin-bottom: 5px;
  width: 15vw;
  height: 20vh;
  background-image: url("https://i.pinimg.com/originals/2e/dc/4b/2edc4b5f7279d8d9bfbae04a75e104a8.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  text-align: right;
`;

function ListingCard(props) {
    const id = props.id
    const regionId = props.regionId;
    const type = props.type;
    const homeData = props.homeData;
    const { getFavoriteListings, addFavoriteListing, removeFavoriteListing } = useOutletContext()
    const favorites = getFavoriteListings()

    let buttonImage = favorites[id] ? '❤️' : '🤍'

    function handleFavoriteChange() {
        if (!favorites[id]) {
            addFavoriteListing(id, regionId, type, '1,2,3,4,7,8', '9', homeData)
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

    const housingData = {

        mlsId: homeData?.mlsId,
        prefix: 'https://ssl.cdn-redfin.com/photo',
        dataSourceUrl: homeData?.dataSourceId?.value,
    
        price: homeData?.priceInfo?.amount?.value ? formatPrice(homeData.priceInfo.amount.value) : 'Price not listed',
        beds: homeData?.beds?.value ? homeData.beds.value : 0,
        baths: homeData?.baths?.value ? homeData.baths.value : 0,
        sqft: homeData?.sqftInfo?.amount?.value ? homeData.sqftInfo.amount.value : 0,
        propertyType: homeData?.propertyType ? formatPropertyType(homeData.propertyType) : 'Unknown home type',
        address: homeData?.addressInfo?.formattedStreetLine ? homeData.addressInfo.formattedStreetLine : 'Unknown address',
        city: homeData?.addressInfo?.city ? homeData.addressInfo.city : 'Unknown city',
        state: homeData?.addressInfo?.state ? homeData.addressInfo.state : 'Unknown state',
        broker: homeData?.brokers?.listingBrokerAndAgent?.agentName ? homeData.brokers.listingBrokerAndAgent.agentName : 'No agent',
        agent: homeData?.brokers?.listingBrokerAndAgent?.brokerName ? homeData.brokers.listingBrokerAndAgent.brokerName : 'No broker',

        status: homeData?.listingMetadata?.searchStatus ? 'Active' : 'Not Active',
        year: homeData?.yearBuilt?.yearBuilt?.value ? homeData.yearBuilt.yearBuilt.value : 'Year built not available',
        lotSize: homeData?.lotSize?.amount?.value ? homeData.lotSize.amount.value : 'n/a',
        fullBath: homeData?.fullBaths?.value ? homeData.fullBaths.value : "none",
        halfBath: homeData?.partialBaths?.value ? homeData.partialBaths.value : "none",
        
        daysOnMarket: homeData?.daysOnMarket?.daysOnMarket?.value ? homeData.daysOnMarket.daysOnMarket.value : 'not available',
        daysOnApp: homeData?.daysOnMarket?.timeOnRedfin?.seconds ? Math.round(homeData.daysOnMarket.timeOnRedfin.seconds/86400) : 'not available',
        tour: homeData?.listingMetadata?.hasVirtualTour ? homeData.photosInfo.scanUrl : 'not available'

    }

    return (
        <ListingContainer >
          <ArticleContainer css={articleStyle}>
            <FavoriteButton onClick={handleFavoriteChange}>{buttonImage}</FavoriteButton>
          </ArticleContainer>
          <Link to="/individualListing" state = {housingData} >
            <DataContainer>
                <h2>{housingData.price}</h2>
                <p>{housingData.beds} bds | {housingData.baths} ba | {housingData.sqft} sqft | {housingData.propertyType}</p>
                <p>{housingData.address}, {housingData.city}, {housingData.state}</p>
                <p>{housingData.agent + " | " + housingData.broker}</p>
            </DataContainer>
          </Link>
        </ListingContainer>
    )
}

export default ListingCard
