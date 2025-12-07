export const clicksCoins = (click, coin) => {
  
  const clicksCategories = {
    "click-1": "1-5",
    "click-2": "5-15",
    "click-3": "15-55",
    "click-4": "55-90",
    "click-5": "90-125",
    "click-6": "125-180",
    "click-7": "180-235"
  }
  
  const coinsCategories = {
    "coin-1": "1-5",
    "coin-2": "5-20",
    "coin-3": "20-60",
    "coin-4": "60-95",
    "coin-5": "95-130",
    "coin-6": "130-185",
    "coin-7":"185-240"
  }

  let clicks = clicksCategories[click];
  let coins = coinsCategories[coin];
  clicks = clicks.split("-");
  coins = coins.split("-");

  const transformClicks = [Number(clicks[0]), Number(clicks[1])];
  const transformCoins = [Number(coins[0]), Number(coins[1])];

  const clicksReward = Math.floor(Math.random() * (transformClicks[1] - transformClicks[0] + 1)) + transformClicks[0];
  const coinsReward = Math.floor(Math.random() * (transformCoins[1] - transformCoins[0] + 1)) + transformCoins[0];

  return [clicksReward, coinsReward];
}