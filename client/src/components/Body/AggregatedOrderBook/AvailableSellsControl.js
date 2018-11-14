import React, { Component } from "react";
import { connect } from "react-redux";
import AvailableTradesView from "../AvailableTradesView";
import { receiveAvailableSells } from "../../../reducers/availbleTrades/availbleTradesActionCreators";
import { loadAggregatedSells } from "../../../api/loadInitialData";

const mapStateToProps = (store) => ({
    trades: store.availableTrades.sells
});
const mapDispatchToProps = { receiveAvailableSells };

class AvailableSellsControl extends Component {
    async componentDidMount() {
      this.props.receiveAvailableSells(await loadAggregatedSells());
    }
  
    render() {
      return <AvailableTradesView trades={this.props.trades} type='Sells' />;
    }
  }
AvailableSellsControl = connect(
    mapStateToProps,
    mapDispatchToProps
)(AvailableSellsControl);

export default AvailableSellsControl;