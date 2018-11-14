import React, { Component } from "react";
import { connect } from 'react-redux';
import AvailableTradesView from '../AvailableTradesView';
import { receiceMyBuys } from '../../../reducers/myTrades/actionCreator';
import { loadMyBuys } from '../../../api/loadInitialData';

const mapStateToProps = (store) => ({
    trades: store.myTrades.buys,
    user: store.user.activeUser
});

const mapDispatchToProps = { receiceMyBuys };

class MyBuysController extends Component {
    async componentDidMount() {
      this.props.receiceMyBuys(await loadMyBuys(this.props.user));
    }
  
    render() {
        return (<AvailableTradesView type='Buys' trades={this.props.trades}/>);
    }
};
MyBuysController = connect (
    mapStateToProps,
    mapDispatchToProps
) (MyBuysController);

export default MyBuysController;