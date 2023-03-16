/** @jsxImportSource @emotion/react */

import React from "react";
import { css } from '@emotion/react'
import styled from '@emotion/styled/macro'

const ListingContainer = styled.div`
    border: 1px solid dimgray;
    margin: 3px;
    padding: 5px;
    background-color: ghostwhite;
`

const ImageContainer = styled.div`
    border: 1px solid dimgray;
    img{
        background-color: white;
        border: 1px solid dimgray;
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 5px;
        max-width: 100px;
    }
`

function ListingCard(props) {

    // const styles = css`
        // border: 1px solid dimgray;
        // margin: 3px;
        // padding: 5px;
        // background-color: ghostwhite;
        // img{
        //     background-color: white;
        //     border: 1px solid dimgray;
        //     display: block;
        //     margin-left: auto;
        //     margin-right: auto;
        //     margin-bottom: 5px;
        //     max-width: 85px;
        // }
    //     p{
    //         font-size: 11px;
    //     }
    // `

    return (
        <ListingContainer >
            <ImageContainer>
                <img src="https://i.pinimg.com/originals/2e/dc/4b/2edc4b5f7279d8d9bfbae04a75e104a8.jpg" alt="example image for listing" />
            </ImageContainer>
            <p>Example desciption of listing</p>
        </ListingContainer>
    )

}

export default ListingCard
