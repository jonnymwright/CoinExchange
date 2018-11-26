import { connect } from 'react-redux';
import NewTradesView from './NewTradesView';
import { sendTrade } from '../../../api/sockets';

const mapStateToProps = store => ({
  user: store.user.activeUser
});

const mapDispatchToProps = () => ({
  onSubmit: (price, quantity, action, user) => {
    sendTrade({ price, quantity, action, user });
  }
});

const NewTradeController = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewTradesView);

export default NewTradeController;