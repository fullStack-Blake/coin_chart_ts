import React from "react";
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
  const { coinID } = useParams<RouteParams>();
  const {
    state: { name },
  } = useLocation<RouteState>();

  return (
    <Container>
      <Title>{name}</Title>
    </Container>
  );
};

export default Coin;
