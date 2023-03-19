import React from "react";
import { NavLink } from "react-router-dom";
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
        color: Cornsilk;
        text-align: center;
        padding: 14px 20px;
        text-decoration: none;
        font-size: 25px;
    }
    a:hover{
        background-color: DeepSkyBlue;
        color: black;
    }
    a.active{
        background-color: blue;
        color: Cornsilk;
    }
`

function Navbar() {
    return (
        <NavbarContainer>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/search">Search Listings</NavLink>
            <NavLink to="/history">Market History</NavLink>
            <NavLink to="/favorites">Favorites</NavLink>
        </NavbarContainer>
    )
}

export default Navbar
