import React, { useEffect, useState } from "react";
import {
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router";
import styled from "styled-components";

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

interface IInfoData {
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
interface IPriceData {
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
  background-color: black;
  border-radius: 15px;
  color: ${(props) => props.theme.colors.secondary};
  padding: 10px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-around;
`;
const Description = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Item = styled.div`
  line-height: 1.3;
  text-align: center;
`;
const SwitchContainer = styled.div``;
const Coin = () => {
  const [loading, setLoading] = useState(true);
  const { coinID } = useParams<RouteParams>();
  const [info, setInfo] = useState<IInfoData>();
  const [price, setPrice] = useState<IPriceData>();
  const { state } = useLocation<RouteState>();
  const MatchChart = useRouteMatch();
  const MatchPrice = useRouteMatch();

  useEffect(() => {
    (async () => {
      const info = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinID}`)
      ).json();
      const price = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinID}`)
      ).json();
      setPrice(price);
      setInfo(info);
      setLoading(false);
      console.log(price, info);
    })();
  }, []);

  return (
    <Container>
      <Title>
        {state?.name ? state.name : loading ? "Loading..." : info?.name}
      </Title>
      {loading ? null : (
        <>
          <CoinDetail>
            <Description>
              <Item>
                Symbol <br />
                {info?.symbol}
              </Item>
              <Item>
                Rank <br /> #{info?.rank}
              </Item>
            </Description>
            <Description>
              <Item>
                Total Supply <br />
                {price?.total_supply}
              </Item>
              <Item>
                Circulating Supply <br /> {price?.circulating_supply}
              </Item>
            </Description>
            <SwitchContainer></SwitchContainer>

            <Description>{info?.description}</Description>
          </CoinDetail>
          <Switch>
            <Route path={`/:coinID/price`}>
              <Price />
            </Route>
            <Route path={`/:coinID/chart`}>
              <Chart />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
};

export default Coin;
