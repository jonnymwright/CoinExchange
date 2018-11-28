import React from 'react';

const RoundedNumber = (props) => (
    <div>{Math.round(props.children * 100) / 100}</div>
);

export default RoundedNumber;