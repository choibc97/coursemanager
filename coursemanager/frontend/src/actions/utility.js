// takes in a qr code string and formats it for a request
export const formatQrString = qr => {
  const arr = qr.split("_").filter(Boolean);
  return {
    student: arr[0],
    assignment: arr[1]
  };
};

// create a set of path exclusions
export const pathExclusions = new Set([
  "view",
  "edit",
  "iview",
  "sview",
  "assignments",
  "assignment"
]);

// create a set of paths to not capitalize
export const lowercasePaths = new Set(["view", "edit", "iview", "sview"]);

// capitalize the first letter in a word
export const capitalize = word => {
  return word[0].toUpperCase() + word.slice(1);
};

// takes in a path string and turns it into an array
// filters out path exclusions and capitalizes the first letter
export const makePathArray = pathString => {
  return pathString.split("/").filter(Boolean);
};

// takes in a path array and an index i
// returns a path up to i inclusive
export const makePathString = (pathArray, i) => {
  const pathString = "/#/" + pathArray.slice(0, i + 1).join("/");
  if (pathString === "/#/courses") {
    return pathString;
  } else if (i == pathArray.length - 2) {
    return pathString + "/" + pathArray[i + 1];
  } else {
    return pathString + "/view";
  }
};

// converts timeString into desired display format
// handles conversion of UTC to local timezone automatically
export const formatTimeString = timeString => {
  const timestamp = new Date(timeString);

  const month = timestamp.getMonth() + 1;
  const date = timestamp.getDate();
  const hours = timestamp.getHours();
  const minutes = timestamp.getMinutes();

  return `${month}/${date} @ ${hours}:${minutes}`;
};

// converts a given timeString into UTC format
export const localTimeToUtc = timeString => {
  return new Date(timeString).toISOString();
};

export const utcToLocalTime = timeString => {
  const timestamp = new Date(timeString);

  const year = timestamp.getFullYear();
  const month = timestamp.getMonth() + 1;
  const date = timestamp.getDate();
  const hours = timestamp.getHours();
  const minutes = timestamp.getMinutes();

  return `${year}-${month}-${date}T${hours}:${minutes}`;
};

// sort 2 courses by their course id
// will return -1 if courseA < courseB
// 0 if courseA === courseB
// 1 if course A > courseB
export const sortCourseByCourseId = (courseA, courseB) => {
  if (courseA.course_id < courseB.course_id) return -1;
  else if (courseA.course_id === courseB.course_id) return 0;
  else return 1;
};

// sort 2 assignment groups by their total point values
// will return -1 if groupA < groupB
// 0 if groupA === groupB
// 1 if groupA > groupB
export const sortAssignmentGroupByPoints = (groupA, groupB) => {
  if (groupA.points < groupB.points) return -1;
  else if (groupA.points === groupB.points) return 0;
  else return 1;
};

// sort 2 assignments by their due dates
// will return -1 if assignmentA < assignmentB
// 0 if assignmentA === assignmentB
// 1 if assignmentA > assignmentB
export const sortAssignmentsByDueDate = (assignmentA, assignmentB) => {
  if (assignmentA.due_date < assignmentB.due_date) return -1;
  else if (assignmentA.due_date === assignmentB.due_date) return 0;
  else return 1;
};
