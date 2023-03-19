import React from "react";
import styled from '@emotion/styled/macro'

import Navbar from "./Navbar";

const HeaderContainer = styled.div`
    position: fixed;
    top: 0;
    display: flex;
    flex-flow: column;
    width: 100%;
    overflow: hidden;
    z-index: 1;
`

function Header() {
    return (
        <HeaderContainer>
            <Navbar />
        </HeaderContainer>
    )
}

export default Header
