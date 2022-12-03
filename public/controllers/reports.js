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
    if (values.reportFile !== null) {
      n
      console.log('report values values', values)
      const FormData = require("form-data");
     // const { Blob } = require("buffer");
      const fd = new FormData();
      console.log('before report values values', values.reportFile)
      fd.append("reportssFiles", fs.createReadStream(values.reportFile.url));
     console.log('after report values values', values.reportFile)
       fd.append("score", values.score);
       fd.append("ungraded", values.ungraded);
       fd.append("remarks", values.remarks);
     console.log('great pp', values.reportFile)
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

/** get all examiner reports */
exports.getAllExaminerReports = async (event, id) => {
    try {
        let responseData = await axios.get(
            `${BASE_API_}/reports/v1/allexaminerReports`
        )

        let data = {
            ...responseData.data,
            type: 'success',
        }
        return data
    } catch (error) {
        let errorResult = errorFunction(error)
        return errorResult
    }
}
