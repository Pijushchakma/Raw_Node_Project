const crypto = require("crypto");
const utilities = {};

//parse JSOn string to object
utilities.parseJSON = (jsonString) => {
  let output = {};
  try {
    output = JSON.parse(jsonString);
  } catch {
    output = {};
  }
  return output;
};

// hash the string
utilities.hashString = (stringToHash) => {
  const hash = crypto
    .createHmac("sha256", "pijush")
    .update(stringToHash)
    .digest("hex");
  return hash;
};

module.exports = utilities;
