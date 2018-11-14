import React from "react";

const UserSelectorView = ({ users, onChange }) => (
  <form>
    <label className="text-light mr-2" htmlFor="user">
      User
    </label>
    <select name="user" id="user" onChange={e => onChange(e.target.value)}>
      {users.map(user => {
        return <option key={user}>{user}</option>;
      })}
    </select>
  </form>
);

export default UserSelectorView;
