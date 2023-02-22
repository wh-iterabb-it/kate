const axios = require("axios").default;

/**
 * @name getMoonPhase
 * @description get moon phase
 * @returns {Promise<import("axios").AxiosResponse<any>>}
 * */
function getMoonPhase() {
  const url = `https://shrewdly.herokuapp.com/`;
  const response = axios
    .get(url, {
      method: "get",
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      // handle success
      return response.data.data.message;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  return response;
}

/**
 * @name getFortune
 * @description get fortune
 * @returns {Promise<import("axios").AxiosResponse<any>>}
 * */
function getFortune() {
  const url = `https://aphorismcookie.herokuapp.com/`;
  const response = axios
    .get(url, {
      method: "get",
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      // handle success
      return response.data.data.message;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  return response;
}

module.exports = { getMoonPhase, getFortune };
