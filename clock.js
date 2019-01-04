const DEG_HOURSHAND_MOVE_IN_A_SEC = 0.004166666667;

const getSecDeg = function(secs) {
  return secs * 6 - 90;
};

const getMinDeg = function(mins, secs) {
  let minDeg = mins * 6 - 90;
  return minDeg + (secs % 60) * 0.1;
};

const getHourDeg = function(hours, mins, secs) {
  let hoursDeg = hours * 30 - 90;
  return hoursDeg + (mins * 60 + secs) * DEG_HOURSHAND_MOVE_IN_A_SEC;
};

const getCurrTime = function() {
  let date = new Date();
  let currentSecs = date.getSeconds();
  let currentMins = date.getMinutes();
  let currentHours = date.getHours();
  return { currentSecs, currentMins, currentHours };
};
const getCurrTimeDeg = function() {
  const { currentSecs, currentMins, currentHours } = getCurrTime();
  let secondHandDeg = getSecDeg(currentSecs);
  let minuteHandDeg = getMinDeg(currentMins, currentSecs);
  let hourHandDeg = getHourDeg(currentHours, currentMins, currentSecs);
  return { secondHandDeg, minuteHandDeg, hourHandDeg };
};

const rotate = function(degrees) {
  return ["rotate(", degrees, "deg)"].join("");
};
const getFirstByClass = name => document.getElementsByClassName(name)[0];

const startClock = function() {
  let secondHand = getFirstByClass("secondHand");
  let minuteHand = getFirstByClass("minuteHand");
  let hourHand = getFirstByClass("hourHand");
  let { secondHandDeg, minuteHandDeg, hourHandDeg } = getCurrTimeDeg();
  setInterval(function() {
    secondHand.style.transform = rotate(secondHandDeg);
    minuteHand.style.transform = rotate(minuteHandDeg);
    hourHand.style.transform = rotate(hourHandDeg);
    secondHandDeg = secondHandDeg + 6;
    minuteHandDeg = minuteHandDeg + 0.1;
    hourHandDeg = hourHandDeg + DEG_HOURSHAND_MOVE_IN_A_SEC;
  }, 1000);
};
