import { API } from "../API";

// const base__url = "https://deltrix-ecommerce.herokuapp.com/";

export const vendorAction = (d) => {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(API.becomeVendor, {
          method: "GET",
        });
        const result = await response.json();

        resolve(result);
      } catch (e) {
        console.log(
          "TCL ~ file: vendorAction.js ~ line 15 ~ returnnewPromise ~ e",
          e
        );
        reject(e);
      }
    });
  };
};
export const vendor = (data) => {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(data);
        const response = await fetch(API.vendor, {
          method: "POST",
          body: data,
        });

        const result = await response.json();
        console.log(
          "TCL ~ file: vendorAction.js ~ line 30 ~ returnnewPromise ~ result",
          result
        );
        resolve(result);
      } catch (e) {
        console.log(
          "TCL ~ file: vendorAction.js ~ line 15 ~ returnnewPromise ~ e",
          e
        );
        reject(e);
      }
    });
  };
};
