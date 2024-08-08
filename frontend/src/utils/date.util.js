import moment from "moment";

const DateService = {
  getDurationMinutes: (value = 0) => {
    return value > 0
      ? moment.duration(value, "minutes").humanize()
      : "0 seconds";
  },

  getDurationString: (seconds = 0) => {
    let hours = seconds / 3600;
    let mins = (seconds % 3600) / 60;
    let secs = (mins * 60) % 60;

    hours = Math.trunc(hours);
    mins = Math.trunc(mins);

    if (!hours && !mins && !secs) return "0 sec";

    if (hours) {
      if (mins)
        return secs
          ? `${hours} hr ${mins} min & ${secs} sec`
          : `${hours} hr & ${mins} min`;
      else return secs ? `${hours} hr & ${secs} sec` : `${hours} hr`;
    } else {
      if (mins) return secs ? `${mins} min & ${secs} sec` : `${mins} min`;
      else return secs ? `${secs} sec` : `None`;
    }
  },

  getMonthString: (value = "") => {
    return moment(new Date(value)).format("MMMM-YYYY");
  },

  getDateRange: (value) => {
    return [
      value[0] ? new Date(value[0]).toString() : "",
      value[1] ? new Date(value[1]).toString() : "",
    ];
  },

  getShortDateString: (value) => {
    return value ? moment(value.replace("Z", "")).format("ddd, MMM DD") : "";
  },
  getLongDateString: (value) => {
    return value
      ? moment(value.replace("Z", "")).format("ddd, MMM DD YYYY")
      : "";
  },

  getDateString: (value, format = "ddd, MMM DD, YYYY") => {
    return value ? moment(value.replace("Z", "")).format(format) : "";
  },

  getTimeString: (value) => {
    return value ? moment(value.replace("Z", "")).format("HH:mm") : "";
  },
  getTime: (value) => {
    return value ? moment(value).format("HH:mm:ss") : "";
  },
  getDateTimeString: (value) => {
    return value
      ? moment(value.replace("Z", "")).format("ddd, MMM DD, YYYY, HH:mm")
      : "";
  },

  getFormattedDate: (value) => {
    return value
      ? new Date(value).toLocaleDateString(undefined, {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "";
  },
  getNumericDate: (value) => {
    return value
      ? new Date(value).toLocaleDateString("fr-CH", {
          // weekday: "numeric",
          day: "numeric",
          month: "numeric",
          year: "numeric",
        })
      : "";
  },

  getFormattedDateTime: (value) => {
    return value
      ? new Date(value).toLocaleDateString(undefined, {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: false,
        })
      : "";
  },

  getTimeOnly: (value) => {
    let valArr = value?.split(":");

    return value ? valArr[0] + ":" + valArr[1] : "";
  },
  getMomentDateFormat: (value) => {
    return value ? moment(value).format("DD.MM.YYYY") : "--";
  },
  getMomentTimeFormat: (value) => {
    return value ? moment(value).format("HH:mm") : "--";
  },

  getSmartDateString: (date, type) => {
    if (type == "year") return date ? moment(date).format("Do,MMM YY") : "";
    return date ? moment(date).format("ddd, MMM DD") : "";
  },
  getSmartTimeString: (date) => {
    let value = date?.split("T")[1]?.split(":");
    return value ? `${value[0]}:${value[1]}` : "";
  },
  getServerDateString: (value, sort) => {
    let date = new Date(Date.parse(value));
    let formate = sort ? "ddd, MMM DD" : "ddd, MMM DD, YYYY";
    return date ? moment(date).format(formate) : "";
  },
  getServerTimeString: (value) => {
    let date = new Date(Date.parse(value));
    return date ? moment(date).format("hh:mm A") : "";
  },
  getTimeToDate: (value) => {
    const [hours, minutes] = value.split(":");
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    return date.toISOString();
  },
};

export default DateService;
