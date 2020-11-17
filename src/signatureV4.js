const crypto = require("crypto-js");

// Step 1. create canonical reqeat
/*
CanonicalRequest =
  HTTPRequestMethod + '\n' +
  CanonicalURI + '\n' +
  CanonicalQueryString + '\n' +
  CanonicalHeaders + '\n' +
  SignedHeaders + '\n' +
  HexEncode(Hash(RequestPayload))
*/
const createCanonicalRequest = (host_url, uri, payload, dateStamp, timeStamp) => {
  console.log("[createCanonicalRequest]");

  const hashedPayload = crypto.SHA256(payload).toString(crypto.enc.Hex);
  console.log("================");
  console.log(`[payload] : ${payload}`);
  console.log(`[hashedPayload] : ${hashedPayload}`);
  console.log("================");

  const canonicalRequest = `POST\n/${uri}\n\ncontent-type:application/json\nhost:${host_url}\nx-amz-date:${dateStamp}T${timeStamp}Z\n\ncontent-type;host;x-amz-date\n${hashedPayload}`;
  console.log("================");
  console.log("[canonicalRequest]");
  console.log(canonicalRequest);
  console.log("================");

  const standardRequest = crypto
    .SHA256(canonicalRequest)
    .toString(crypto.enc.Hex);
  console.log("================");
  console.log(`[standardRequest] : ${standardRequest}`);
  console.log("================");

  return standardRequest;
};

// Step 2. create string to sign
/* 
StringToSign =
  Algorithm + \n +
  RequestDateTime + \n +
  CredentialScope + \n +
  HashedCanonicalRequest
*/
const createStringToSign = (
  dateStamp,
  timeStamp,
  region,
  service,
  standardRequest
) => {
  const stringToSign = `AWS4-HMAC-SHA256\n${dateStamp}T${timeStamp}Z\n${dateStamp}/${region}/${service}/aws4_request\n${standardRequest}`;
  console.log("================");
  console.log("[stringToSign]");
  console.log(stringToSign);
  console.log("================");

  return stringToSign;
};

// HMAC SHA256 암호화
const hMac = (key, msg) => {
  return crypto.HmacSHA256(key, msg);
};

// Step 3. Caculate the signature
exports.caculateTheSignature = (
  host_url, 
  uri,
  payload,
  secretKey,
  dateStamp,
  timeStamp,
  region,
  service
) => {
  // Step 1. Create Canonical Request
  const standardRequest = createCanonicalRequest(
    host_url,
    uri,
    payload,
    dateStamp,
    timeStamp
  );

  // Step 2. Create String To Sign
  const stringToSign = createStringToSign(
    dateStamp,
    timeStamp,
    region,
    service,
    standardRequest
  );
  /*
    kSecret = your secret access key
    kDate = HMAC("AWS4" + kSecret, Date)
    kRegion = HMAC(kDate, Region)
    kService = HMAC(kRegion, Service)
    kSigning = HMAC(kService, "aws4_request")
  */
  const kDate = hMac(dateStamp, "AWS4" + secretKey);
  const kRegion = hMac(region, kDate);
  const kService = hMac(service, kRegion);
  const kSigning = hMac("aws4_request", kService);

  const signature = hMac(stringToSign, kSigning).toString(crypto.enc.Hex);
  console.log("================");
  console.log(`[signature] : ${signature}`);
  console.log("================");

  return signature;
};
