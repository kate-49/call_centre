
/**
 * @param {Date} myDate The date
 */
function checkIfWeekDay(myDate) {
  //check day of the week if monday to friday check time if weekend just throw error
  return myDate.getDay() <= 5;
}
function checkIfCallCentreOpen(myDate) {
  var hour = myDate.getHours();
  return hour >= 9;
}

/**
 * @param {Date} myDate The date
 */
function callCentre(myDate)
{
  if (!(myDate instanceof Date)) {
    throw "Invalid data type given";
  }
  if (checkIfWeekDay(myDate) === false) {
    throw "Can't book appts at weekend";
  }
  if (checkIfCallCentreOpen(myDate) === false) {
    throw "Centre not open before 9";
  }
  return 'call centre closed'

}
module.exports = callCentre;

//take requested time
// check time is valid format
//check whether call centre is open
//check whether call is more than 2 hours in future
// check call is not more than 6 days in future

//Boundary testing -
// 1 hour before opening on days,
// on open time
// just after opening on days,
// random time in middle of day,
// just before closing
// on closing
// after closing
// at weekend,
// just under 6 hours in future
// exactly 6 hours in future
// over 6 hours in future
// less than 2 hours in future
// exactly 2 hours in future
// more than 2 hours in future


