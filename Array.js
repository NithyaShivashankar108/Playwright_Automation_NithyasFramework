const prices = [7, 1, 5, 3, 6, 4];

function maxProfit(prices) {
    let minPrice = Infinity;
    let maxProfit = 0;

    for (const price of prices) {
        minPrice = Math.min(minPrice, price);
        maxProfit = Math.max(maxProfit, price - minPrice);
        }   

    return maxProfit;
}

console.log(maxProfit(prices))