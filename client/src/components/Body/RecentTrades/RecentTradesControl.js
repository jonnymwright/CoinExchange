import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecentTradesView from './RecentTradesView';
import { receiveRecentTrades } from '../../../reducers/recentTrades/recentTradesActionCreator';

const mapStateToProps = state => ({
  recentTrades: state.recentTrades
});
const mapDispatchToProps = { receiveRecentTrades };

class RecentTradesController extends Component {
  render() {
    return (
      <RecentTradesView
        recentTrades={this.props.recentTrades}
      />
    );
  }
}

RecentTradesController = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecentTradesController);
export default RecentTradesController;
