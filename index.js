const signatureV4 = require("./src/signatureV4");
const getTime = require("./src/timeGenerator");

const HOST_URL = ""; // Host server url
const URI = ""; // API URI
const ACCESS_KEY = ""; // AWS access key 입력
const SECRET_KEY = ""; // AWS Secret Key 입력
const REGION = ""; // Region 입력
const SERVICE = ""; // Service 입력
const payload = ""; // Request Body
const { dateStamp, timeStamp } = getTime.getTime(); // current date(YYYYMMDD), time(HHMMSS)

// Signature
const signature = signatureV4.caculateTheSignature(
  HOST_URL,
  URI,
  payload,
  SECRET_KEY,
  dateStamp,
  timeStamp,
  REGION,
  SERVICE
);

// Request Header 구성
// Credential
const credential = `${ACCESS_KEY}/${dateStamp}/${REGION}/${SERVICE}/aws4_request`;

const headers = `{
  "content-type": "application/json",
  "x-amz-date": ${dateStamp}T${timeStamp}Z,
  authorization: AWS4-HMAC-SHA256 Credential=${credential}, SignedHeaders=content-type;host;x-amz-date, Signature=${signature},
  "accept-encoding": "gzip, deflate, br",
  accept: "application/json"
}`;

console.log("================");
console.log("[headers]");
console.log(headers);
console.log("================");
