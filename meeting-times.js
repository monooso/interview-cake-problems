function mergeRanges(meetings) {
  const sortedMeetings = sortMeetingsByStartTime(meetings)
  const mergedMeetings = [sortedMeetings[0]]

  for (let index = 1; index < sortedMeetings.length; index++) {
    const currentMeeting = sortedMeetings[index]
    const previousMeeting = mergedMeetings[mergedMeetings.length - 1]

    if (currentMeeting.startTime <= previousMeeting.endTime) {
      previousMeeting.endTime = Math.max(previousMeeting.endTime, currentMeeting.endTime)
    } else {
      mergedMeetings.push(currentMeeting)
    }
  }

  return mergedMeetings
}

function sortMeetingsByStartTime(meetings) {
  return [...meetings].sort((a, b) => a.startTime - b.startTime)
}

console.log(mergeRanges([
  { startTime: 0, endTime: 1 },
  { startTime: 3, endTime: 5 },
  { startTime: 4, endTime: 8 },
  { startTime: 10, endTime: 12 },
  { startTime: 9, endTime: 10 },
]))
