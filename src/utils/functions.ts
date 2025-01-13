// all utility functions goes here
export const calculateAge = (dob: string): string => {
  // console.log("dobage",dob)
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  // console.log("ssssage", age);
  return age.toString();
};

export const abbreviateGender = (gender: string): string => {
  const normalizedGender = gender.toLowerCase();
  if (normalizedGender === "male" || normalizedGender === "Male") {
    return "M";
  } else if (normalizedGender === "female" || normalizedGender === "Female") {
    return "F";
  } else {
    return "Other";
  }
};

export const updateNumberFormat = (value: string): string => {
    const numberValue = parseInt(value, 10);
    if (numberValue > 9) {
      return numberValue.toString();
    } else {
      return '0' + numberValue.toString();
    }
  };
