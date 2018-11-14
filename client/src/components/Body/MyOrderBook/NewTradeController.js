import { connect } from 'react-redux';
import NewTradesView from './NewTradesView';

const mapDispatchToProps = () => ({
    onSubmit: (price, quantity, action) => { console.log(price, quantity, action);  }
});

const NewTradeController = connect(
    null,
    mapDispatchToProps
) (NewTradesView);

export default NewTradeController;