import React from 'react'
import { useParams } from 'react-router'
// import styled from 'styled-components'

// const Container = styled.div`

// `


interface RouteParams {
    coinID: string;
}
const Coin = () => {
    const {coinID} = useParams<RouteParams>();

    return (
        <h2>Coin: {coinID}</h2>
    )
}

export default Coin;