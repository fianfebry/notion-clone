export const handleName = (user: any) => {
  switch (true) {
    case Boolean(user.firstName):
      return user.firstName;
    case Boolean(user.username):
      return user.username;
    case Boolean(user.fullName):
      return user.fullName;
    default:
      return "User";
  }
};
