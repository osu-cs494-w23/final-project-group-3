/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled/macro'
import { useOutletContext } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import {css} from "@emotion/react";

const IndListingContainer = styled.div`
    top: 56px;
`

const FavoriteButton = styled.button`
    border: none;
    background: none;
    padding: 5px;
`

const PriPictureContainer = styled.article`
    font-size: 30px;
    padding: 5px;
    position:absolute;
    width: 890px;
    height: 350px;
    top: 56px;
    column-rule-style: solid;
    border: 1px solid black;
    background-image: url("https://i.pinimg.com/originals/2e/dc/4b/2edc4b5f7279d8d9bfbae04a75e104a8.jpg");
`;

const SecPictureContainer = styled.article`
    font-size: 30px;
    padding: 5px;
    position:absolute;
    width: 435px;
    height: 200px;
    top: 416px;
    column-rule-style: solid;
    border: 1px solid black;
    background-image: url("https://i.pinimg.com/originals/2e/dc/4b/2edc4b5f7279d8d9bfbae04a75e104a8.jpg");
`;

const TerPictureContainer = styled.article`
    font-size: 30px;
    padding: 5px;
    position:absolute;
    width: 445px;
    height: 200px;
    top: 416px;
    left: 445px;
    column-rule-style: solid;
    border: 1px solid black;
    background-image: url("https://i.pinimg.com/originals/2e/dc/4b/2edc4b5f7279d8d9bfbae04a75e104a8.jpg");
`;

const FavoriteButtonContainer = styled.div`
    position: absolute;
    top: 25px;
    left: 410px;
`

const MainListingInfo = styled.div`
    position: absolute;
    padding: 5px;
    padding-left: 15px;
    width: 445px;
    top: 56px;
    left: 900px;
    height: 150px;
    border: 1px solid black;
`

const ListingNavBar = styled.div`
    position: absolute;
    font-size: 20px;
    padding: 5px;
    padding-left: 15px;
    width: 445px;
    height: 30px;
    top: 218px;
    left: 900px;
    border: 1px solid black;
`

const ListingNavItem = styled.div`
    position: absolute;
    padding: 5px;
    padding-top: 0px;
    padding-left: 15px;
    width: 445px;
    height: 600px;
    top: 260px;
    left: 900px;
    border: 1px solid black;
    float: left;
`

function IndividualListing(props){

    const location = useLocation();
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

    const mlsId = homeData?.mlsId;
    const mlsIdSuffix = mlsId?.slice(-3);
    const prefix = 'https://ssl.cdn-redfin.com/photo';
    const dataSourceUrl = homeData?.dataSourceId?.value;
    const imageUrl = `${prefix}/${dataSourceUrl}/bigphoto/${mlsIdSuffix}/${mlsId}_0.webp`;

    const articleStyle = mlsId && dataSourceUrl ?  css`
        background-image: url(${imageUrl})` : css` 
        background-image: url("https://i.pinimg.com/originals/2e/dc/4b/2edc4b5f7279d8d9bfbae04a75e104a8.jpg")`;

    const data = location.state;
    console.log(data);

    return(

        <IndListingContainer>
            <PriPictureContainer css={articleStyle} />
            <SecPictureContainer css={articleStyle} />
            <TerPictureContainer css={articleStyle} />
            <MainListingInfo>
                <FavoriteButtonContainer>
                    <FavoriteButton onClick={handleFavoriteChange}>{buttonImage}</FavoriteButton>
                </FavoriteButtonContainer> 
                <h1>{data.price}</h1>
                <p>{data.beds} bds | {data.baths} ba | {data.sqft} sqft | {data.propertyType}</p>
                <p>{data.address}, {data.city}, {data.state}</p> 
            </MainListingInfo>
            <ListingNavBar> 

            </ListingNavBar>
            <ListingNavItem>

                <h2>  Property Details: </h2>
                <p>
                    <ul>Status: {data.status}</ul>
                    <ul>Property Type: {data.propertyType}</ul>
                    <ul>Year Built: {data.year}</ul>
                    <ul>Lot Size: {data.lotSize} Sq.Ft.</ul>
                    <ul>Full Baths: {data.fullBath}</ul>
                    <ul>Half Baths: {data.halfBath}</ul>
                </p> 
                <h2>  Listing Information: </h2>
                <p>
                    <ul>{data.broker} | {data.agent}</ul>
                    <ul>Days on Market: {data.daysOnMarket} days</ul>
                    <ul>Days on Website: {data.daysOnApp} days</ul>
                    <ul>Virtual Tour: {data.tour}</ul>
                    <ul></ul>
                </p> 

            </ListingNavItem>
        </IndListingContainer>
    )
}

export default IndividualListing
