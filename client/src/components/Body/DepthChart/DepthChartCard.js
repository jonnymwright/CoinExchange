import React from 'react';
import DepthChart from './DepthChart';

const DepthChartCard = () => (
  <div className="card-deck">
    <div className="card mb-4 shadow-sm">
      <div className="card-header">
        <h4 className="my-0 font-weight-normal">Depth chart</h4>
      </div>
      <div className="card-body">
        <DepthChart />
      </div>
    </div>
  </div>
);
export default DepthChartCard;
