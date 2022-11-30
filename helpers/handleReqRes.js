const url = require("url");
const { StringDecoder } = require("string_decoder");
const routes = require("../routes");
const { parseJSON } = require("../helpers/utilities");
const {
  notFoundHandler,
} = require("../handlers/routeHandlers/notFoundHandler");

const handler = {};

handler.handleReqRes = (req, res) => {
  //request handle
  const parseURL = url.parse(req.url, true);
  const path = parseURL.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");
  const method = req.method.toLowerCase();
  const queryStringObject = parseURL.query;
  const headers = req.headers;
  const requestproperties = {
    parseURL,
    path,
    trimmedPath,
    method,
    queryStringObject,
    headers,
  };
  console.log(trimmedPath);
  const chosenHandler = routes[trimmedPath]
    ? routes[trimmedPath]
    : notFoundHandler;

  const decoder = new StringDecoder("utf-8");
  let realData = "";

  req.on("data", (buffer) => {
    realData += decoder.write(buffer);
  });
  req.on("end", () => {
    realData += decoder.end();
    // To convert the string to json object and then add it to requestProperties and send it to handlers
    requestproperties.body = parseJSON(realData);
    chosenHandler(requestproperties, (statusCode, payLoad) => {
      statusCode = typeof statusCode === "number" ? statusCode : 500;
      payLoad = typeof payLoad === "object" ? payLoad : {};

      const payLoadString = JSON.stringify(payLoad);

      res.setHeader("content-type", "application/json");
      res.writeHead(statusCode);
      res.end(payLoadString);
    });
  });
};

module.exports = handler;
