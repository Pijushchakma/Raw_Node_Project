const data = require("../../lib/data");
const { parseJSON, hashString } = require("../../helpers/utilities");

const handler = {};

handler.userHandler = (requestProperties, callback) => {
  //console.log(requestProperties);
  const acceptedMethods = ["get", "post", "put", "delete"];
  if (acceptedMethods.indexOf(requestProperties.method) > -1) {
    handler._user[requestProperties.method](requestProperties, callback);
  } else {
    callback(405);
  }
};

handler._user = {};

handler._user.post = (requestProperties, callback) => {
  const firstName =
    typeof requestProperties.body.firstName === "string" &&
    requestProperties.body.firstName.trim().length > 0
      ? requestProperties.body.firstName
      : null;
  const lastName =
    typeof requestProperties.body.lastName === "string" &&
    requestProperties.body.lastName.trim().length > 0
      ? requestProperties.body.lastName
      : null;
  const phoneNumber =
    typeof requestProperties.body.phoneNumber === "string" &&
    requestProperties.body.phoneNumber.trim().length === 11
      ? requestProperties.body.phoneNumber
      : null;
  const passWord =
    typeof requestProperties.body.passWord === "string" &&
    requestProperties.body.passWord.trim().length > 0
      ? requestProperties.body.passWord
      : null;
  // console.log(typeof requestProperties.body.tosAgreement, "......TosAgreement");
  const tosAgreement =
    typeof requestProperties.body.tosAgreement === "boolean"
      ? requestProperties.body.tosAgreement
      : null;
  console.log(typeof firstName, "-----firstname");
  console.log(typeof lastName, "----lastName");
  console.log(typeof phoneNumber, "----phoneNumber");
  console.log(typeof passWord, "------password");
  console.log(tosAgreement, "......TosAgreement");

  if (firstName && lastName && phoneNumber && passWord && tosAgreement) {
    //make sure that the user does not already exist
    data.readData("user", phoneNumber, (err, user) => {
      if (err) {
        let userObject = {
          firstName,
          lastName,
          phoneNumber,
          passWord: hashString(passWord),
          tosAgreement,
        };
        data.create("user", phoneNumber, userObject, (err) => {
          if (!err) {
            callback(200, {
              message: "Successfully created the user account",
            });
          } else {
            callback(500, {
              error: "server side error",
            });
          }
        });
      } else {
        console.log(user);
        callback(500, {
          error: " There was a problem in server",
        });
      }
    });
  } else {
    callback(400, {
      error: "You have an problem in your request",
    });
  }
  //   callback(200, {
  //     message: "This post method is working ",
  //   });
};
handler._user.get = (requestProperties, callback) => {
  // check the user's phone number is valid
  console.log(
    "phoneNumber type :",
    typeof requestProperties.queryStringObject.phoneNumber
  );
  const phoneNumber =
    requestProperties.body.phoneNumber.trim().length === 11
      ? requestProperties.body.phoneNumber
      : null;
  if (phoneNumber) {
    // look up the user
    data.readData("user", phoneNumber, (err, u) => {
      //object directly copy hoy na. tai first e object baniye spread operator use kore copy
      const user = { ...parseJSON(u) };
      if (!err && user) {
        delete user.passWord;
        callback(200, user);
      } else {
        callback(404, {
          error: "requested user was not found",
        });
      }
    });
  } else {
    callback(404, {
      error: "requested user was not found 1",
    });
  }
};
handler._user.put = (requestProperties, callback) => {
  const phoneNumber =
    typeof requestProperties.body.phoneNumber === "string" &&
    requestProperties.body.phoneNumber.trim().length === 11
      ? requestProperties.body.phoneNumber
      : null;
  const firstName =
    typeof requestProperties.body.firstName === "string" &&
    requestProperties.body.firstName.trim().length > 0
      ? requestProperties.body.firstName
      : null;
  const lastName =
    typeof requestProperties.body.lastName === "string" &&
    requestProperties.body.lastName.trim().length > 0
      ? requestProperties.body.lastName
      : null;
  const passWord =
    typeof requestProperties.body.passWord === "string" &&
    requestProperties.body.passWord.trim().length > 0
      ? requestProperties.body.passWord
      : null;
  if (phoneNumber) {
    if (firstName || lastName || passWord) {
      data.readData("user", phoneNumber, (err, u) => {
        const user = { ...parseJSON(u) };
        //console.log(err);
        if (!err && user) {
          if (firstName) {
            console.log(user.firstName);
            user.firstName = firstName;
          }
          if (lastName) {
            user.lastName = lastName;
          }
          if (passWord) {
            user.passWord = hash(passWord);
          }
          data.update("user", phoneNumber, user, (err) => {
            if (err) {
              callback(500, {
                error: "Sorry there is a problem in server side",
              });
            } else {
              callback(200, {
                message: "Congratulations you have successfully updated",
              });
            }
          });
        } else {
          callback(500, {
            error: "server side problem ",
          });
        }
      });
    } else {
      callback(400, {
        error: "you have a problem",
      });
    }
  } else {
    callback(400, {
      error: "Invalid Phone Number ",
    });
  }
};
handler._user.delete = (requestProperties, callback) => {
  //console.log(requestProperties.queryStringObject.phoneNumber);
  const phoneNumber = requestProperties.queryStringObject.phoneNumber;

  if (phoneNumber) {
    data.readData("user", phoneNumber, (err, userData) => {
      console.log(userData);
      if (!err && userData) {
        data.deleteFile("user", phoneNumber, (err) => {
          if (!err) {
            callback(200, {
              message: "Congratulations You have Successfully deleted the user",
            });
          } else {
            callback(500, {
              error: "server side Problem 1",
            });
          }
        });
      } else {
        console.log(err);
        callback(500, {
          error: "Server side problem",
        });
      }
    });
  } else {
    callback(400, {
      error: "Please Put a Valid Phone Number",
    });
  }
};
module.exports = handler;
