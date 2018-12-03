import React from 'react';
import DepthChart from './DepthChart';

const DepthChartCard = () => (
  <div className="card-deck">
    <div className="card mb-4 shadow-sm">
      <div className="card-header">
        <h3 className="my-0 font-weight-normal">Depth chart</h3>
      </div>
      <div className="card-body">
        <DepthChart />
      </div>
    </div>
  </div>
);
export default DepthChartCard;
