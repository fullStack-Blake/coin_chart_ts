import react from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Coin from '../Coin'
import Coins from '../Coins'


const Router = () => {
    return (
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Coins}/>
          <Route path="/:coinID" exact component={Coin}/>
        </Switch>
      </BrowserRouter>
    )
}

export default Router