const axios = require("axios");
const { BASE_API_ } = require("../base_url.config");
const fs = require("fs");
const { dialog } = require("electron")

/** error handler */
let errorFunction = (error) => {
  let errorArray = [];
  errorArray.push(error);

  let response = {
    message: "",
    type: "error",
  };
  if (errorArray.length !== 0 && errorArray[0].response) {
    response.message = errorArray[0].response.data;
  } else if (errorArray.length !== 0 && !errorArray[0].response) {
    response.message = errorArray[0].message;
  }

  return response;
};

/** get files */
exports.getFiles = async (event, id) => {
  try {
    let responseData = await axios.get(`${BASE_API_}/docs/download/${id}`);

    let data = responseData.data;

    return data;
  } catch (error) {
    let errorResult = errorFunction(error);
    return errorResult;
  }
};

/** download file */
// exports.downloadFiles = async (event, values)=>{
//     try {
//       dialog.showSaveDialog((filename)=>{
//         if(filename === undefined){
//           return
//         }

//       })
//     } catch (error) {
//       let errorResult = errorFunction(error);
//       return errorResult;
//     }
// }
