const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

function solution(year, startMonth, endMonth, dayOfWeek) {
  let daysToStartOfMonth = 0
  let vacationActualDays = 0

  for (let month of months) {
    if (month === startMonth) break
    daysToStartOfMonth += getDaysInMonth(month, year)
  }

  // This is the tricky part.
  // - Figure out the total number of days in the two vacation months
  // - Figure out how far into the start month the first Monday falls
  //    - Calculate the total number of full weeks since the start of the year
  //    - Make a note of the "spare" days at the end of the full weeks
  //    - Offset by the number of days until the first Monday of the year
  //    - Substract 1 to allow for the fact we have to fly by Sunday
  vacationActualDays =
    (getDaysInMonth(startMonth, year) + getDaysInMonth(endMonth, year)) -
    ((daysToStartOfMonth % 7) + getFirstMondayInYear(dayOfWeek)) - 1

  return Math.floor(vacationActualDays / 7)
}

function getDayOfWeek(dayName) {
  return days.findIndex(d => d === dayName)
}

function getFirstMondayInYear(dayNameOnFirst) {
  const mondayIndex = getDayOfWeek('Monday')
  const firstOfJanuaryIndex = getDayOfWeek(dayNameOnFirst)

  if (firstOfJanuaryIndex > mondayIndex) {
    return (7 - firstOfJanuaryIndex) + 1
  } else {
    return mondayIndex - firstOfJanuaryIndex
  }
}

function getDaysInMonth(monthName, year) {
  const index = months.findIndex(m => m === monthName)
  return index === 1 && isLeapYear(year) ? daysInMonth[index] + 1 : daysInMonth[index]
}

function isLeapYear(year) {
  return year % 4 === 0
}

console.log(solution(2014, 'April', 'May', 'Wednesday'))
