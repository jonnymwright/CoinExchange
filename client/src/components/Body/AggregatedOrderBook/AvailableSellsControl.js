import { connect } from 'react-redux';
import AvailableTradesView from './AvailableTradesView';

const mapStateToProps = (store) => ({
    trades: store.availableTrades.sells
});

const AvailableSellsControl = connect(
    mapStateToProps
)(AvailableTradesView);

export default AvailableSellsControl;