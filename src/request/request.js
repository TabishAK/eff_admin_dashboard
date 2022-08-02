const axios = require("axios");
const base_uel = "http://localhost:8000/"; //  #=> #=> #=> LOCALHOST
// http://localhost:3000/admin/Products
export const post = (body, url) => {
  return new Promise((resolve, reject) => {
    axios
      .post(base_uel + url, body, {
        headers: {
          auth: JSON.parse(localStorage.getItem("currentUser")),
        },
      })
      .then((response) => resolve(response))
      .catch((error) => reject(error.response));
  });
};

export const get = (url) => {
  return new Promise((resolve, reject) => {
    axios
      .get(base_uel + url)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const put = (body, url) => {
  return new Promise((resolve, reject) => {
    axios
      .put(base_uel + url, body, {
        headers: {
          auth: JSON.parse(localStorage.getItem("currentUser")),
        },
      })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const _delete = (_id, url) => {
  console.log(JSON.parse(localStorage.getItem("currentUser")));
  return new Promise((resolve, reject) => {
    axios
      .delete(base_uel + url, {
        headers: {
          auth: JSON.parse(localStorage.getItem("currentUser")),
        },

        data: { _id: _id },
      })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};
