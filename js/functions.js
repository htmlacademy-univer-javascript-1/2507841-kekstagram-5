function isValidLength(str, maxLength) {
  return str.length <= maxLength;
}

function isPalindrome(str) {
  const len = str.length;
  for (let i = 0; i < len / 2; i++) {
    if (str.at(i) !== str.at(len - 1 - i)) {
      return false;
    }
  }
  return true;
}

function getNumberFromString(str) {
  let num = '';
  const digits = '0123456789';
  for (let i = 0; i < str.length; i++) {
    if (digits.includes(str.at(i))) {
      num += str.at(i);
    }
  }
  return +num;
}

function checkMeetingAccuracy(dayBegin, dayEnd, meetingBegin, duration) {
  const dayBeginTime = dayBegin.split(':');
  const dayEndTime = dayEnd.split(':');
  const meetingBeginTime = meetingBegin.split(':');
  const dayBeginMinutes = (+dayBeginTime[0]) * 60 + (+dayBeginTime[1]);
  const dayEndMinutes = (+dayEndTime[0]) * 60 + (+dayEndTime[1]);
  const meetingBeginMinutes = (+meetingBeginTime[0]) * 60 + (+meetingBeginTime[1]);
  return dayBeginMinutes <= meetingBeginMinutes && meetingBeginMinutes + duration <= dayEndMinutes;
}

isValidLength('121',3);
isPalindrome('шалаш');
checkMeetingAccuracy('11:30', '17:00', '13:00', 480);

export {getNumberFromString};
