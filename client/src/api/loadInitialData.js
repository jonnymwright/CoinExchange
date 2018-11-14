async function fetchFromServer(resource) {
  var result = await fetch("http://localhost:3000/" + resource).then(res =>
    res.json()
  );
  return result;
}

export async function loadRecentTrades() {
  const resultFromServer = await fetchFromServer("historical")
  return resultFromServer.map(trade => ({
    price: trade.price,
    quantity: trade.quantity,
    time: new Date(trade.time)
  }))
}

export async function loadAggregatedBuys() {
  return fetchFromServer("aggregated/buys");
}

export async function loadAggregatedSells() {
  return fetchFromServer("aggregated/sells");
}

export async function loadUsers() {
  return fetchFromServer("users");
}

export async function loadMyBuys(user) {
  return fetchFromServer("users/" + user + "/buys");
}

export async function loadMySells(user) {
  return fetchFromServer("users/" + user + "/sells");
}