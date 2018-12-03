import React from "react";

const NewTradesView = ({ onSubmit, user }) => {
  let price, quantity, action;
  return (
    <div>
      <div className="card-header">
        <h4>New</h4>
      </div>
      <form>
        <div className="mb-3">
          <label>Price</label>
          <input
            type="number"
            min="0"
            className="form-control"
            ref={node => {
              price = node;
            }}
          />
        </div>
        <div className="mb-3">
          <label>Quantity</label>
          <input
            type="number"
            min="0"
            className="form-control"
            ref={node => {
              quantity = node;
            }}
          />
        </div>
        <div className="mb-3">
          <label>Action</label>
          <select
            ref={node => {
              action = node;
            }}
            className="custom-select d-block"
          >
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
        </div>
        <button
          type="submit"
          className="btn"
          onClick={(event) => {
              onSubmit(price.value, quantity.value, action.value, user);
              event.preventDefault();
              price.value = null;
              quantity.value = null;
            }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewTradesView;
