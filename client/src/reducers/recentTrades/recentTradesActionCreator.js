export const receiveRecentTradesId = 'RECEIVE_RECENT_TRADES';

export const receiveRecentTrades = trades => ({
    type : receiveRecentTradesId,
    trades
});

