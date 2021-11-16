import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoins } from "../API";

const Container = styled.div`
  padding: 30px 20px;
`;
const Header = styled.header``;
const CoinsList = styled.ul`
  padding: 10px;
`;
const Coin = styled.li`
  padding: 10px 20px;
  background-color: grey;
  border-radius: ${(props) => props.theme.borderRadius};
  margin-bottom: 5px;
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
  text-align: center;
  margin-bottom: 40px;
`;
const Loader = styled.div`
  font-size: 18px;
  text-align: center;
  animation-name: loading;
  animation-duration: 4s;
  animation-iteration-count: infinite;
  @keyframes loading {
    0% {
      color: inherit;
    }
    50% {
      color: pink;
    }
    100% {
      color: inherit;
    }
  }
`;
const CoinImage = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;
const CoinWrapper = styled.div`
  display: flex;
  align-items: center;
`;

interface ICoins {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Coins = () => {
  const coins = useQuery<ICoins[]>("coins", fetchCoins);

  // Before using react-query
  // const [coins, setCoins] = useState<ICoins[]>([]);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch("https://api.coinpaprika.com/v1/coins");
  //     const json = await response.json();
  //     setCoins(json.slice(0, 100));
  //     setLoading(false);
  //     console.log(json);
  //   })();
  // }, []);

  return (
    <Container>
      <Header>
        <Title>Coins Page</Title>
      </Header>
      {coins.isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {coins.data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{ pathname: `/${coin.id}`, state: { name: coin.name } }}
              >
                <CoinWrapper>
                  <CoinImage
                    src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  />
                  {coin.name}
                </CoinWrapper>
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
};

export default Coins;
