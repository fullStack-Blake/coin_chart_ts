import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinPrice } from "../API";
import Chart from "./Chart";
import Price from "./Price";

const Container = styled.div`
  padding: 30px 20px;
`;
const Title = styled.div`
  font-size: 30px;
  text-align: center;
  margin-bottom: 20px;
`;

interface RouteParams {
  coinID: string;
}
interface RouteState {
  name: string;
}

interface IInfo {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  contract: string;
  platform: string;
  contracts: object;
  parent: object;
  tags: object;
  team: object;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links: object;
  links_extended: object;
  whitepaper: object;
  first_data_at: string;
  last_data_at: string;
}
interface IPrice {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: string;
      percent_from_price_ath: number;
    };
  };
}
const CoinDetail = styled.div`
  min-height: 50vh;
  max-height: 80vh;
  border-radius: 15px;
  color: white;
  padding: 10px;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.black};
`;
const Line = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  margin-bottom: 20px;
`;
const Description = styled.div`
  display: flex;
  flex-direction: column;
  :nth-child(2n) {
    text-align: right;
  }
`;
const ItemCategory = styled.div`
  color: ${(props) => props.theme.colors.grey};
`;
const Item = styled.div`
  line-height: 1.3;
`;
const SwitchButton = styled.button<{ isActive: boolean }>`
  all: unset;
  background-color: ${(props) =>
    props.isActive ? props.theme.colors.green : props.theme.colors.grey};
  width: 35vw;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  text-transform: uppercase;
`;
const SwitchContainer = styled.div`
  margin: 20px;
  display: flex;
  justify-content: space-around;
`;
const Coin = () => {
  const { coinID } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const MatchChart = useRouteMatch(`/${coinID}/chart`);
  const MatchPrice = useRouteMatch(`/${coinID}/price`);
  const info = useQuery<IInfo>("coin-info", () => fetchCoinInfo(coinID));
  const price = useQuery<IPrice>("coin-price", () => fetchCoinPrice(coinID));

  // const [loading, setLoading] = useState(true);
  // const [info, setInfo] = useState<IInfo>();
  // const [price, setPrice] = useState<IPrice>();
  // useEffect(() => {
  //   (async () => {
  //     const info = await (
  //       await fetch(`https://api.coinpaprika.com/v1/coins/${coinID}`)
  //     ).json();
  //     const price = await (
  //       await fetch(`https://api.coinpaprika.com/v1/tickers/${coinID}`)
  //     ).json();
  //     setPrice(price);
  //     setInfo(info);
  //     setLoading(false);
  //     console.log(price, info);
  //   })();
  // }, []);

  return (
    <Container>
      <Title>
        {state?.name
          ? state.name
          : info.isLoading
          ? "Loading..."
          : info.data?.name}
      </Title>
      {info.isLoading ? null : (
        <>
          <CoinDetail>
            <Line>
              <Description>
                <ItemCategory>Symbol</ItemCategory>
                <Item>{info.data?.symbol}</Item>
              </Description>
              <Description>
                <ItemCategory>Rank</ItemCategory>
                <Item># {info.data?.rank}</Item>
              </Description>
            </Line>
            <Line>
              <Description>
                <ItemCategory>Total Supply</ItemCategory>
                <Item>{price.data?.total_supply}</Item>
              </Description>
              <Description>
                <ItemCategory>Circulating Supply</ItemCategory>
                <Item>{price.data?.circulating_supply}</Item>
              </Description>
            </Line>
            <Description>{info.data?.description}</Description>
            <SwitchContainer>
              <SwitchButton isActive={MatchPrice !== null}>
                <Link to={`/${coinID}/price`}>Price</Link>
              </SwitchButton>
              <SwitchButton isActive={MatchChart !== null}>
                <Link to={`/${coinID}/chart`}>Chart</Link>
              </SwitchButton>
            </SwitchContainer>
            <Switch>
              <Route path={`/:coinID/price`}>
                <Price />
              </Route>
              <Route path={`/:coinID/chart`}>
                <Chart />
              </Route>
            </Switch>
          </CoinDetail>
        </>
      )}
    </Container>
  );
};

export default Coin;
