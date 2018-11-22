import { connect } from "react-redux";
import AvailableTradesView from "../AvailableTradesView";
import { receiveAvailableSells } from "../../../reducers/availbleTrades/availbleTradesActionCreators";

const mapStateToProps = (store) => ({
    trades: store.availableTrades.sells,
    type: "Sells"
});
const mapDispatchToProps = { receiveAvailableSells };

const AvailableSellsControl = connect(
    mapStateToProps,
    mapDispatchToProps
)(AvailableTradesView);

export default AvailableSellsControl;