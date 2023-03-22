/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled/macro'
import { useOutletContext } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import {css} from "@emotion/react";

const IndListingContainer = styled.div`
    top: 56px;
`
const PictureContainer = styled.div`
    top: 56px
    max-width: 405px;
    column-rule-style: solid;
    column-gap: 30px;
    column-rule-width: 5px;
`

const FavoriteButton = styled.button`
    border: none;
    background: none;
    padding: 5px;
`

const PictureContainer1 = styled.article`
  background-color: white;
  border: 1px solid dimgray;
  display: block;
  margin-bottom: 5px;
  top: 56px;
  width: 900px;
  height: 350px;
  background-image: url("https://i.pinimg.com/originals/2e/dc/4b/2edc4b5f7279d8d9bfbae04a75e104a8.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const PictureContainer2 = styled.article`
  background-color: white;
  border: 1px solid dimgray;
  display: block;
  float: left;
  
  margin: 5px;
  margin-left: 0px;
  top: 415px;
  width: 445px;
  height: 200px;
  background-image: url("https://i.pinimg.com/originals/2e/dc/4b/2edc4b5f7279d8d9bfbae04a75e104a8.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const PictureContainer3 = styled.article`
  background-color: white;
  border: 1px solid dimgray;
  display: block;
  float: left;
  margin: 5px;
  top: 415px;
  width: 443px;
  height: 200px;
  left: 445px;
  background-image: url("https://i.pinimg.com/originals/2e/dc/4b/2edc4b5f7279d8d9bfbae04a75e104a8.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
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
    const data = location.state;
    console.log(data);

    const id = data.id
    const regionId = data.regionId;
    const type = data.type;
    const homeData = data.homeData;
    const { getFavoriteListings, addFavoriteListing, removeFavoriteListing } = useOutletContext()
    const favorites = getFavoriteListings();

    let buttonImage = favorites[id] ? '❤️' : '🤍'

    function handleFavoriteChange() {
        if (!favorites[id]) {
            addFavoriteListing(id, regionId, type, '1,2,3,4,7,8', '9', homeData)
        }
        else {
            removeFavoriteListing(id)
        }
    }

    const mlsIdSuffix = data.mlsId?.slice(-3);
    const imageUrl1 = `${data.prefix}/${data.dataSourceUrl}/bigphoto/${mlsIdSuffix}/${data.mlsId}_0.webp`;
    const imageUrl2 = `${data.prefix}/${data.dataSourceUrl}/mbpaddedwide/${mlsIdSuffix}/genMid.${data.mlsId}_1_0.webp`;
    const imageUrl3 = `${data.prefix}/${data.dataSourceUrl}/mbpaddedwide/${mlsIdSuffix}/genMid.${data.mlsId}_2_0.webp`;
    const imageUrl4 = `${data.prefix}/${data.dataSourceUrl}/mbpaddedwide/${mlsIdSuffix}/genMid.${data.mlsId}_3_0.webp`;
    const imageUrl5 = `${data.prefix}/${data.dataSourceUrl}/mbpaddedwide/${mlsIdSuffix}/genMid.${data.mlsId}_4_0.webp`;
    const imageUrl6 = `${data.prefix}/${data.dataSourceUrl}/mbpaddedwide/${mlsIdSuffix}/genMid.${data.mlsId}_5_0.webp`;
    const imageUrl7 = `${data.prefix}/${data.dataSourceUrl}/mbpaddedwide/${mlsIdSuffix}/genMid.${data.mlsId}_6_0.webp`;
    const imageUrl8 = `${data.prefix}/${data.dataSourceUrl}/mbpaddedwide/${mlsIdSuffix}/genMid.${data.mlsId}_7_0.webp`;
    const imageUrl9 = `${data.prefix}/${data.dataSourceUrl}/mbpaddedwide/${mlsIdSuffix}/genMid.${data.mlsId}_8_0.webp`;
    const imageUrl10 = `${data.prefix}/${data.dataSourceUrl}/mbpaddedwide/${mlsIdSuffix}/genMid.${data.mlsId}_9_0.webp`;
    const imageUrl11 = `${data.prefix}/${data.dataSourceUrl}/mbpaddedwide/${mlsIdSuffix}/genMid.${data.mlsId}_10_0.webp`;
    const imageUrl12 = `${data.prefix}/${data.dataSourceUrl}/mbpaddedwide/${mlsIdSuffix}/genMid.${data.mlsId}_11_0.webp`;
    const imageUrl13 = `${data.prefix}/${data.dataSourceUrl}/mbpaddedwide/${mlsIdSuffix}/genMid.${data.mlsId}_12_0.webp`;
    const imageUrl14 = `${data.prefix}/${data.dataSourceUrl}/mbpaddedwide/${mlsIdSuffix}/genMid.${data.mlsId}_13_0.webp`;
    const imageUrl15 = `${data.prefix}/${data.dataSourceUrl}/mbpaddedwide/${mlsIdSuffix}/genMid.${data.mlsId}_14_0.webp`;
    const imageUrl16 = `${data.prefix}/${data.dataSourceUrl}/mbpaddedwide/${mlsIdSuffix}/genMid.${data.mlsId}_15_0.webp`;
    const imageUrl17 = `${data.prefix}/${data.dataSourceUrl}/mbpaddedwide/${mlsIdSuffix}/genMid.${data.mlsId}_16_0.webp`;
    const imageUrl18 = `${data.prefix}/${data.dataSourceUrl}/mbpaddedwide/${mlsIdSuffix}/genMid.${data.mlsId}_17_0.webp`;
    const imageUrl19 = `${data.prefix}/${data.dataSourceUrl}/mbpaddedwide/${mlsIdSuffix}/genMid.${data.mlsId}_18_0.webp`;
    const imageUrl20 = `${data.prefix}/${data.dataSourceUrl}/mbpaddedwide/${mlsIdSuffix}/genMid.${data.mlsId}_19_0.webp`;
    const imageUrl21 = `${data.prefix}/${data.dataSourceUrl}/mbpaddedwide/${mlsIdSuffix}/genMid.${data.mlsId}_20_0.webp`;
    const imageUrl22 = `${data.prefix}/${data.dataSourceUrl}/mbpaddedwide/${mlsIdSuffix}/genMid.${data.mlsId}_21_0.webp`;
    const imageUrl23 = `${data.prefix}/${data.dataSourceUrl}/mbpaddedwide/${mlsIdSuffix}/genMid.${data.mlsId}_22_0.webp`;

    const articleStyle1 = data.mlsId && data.dataSourceUrl ?  css` background-image: url(${imageUrl1})` : `picture not available`;
    const articleStyle2 = data.mlsId && data.dataSourceUrl ?  css` background-image: url(${imageUrl2})` : `picture not available`;
    const articleStyle3 = data.mlsId && data.dataSourceUrl ?  css` background-image: url(${imageUrl3})` : `picture not available`;
    const articleStyle4 = data.mlsId && data.dataSourceUrl ?  css` background-image: url(${imageUrl4})` : `picture not available`;
    const articleStyle5 = data.mlsId && data.dataSourceUrl ?  css` background-image: url(${imageUrl5})` : `picture not available`;
    const articleStyle6 = data.mlsId && data.dataSourceUrl ?  css` background-image: url(${imageUrl6})` : `picture not available`;
    const articleStyle7 = data.mlsId && data.dataSourceUrl ?  css` background-image: url(${imageUrl7})` : `picture not available`;
    const articleStyle8 = data.mlsId && data.dataSourceUrl ?  css` background-image: url(${imageUrl8})` : `picture not available`;
    const articleStyle9 = data.mlsId && data.dataSourceUrl ?  css` background-image: url(${imageUrl9})` : `picture not available`;
    const articleStyle10 = data.mlsId && data.dataSourceUrl ?  css` background-image: url(${imageUrl10})` : `picture not available`;
    const articleStyle11 = data.mlsId && data.dataSourceUrl ?  css` background-image: url(${imageUrl11})` : `picture not available`;
    const articleStyle12 = data.mlsId && data.dataSourceUrl ?  css` background-image: url(${imageUrl12})` : `picture not available`;
    const articleStyle13 = data.mlsId && data.dataSourceUrl ?  css` background-image: url(${imageUrl13})` : `picture not available`;
    const articleStyle14 = data.mlsId && data.dataSourceUrl ?  css` background-image: url(${imageUrl14})` : `picture not available`;
    const articleStyle15 = data.mlsId && data.dataSourceUrl ?  css` background-image: url(${imageUrl15})` : `picture not available`;
    const articleStyle16 = data.mlsId && data.dataSourceUrl ?  css` background-image: url(${imageUrl16})` : `picture not available`;
    const articleStyle17 = data.mlsId && data.dataSourceUrl ?  css` background-image: url(${imageUrl17})` : `picture not available`;
    const articleStyle18 = data.mlsId && data.dataSourceUrl ?  css` background-image: url(${imageUrl18})` : `picture not available`;
    const articleStyle19 = data.mlsId && data.dataSourceUrl ?  css` background-image: url(${imageUrl19})` : `picture not available`;
    const articleStyle20 = data.mlsId && data.dataSourceUrl ?  css` background-image: url(${imageUrl20})` : `picture not available`;
    const articleStyle21 = data.mlsId && data.dataSourceUrl ?  css` background-image: url(${imageUrl21})` : `picture not available`;
    const articleStyle22 = data.mlsId && data.dataSourceUrl ?  css` background-image: url(${imageUrl22})` : `picture not available`;
    const articleStyle23 = data.mlsId && data.dataSourceUrl ?  css` background-image: url(${imageUrl23})` : `picture not available`;

    return(

        <IndListingContainer>
            <PictureContainer>
            
                <PictureContainer1 css={articleStyle1} />
                <PictureContainer2 css={articleStyle2} />
                <PictureContainer3 css={articleStyle3} />
                <PictureContainer2 css={articleStyle4} />                
                <PictureContainer3 css={articleStyle5} />
                <PictureContainer2 css={articleStyle6} />
                <PictureContainer3 css={articleStyle7} />
                <PictureContainer2 css={articleStyle8} />
                <PictureContainer3 css={articleStyle9} />
                <PictureContainer2 css={articleStyle10} />
                <PictureContainer3 css={articleStyle11} />
                <PictureContainer2 css={articleStyle12} />
                <PictureContainer3 css={articleStyle13} />
                <PictureContainer2 css={articleStyle14} />
                <PictureContainer3 css={articleStyle15} />
                <PictureContainer2 css={articleStyle16} />
                <PictureContainer3 css={articleStyle17} />
                <PictureContainer2 css={articleStyle18} />
                <PictureContainer3 css={articleStyle19} />
                <PictureContainer2 css={articleStyle20} />
                <PictureContainer3 css={articleStyle21} />
                <PictureContainer2 css={articleStyle22} />
                <PictureContainer3 css={articleStyle23} />

            </PictureContainer>
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

