import { useState, useEffect } from "react";
import { saveUser } from "../service/appService";
import "./addUser.css";

function AddUser({ saveSuccessfully, editUser }) {
  const [user, setUser] = useState({});
  const [userEdit, setUserEdit] = useState();
  const [selectedValue, setSelectedValue] = useState("");
  const ListAddress = [
    { address: "HaNoi" },
    { address: "HoChiMinh" },
    { address: "DaNang" },
    { address: "SaiGon" },
  ];
  const listGender = [
    { name: "Male", value: "male" },
    { name: "Female", value: "female" },
    { name: "Other", value: "other" },
  ];
  const handleChangeInput = (e) => {
    e.preventDefault();
    const nameOfInput = e.target.name;
    const val = e.target.value;
    if (editUser) {
      setUser({ ...editUser, ...user, [nameOfInput]: val });
    } else {
      setUser({
        ...user,
        [nameOfInput]: val,
      });
    }
  };
  console.log(user);

  const handleSubmit = (e) => {
    e.preventDefault();
    saveUser(user).then((response) => {
      if (response.status === 200) {
        alert("Save Successfully ^^");
        saveSuccessfully(false);
      }
    });
    setUser(undefined);
  };

  useEffect(() => {
    setUserEdit(editUser);
  }, [editUser]);
  return (
    <div className="App">
      <form
        action=""
        method="get"
        className="speaker-form"
        onSubmit={handleSubmit}
      >
        <div className="form-row">
          <label htmlFor="full-name">Name</label>
          <input
            id="full-name"
            name="userName"
            type="text"
            onChange={handleChangeInput}
            defaultValue={userEdit?.userName || ""}
          />
        </div>
        <div className="form-row">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="joe@example.com"
            onChange={handleChangeInput}
            defaultValue={userEdit?.email || ""}
          />
        </div>
        <div className="form-row">
          <label htmlFor="email">Age</label>
          <input
            id="age"
            name="age"
            type="number"
            placeholder=""
            onChange={handleChangeInput}
            defaultValue={userEdit?.age || ""}
          />
        </div>
        <div className="legacy-form-row">
          <label>Gender</label>
          {listGender.map((item, index) => (
            <div key={index}>
              <label htmlFor={`input-${index}`}>{item.name}</label>
              <input
                name="gender"
                type="radio"
                value={item.value}
                onChange={handleChangeInput}
                id={`input-${index}`}
                checked={item.value === editUser?.gender}
              />
            </div>
          ))}
        </div>

        <div className="form-row">
          <label htmlFor="t-shirt">Address</label>
          <select
            id="t-shirt"
            name="address"
            defaultValue=""
            onChange={handleChangeInput}
            value={userEdit?.address}
          >
            {/* <option value="" hidden>
              Choose here ...
            </option> */}
            {ListAddress.map((item, index) => (
              <option value={item.address} key={index}>
                {item.address}
              </option>
            ))}
            {/* <option value="" hidden>
              Choose here ...
            </option> */}
            {/* <option value="HaNoi">HaNoi</option>
            <option value="HoChiMinh">HoChiMinh</option>
            <option value="DaNang">DaNang</option>
            <option value="SaiGon">SaiGon</option> */}
          </select>
        </div>
        <div className="form-row">
          <label htmlFor="abstract">Phone</label>
          <input
            id="abstract"
            name="phoneNumber"
            onChange={handleChangeInput}
            defaultValue={userEdit?.phoneNumber || ""}
          ></input>
        </div>
        <div className="form-row">
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default AddUser;
