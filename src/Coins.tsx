import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom';

const Container = styled.div``
const Header = styled.header``;
const CoinsList = styled.ul``;
const Coin = styled.li``;
const Title = styled.h1`
    font-size: 48px;

`

const coins = [
    {
      id: "btc-bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      rank: 1,
      is_new: false,
      is_active: true,
      type: "coin",
    },
    {
      id: "eth-ethereum",
      name: "Ethereum",
      symbol: "ETH",
      rank: 2,
      is_new: false,
      is_active: true,
      type: "coin",
    },
    {
      id: "hex-hex",
      name: "HEX",
      symbol: "HEX",
      rank: 3,
      is_new: false,
      is_active: true,
      type: "token",
    },
  ];

const Coins = () => {
    return (
        <Container>
            <Header>
                <Title>Coins Page</Title>
            </Header>
            <CoinsList>
                {coins.map(coin => 
                <Coin key={coin.id}>
                    <Link to={`/${coin.id}`} >
                       {coin.name}
                    </Link>
                </Coin>
                )}
            </CoinsList>
        </Container>
    )
}

export default Coins;