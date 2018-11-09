import { connect } from "react-redux";
import RecentTradesView from "./RecentTradesView";

const datetimeToTimeInterval = datetime => {
  const timeDivisions = [
    { unit: 's', divisor: 1000},
    { unit: 'm', divisor: 60},
    { unit: 'h', divisor: 60},
    { unit: 'd', divisor: 24},
    { unit: 'w', divisor: 7},
    { unit: 'y', divisor: 52}
  ];
  let result = new Date() - datetime;
  let unit = 'millis';

  for (let i = 0; i < timeDivisions.length; i++) {
    let candidate = result/timeDivisions[i].divisor;
    if (candidate < 1) {
      return '' + Math.round(result) + unit;
    } else {
      result = candidate;
      unit = timeDivisions[i].unit;
    }
  }
};

const mapStateToProps = state => ({
  recentTrades: state.recentTrades,
  displayDate: datetimeToTimeInterval
});
const mapDispatchToProps = {};

const RecentTradesController = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecentTradesView);
export default RecentTradesController;
