import { connect } from 'react-redux';
import AvailableTradesView from './AvailableTradesView';

const mapStateToProps = (store) => ({
    trades: store.availableTrades.buys
});

const AvailableBuysControl = connect(
    mapStateToProps
)(AvailableTradesView);

export default AvailableBuysControl;