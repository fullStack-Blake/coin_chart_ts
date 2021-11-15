import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import styled from "styled-components";

const Container = styled.div``;
const Title = styled.div`
  margin-top: 2em;
  font-size: 30px;
  text-align: center;
`;

interface RouteParams {
  coinID: string;
}
interface RouteState {
  name: string;
}
const Coin = () => {
  const [loading, setLoading] = useState(true);
  const { coinID } = useParams<RouteParams>();
  const [info, setInfo] = useState({});
  const [price, setPrice] = useState({});
  const {
    state: { name },
  } = useLocation<RouteState>();

  useEffect(() => {
    (async () => {
      const response = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinID}`)
      ).json();
      setInfo(response);
    })();
    (async () => {
      const response = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinID}`)
      ).json();
      setPrice(response);
      console.log(response);
    })();
  }, []);

  return (
    <Container>
      <Title>{name}</Title>
    </Container>
  );
};

export default Coin;
