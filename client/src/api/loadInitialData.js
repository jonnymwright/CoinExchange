export async function loadRecentTrades() {
  var result = await fetch("http://localhost:3000/historical")
    .then(res => res.json())
    .then(res => res.map(trade => ({
        price: trade.price,
        quantity: trade.quantity,
        time: new Date(trade.time)
      }))
    );
    console.log(result)
    return result;
}
