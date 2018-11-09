import { connect } from 'react-redux';
import AvailableTradesView from '../AvailableTradesView';

const mapStateToProps = (store) => ({
    trades: store.myTrades.sells,
    type: 'Sells'
});

const MySellsController = connect (
    mapStateToProps
) (AvailableTradesView);

export default MySellsController;