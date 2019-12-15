// takes in an email and verifies whether it's a wash u email address
// valid emails can be of format:
// 1. johndoe@wustl.edu
// 2. johndoe@email.wustl.edu
export const isWashUEmail = email => {
  return email.match(/^.+@(email.)*wustl.edu$/g);
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
