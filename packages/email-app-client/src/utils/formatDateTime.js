import moment from "moment";

export default function formatDatetime(datetime) {
  const currentDatetime = moment();
  const momentDatetime = moment(datetime);
  if (momentDatetime.isValid()) {
    if (momentDatetime.isSame(currentDatetime, "day")) {
      return momentDatetime.format("h:mm:ss a");
    }
    return momentDatetime.format("MMMM Do, h:mm:ss a");
  }
  return "";
}
