export const upperCaseUserFullName = (fullName: string) => {
  const name = fullName.split(' ');
  let newFullName = '';
  for (let i = 0; i < name.length; i++) {
    newFullName +=
      name[i].substring(0, 1).toUpperCase() +
      name[i].substring(1, name[i].length) +
      ' ';
  }

  return newFullName;
};
