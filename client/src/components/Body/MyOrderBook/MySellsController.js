import React, { Component } from "react";
import { connect } from 'react-redux';
import AvailableTradesView from '../AvailableTradesView';
import { receiceMySells } from '../../../reducers/myTrades/actionCreator';
import { loadMySells } from '../../../api/loadInitialData';

const mapStateToProps = (store) => ({
    trades: store.myTrades.sells,
    user: store.user.activeUser
});

const mapDispatchToProps = { receiceMySells };

class MySellsController extends Component {
    async componentDidMount() {
      this.props.receiceMySells(await loadMySells(this.props.user));
    }
  
    render() {
        return (<AvailableTradesView type='Sells' trades={this.props.trades}/>);
    }
};
MySellsController = connect (
    mapStateToProps,
    mapDispatchToProps
) (MySellsController);

export default MySellsController;