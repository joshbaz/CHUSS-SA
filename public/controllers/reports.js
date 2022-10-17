const axios = require("axios");
const { BASE_API_ } = require("../base_url.config");
const fs = require("fs");
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

/** Reports */
/** update Examiner Report */
exports.updateExaminerReport = async (event, values) => {
  try {
    if (values.reportFile.url) {
      const FormData = require("form-data");
     // const { Blob } = require("buffer");
      const fd = new FormData();
      fd.append("reportssFiles", fs.createReadStream(values.reportFile.url));
      // for (const key in values) {
      //   console.log("keys", key, values[key]);
      //   if (
      //     key !== "_id" &&
      //     key !== "reportFile" &&
      //     key !== "reportFiles" &&
      //     key !== "examiner" &&
      //     key !== "generalAppointmentLetters"
      //   ) {
      //     fd.append(`${key}`, values[key]);
      //   }
      // }
      // fd.append(
      //   "data",
      //   new Blob([JSON.stringify(values)], {
      //     type: "application/json",
      //   })
      // );
       fd.append("score", values.score);
       fd.append("ungraded", values.ungraded);
       fd.append("remarks", values.remarks);

      console.log(fd, "fd");

      let responseData = await axios.patch(
        `${BASE_API_}/reports/v1/update/${values._id}`,
        fd
      );

      let data = {
        message: responseData.data,
        type: "success",
      };
      return data;
    } else {
      let responseData = await axios.patch(
        `${BASE_API_}/reports/v1/update/${values._id}`,
        values
      );

      let data = {
        message: responseData.data,
        type: "success",
      };
      return data;
    }
  } catch (error) {
    let errorResult = errorFunction(error);
    return errorResult;
  }
};

/** get examiner reports */
exports.getExaminerReport = async (event, id) => {
  try {
    let responseData = await axios.get(
      `${BASE_API_}/reports/v1/getReport/${id}`
    );

    let data = {
      ...responseData.data,
      type: "success",
    };
    return data;
  } catch (error) {
    let errorResult = errorFunction(error);
    return errorResult;
  }
};
