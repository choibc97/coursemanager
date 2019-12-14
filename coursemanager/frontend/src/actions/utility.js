// takes in an email and verifies whether it's a wash u email address
// valid emails can be of format:
// 1. johndoe@wustl.edu
// 2. johndoe@email.wustl.edu
export const isWashUEmail = email => {
  return email.match(/^.+@(email.)*wustl.edu$/g);
};
