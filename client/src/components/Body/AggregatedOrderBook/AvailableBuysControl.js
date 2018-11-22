import { connect } from "react-redux";
import AvailableTradesView from "../AvailableTradesView";
import { receiveAvailableBuys } from "../../../reducers/availbleTrades/availbleTradesActionCreators";

const mapStateToProps = store => ({
  trades: store.availableTrades.buys,
  type: "Buys"
});
const mapDispatchToProps = { receiveAvailableBuys };

const AvailableBuysControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(AvailableTradesView);

export default AvailableBuysControl;
