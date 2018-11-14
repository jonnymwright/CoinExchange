export const receiveMyBuysId = "RECEIVE_MY_BUYS";
export const receiveMySellsId = "RECEIVE_MY_SELLS";

export const receiceMyBuys = buys => ({
    type: receiveMyBuysId,
    buys
});
export const receiceMySells = sells => ({
    type: receiveMySellsId,
    sells
});