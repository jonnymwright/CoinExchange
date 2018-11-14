import React, { Component } from "react";
import { connect } from "react-redux";
import AvailableTradesView from "../AvailableTradesView";
import { receiveAvailableBuys } from "../../../reducers/availbleTrades/availbleTradesActionCreators";
import { loadAggregatedBuys } from "../../../api/loadInitialData";

const mapStateToProps = store => ({
  trades: store.availableTrades.buys
});
const mapDispatchToProps = { receiveAvailableBuys };

class AvailableBuysControl extends Component {
  async componentDidMount() {
    this.props.receiveAvailableBuys(await loadAggregatedBuys());
  }

  render() {
    return <AvailableTradesView trades={this.props.trades}  type='Buys'/>;
  }
}
AvailableBuysControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(AvailableBuysControl);

export default AvailableBuysControl;
