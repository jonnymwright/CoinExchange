import { connect } from "react-redux";
import AvailableTradesView from "../AvailableTradesView";
import { receiveAvailableBuys } from "../../../reducers/availbleTrades/availbleTradesActionCreators";

const mapStateToProps = store => ({
  trades: store.availableTrades.buys.slice(0, 10).reverse(),
  type: "Buys"
});
const mapDispatchToProps = { receiveAvailableBuys };

const AvailableBuysControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(AvailableTradesView);

export default AvailableBuysControl;
