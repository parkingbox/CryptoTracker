import React from 'react'

interface ICoins {
  data: {
    [key: string]: {
      opening_price: string;
      closing_price: string;
      min_price: string;
      max_price: string;
      units_traded: string;
      acc_trade_value: string;
      prev_closing_price: string;
      units_traded_24H: string;
      acc_trade_value_24H: string;
      fluctate_24H: string;
      fluctate_rate_24H: string;
    };
  };
}


const CoinInfo = () => {
  return (
    <div>CoinInfo</div>
  )
}

export default CoinInfo;