export const dateFormatter = (testExpiry, testDateTime) => {
  let data = {
    scheduledDate: "",
    expiryDate: ""
  };
  const scheduledData = calculateScheduledData(testDateTime);
  const diffDays = calculateTimeDifference(
    scheduledData.dayOfSchedule,
    scheduledData.monthOfSchedule,
    scheduledData.yearOfSchedule
  );
  data = calculateScheduledResultTime(diffDays, scheduledData, data);
  data = calculateExpiryResultTime(testExpiry, scheduledData, data);
  return data;
};

export const getTimeStamp = (date:string) => {
  return new Date(date).getTime();
}

export const calculateScheduledData = (testDateTime) => {
  const scheduledData = {
    scheduleDate: null,
    timeOfSchedule: '',
    dayOfSchedule: null,
    monthOfSchedule: null,
    yearOfSchedule: null,
    scheduledTime: ''
  }
  var date: Date = new Date(testDateTime);
  scheduledData.scheduleDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
  scheduledData.timeOfSchedule = testDateTime.toLocaleString();
  scheduledData.dayOfSchedule = scheduledData.scheduleDate.getDate();
  scheduledData.monthOfSchedule = scheduledData.scheduleDate.getMonth();
  scheduledData.yearOfSchedule = scheduledData.scheduleDate.getFullYear();
  const time = splitDate(scheduledData.timeOfSchedule.toString(), " ")[1];
  scheduledData.scheduledTime =
    splitDate(time, ":")[0] +
    ":" +
    splitDate(time, ":")[1] +
    " " +
    splitDate(scheduledData.timeOfSchedule.toString(), " ")[2];
  return scheduledData;
}

export const calculateScheduledResultTime = (diffDays, scheduledData, data) => {
  const result = data;
  if (diffDays === 0) {
    result.scheduledDate = "Today " + scheduledData.scheduledTime;
  } else if (diffDays === 1) {
    result.scheduledDate = "Tomorrow " + scheduledData.scheduledTime;
  } else if (diffDays === -1) {
    result.scheduledDate = "Yesterday " + scheduledData.scheduledTime;
  } else {
    const splitScheduledDateResult = splitDate(scheduledData.scheduleDate.toString(), " ");
    result.scheduledDate =
      splitScheduledDateResult[2] +
      " " +
      splitScheduledDateResult[1] +
      " " +
      splitScheduledDateResult[3] +
      " " +
      scheduledData.scheduledTime;
  }
  return result;
}

export const calculateExpiryResultTime = (testExpiry, scheduledData, data) => {
  const result = data;
  if (testExpiry !== "") {
    const expiryTime = testExpiry;
    var today = new Date();
    if (expiryTime === 1 && today.getDate() === scheduledData.dayOfSchedule) {
      result.expiryDate = "Tomorrow " + scheduledData.scheduledTime;
    } else {
      const scheduleData = scheduledData.scheduleDate;
      scheduleData.setDate(scheduleData.getDate() + expiryTime);
      const splitDateResult = splitDate(scheduleData.toString(), " ");
      result.expiryDate =
        splitDateResult[2] +
        " " +
        splitDateResult[1] +
        " " +
        splitDateResult[3] +
        " " +
        scheduledData.scheduledTime;
    }
  }
  else {
    result.expiryDate = '';
  }
  return result;
}

export const calculateTimeDifference = (
  dayOfSchedule,
  monthOfSchedule,
  yearOfSchedule
) => {
  const today = new Date();
  if (
    today.getFullYear() === yearOfSchedule &&
    today.getMonth() === monthOfSchedule &&
    today.getDate() === dayOfSchedule
  ) {
    return 0;
  } else if (today.getFullYear() + 1 === yearOfSchedule || today.getFullYear() === yearOfSchedule) {
    const value = yearOneLessOrEqual(today, yearOfSchedule, monthOfSchedule, dayOfSchedule);
    return value;
  }
  else if (today.getFullYear() - 1 === yearOfSchedule) {
    const value = yearMore(today, monthOfSchedule, dayOfSchedule);
    return value;
  }
  else {
    return 2;
  }
};

export const splitDate = (data: string, splitBy: string): Array<string> => {
  return data.split(splitBy);
};


export const yearOneLessOrEqual = (today, yearOfSchedule, monthOfSchedule, dateOfSchedule) => {
  if (today.getFullYear() === yearOfSchedule) {
    return calculateTimeDiffForSameYear(today, yearOfSchedule, monthOfSchedule, dateOfSchedule);
  }
  else {
    if (today.getMonth() === 11 && monthOfSchedule === 0) {
      if (today.getDate() === 31 && dateOfSchedule === 1)
        return 1;
      else
        return 2;
    }
    else
      return 2;
  }
}

export const calculateTimeDiffForSameYear = (today, yearOfSchedule, monthOfSchedule, dateOfSchedule) => {
  if (today.getMonth() === monthOfSchedule) {
    if (today.getDate() + 1 === dateOfSchedule)
      return 1;
    else if (today.getDate() - 1 === dateOfSchedule)
      return -1;
    else
      return 2;
  }
  else if (today.getMonth() + 1 === monthOfSchedule) {
    const month = [0, 2, 4, 6, 7, 9];
    if (month.findIndex(month => month === today.getMonth()) !== -1) {
      if (today.getDate() === 31 && dateOfSchedule === 1)
        return 1;
      else
        return 2;
    }
    else if ((yearOfSchedule % 400 === 0 || yearOfSchedule % 4 === 0) && yearOfSchedule % 100 !== 0) {
      if (today.getMonth() === 1 && today.getDate() === 29 && dateOfSchedule === 1)
        return 1;
      else
        return 2;
    }
    else if ((yearOfSchedule % 400 !== 0 || yearOfSchedule % 4 !== 0) && yearOfSchedule % 100 === 0) {
      if (today.getMonth() === 1 && today.getDate() === 28 && dateOfSchedule === 1)
        return 1;
      else
        return 2;
    }
    else {
      if (today.getDate() === 30 && dateOfSchedule === 1)
        return 1;
      else
        return 2;
    }
  }
  else if (today.getMonth() - 1 === monthOfSchedule) {
    const month = [2, 4, 6, 7, 9, 11]
    if (today.getFullYear() % 400 === 0 && today.getFullYear() % 4 === 0 && today.getFullYear() % 100 !== 0) {
      if (today.getMonth() === 2 && today.getDate() === 1 && monthOfSchedule === 1 && dateOfSchedule === 29)
        return -1;
      else if (month.findIndex(month => month === today.getMonth()) !== -1) {
        if (today.getMonth() === 7) {
          if (today.getDate() === 1 && dateOfSchedule === 31)
            return -1;
          else
            return 2;
        }
        else {
          if (today.getDate() === 1 && dateOfSchedule === 30)
            return -1;
          else
            return 2;
        }
      }
    }
    else {
      if (today.getMonth() === 2 && today.getDate() === 1 && monthOfSchedule === 1 && dateOfSchedule === 28) {
        return -1;
      }
      else if (month.findIndex(month => month === today.getMonth()) !== -1) {
        if (today.getMonth() === 7) {
          if (today.getDate() === 1 && dateOfSchedule === 31)
            return -1;
          else
            return 2;
        }
        else {
          if (today.getDate() === 1 && dateOfSchedule === 30)
            return -1;
          else
            return 2;
        }
      }
    }
  }
  else
    return 2;
}

export const yearMore = (today, monthOfSchedule, dateOfSchedule) => {
  if (today.getMonth() === 0 && monthOfSchedule === 11 && today.getDate() === 1 && dateOfSchedule === 31)
    return -1;
  else
    return 2;
}