import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div``;
const Header = styled.header``;
const CoinsList = styled.ul`
  padding: 10px;
`;
const Coin = styled.li`
  padding: 10px 0;
  background-color: grey;
  border-radius: ${(props) => props.theme.borderRadius};
  margin-bottom: 5px;
  text-align: center;
  color: ${(props) => props.theme.colors.secondary};
  a {
    transition: color 0.3s ease-in-out;
    display: block;
  }
  :hover {
    color: ${(props) => props.theme.colors.accentColor};
  }
`;
const Title = styled.h1`
  font-size: 48px;
`;

interface CoinsInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Coins = () => {
  const [coins, setCoins] = useState<CoinsInterface[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
  }, []);
  return (
    <Container>
      <Header>
        <Title>Coins Page</Title>
      </Header>
      {loading ? null : (
        <CoinsList>
          {coins.map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`}>{coin.name}</Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
};

export default Coins;
