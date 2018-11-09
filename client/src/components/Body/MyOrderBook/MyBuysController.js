import { connect } from 'react-redux';
import AvailableTradesView from '../AvailableTradesView';

const mapStateToProps = (store) => ({
    trades: store.myTrades.buys,
    type: 'Buys'
});

const MyBuysController = connect (
    mapStateToProps
) (AvailableTradesView);

export default MyBuysController;