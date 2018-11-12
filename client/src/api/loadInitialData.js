export async function loadRecentTrades() {
  var result = await fetch("http://localhost:3000/historical")
    .then(res => res.json())
    .then(res => res.map(trade => ({
        price: trade.price,
        quantity: trade.quantity,
        time: new Date(trade.time)
      }))
    );
    return result;
}

export async function loadAggregatedBuys() {
  var result = await fetch("http://localhost:3000/aggregated/buys")
    .then(res => res.json());
    return result;
}

export async function loadAggregatedSells() {
  var result = await fetch("http://localhost:3000/aggregated/sells")
    .then(res => res.json());
    return result;
}

export async function loadUsers() {
  const result = await fetch("http://localhost:3000/users")
  .then(res => res.json());
  return result;
}