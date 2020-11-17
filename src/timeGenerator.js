module.exports.getTime = () => {
  const date = new Date();
  const ISOdate = date.toISOString().split("T")[0].split("-");
  const ISOtime = date.toISOString().split("T")[1].split(":");
  const dateStamp = ISOdate[0] + ISOdate[1] + ISOdate[2]; //YYYYMMDD
  const timeStamp = ISOtime[0] + ISOtime[1] + ISOtime[2].split(".")[0]; //HHMSS

  return { dateStamp, timeStamp };
};
