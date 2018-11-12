export const receiveRecentAvailableSellsId = 'RECEIVE_AVAILBLE_SELLS';
export const receiveRecentAvailableBuysId = 'RECEIVE_AVAILBLE_BUYS';

export const receiveAvailableBuys = buys => ({
    type : receiveRecentAvailableBuysId,
    buys
});

export const receiveAvailableSells = sells => ({
    type: receiveRecentAvailableSellsId,
    sells
});