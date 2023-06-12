import "./AllUser.css";
import { getUsers, deleteUser } from "../service/appService";
import { useEffect, useState } from "react";
import AddUser from "./AddUser";

function AllUser() {
  const [page, setPage] = useState();
  const [size, setSize] = useState();
  const [keyword, setKeyword] = useState("");
  const [sortFiled, setSortFiled] = useState("");
  const [getListUser, setListUser] = useState([]);
  const [isCheckAddUser, setIsCheckAddUser] = useState(false);
  const [userEdit, setUserEdit] = useState({});

  function apiGetUsers(page, size, keyword, sortFiled) {
    getUsers().then((response) => {
      setListUser(response.data.content);
    });
  }
  const handleDeleteUser = (user) => {
    const userId = user.id;
    console.log("user info: ", user);
    if (userId) {
      deleteUser(userId).then((response) => {
        if (response.status === 200) {
          alert("delete success !!!");
          apiGetUsers();
        }
      });
    }
  };

  const openAddUser = () => {
    setIsCheckAddUser(!isCheckAddUser);
  };

  const handleSaveSuccessfully = (isCheck) => {
    setIsCheckAddUser(isCheck);
    setUserEdit(undefined);
    apiGetUsers();
  };

  const handleEditUser = (user) => {
    setIsCheckAddUser(true);
    setUserEdit(user);
  };

  useEffect(() => {
    apiGetUsers();
  }, []);
  return (
    <div>
      {isCheckAddUser && (
        <AddUser
          saveSuccessfully={handleSaveSuccessfully}
          editUser={userEdit}
        />
      )}
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>User Name</th>
            <th>Age</th>
            <th>Address</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>gender</th>
            <th>
              <button onClick={openAddUser}>Add User</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {getListUser && getListUser.length > 0
            ? getListUser.map((user) => {
                return (
                  <tr key={user.id}>
                    <th>{user.id}</th>
                    <th>{user.userName}</th>
                    <td>{user.age}</td>
                    <td>{user.address}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.gender}</td>
                    <td>
                      <button onClick={() => handleEditUser(user)}>Edit</button>
                    </td>
                    <td>
                      <button onClick={() => handleDeleteUser(user)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
}
export default AllUser;
