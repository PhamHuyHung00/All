import axios from "axios";
const URL_APP_API = "http://localhost:9000/api/v1";

export const deleteUser = (id) => {
  return axios.post(`${URL_APP_API}/user/delete/${id}`)
}
export const saveUser = (body) => {
  return axios.post(`${URL_APP_API}/user/save`, body);
};

export const getUsers = (page = 0, size = 5, userName = "", sortFiled = "id") => {
  return axios.get(
    `${URL_APP_API}/user?page=${page}&size=${size}&userName=${userName}&sortFiled=${sortFiled}`
  );
};
