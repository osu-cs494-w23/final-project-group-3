import React from "react";
import styled from '@emotion/styled/macro'

const NavbarContainer = styled.div`
    display: flex;
    overflow: hidden;
    background-color: dodgerblue;
    z-index: 1;
    top: 0;
    padding: 0;
    padding-bottom: 0px;
    justify-content: space-evenly;
    a{
        color: black;
        text-align: center;
        padding: 14px 20px;
        text-decoration: none;
        font-size: 25px;
    }
    a:hover{
        background-color: DeepSkyBlue;
        color: Cornsilk;
    }
    a.active{
        background-color: black;
        color: #ddb122;
    }
`

function Navbar() {
    return (
        <NavbarContainer>
            <a href="/">Home</a>
            <a>Search Listings</a>
            <a href="/history">Market History</a>
            <a>Favorites</a>
        </NavbarContainer>
    )
}

export default Navbar
