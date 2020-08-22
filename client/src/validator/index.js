const required = (value, allValues, props, name) => {
  let fieldName = '';
  switch (name) {
    case 'name':
      fieldName = 'fullName';
      break;
    case 'email':
      fieldName = 'email address';
      break;
    case 'password':
      fieldName = 'password';
      break;
    case 'passwordConfirm':
      fieldName = 'password confirm';
      break;
    case 'currentPassword':
      fieldName = 'current password';
      break;
    case 'role':
      fieldName = 'a role';
      break;
    default:
      fieldName = 'name';
  }
  return value || typeof value === 'number'
    ? undefined
    : `Please ${name === 'role' ? 'select a role': 'provide your ' + fieldName}`;
};

const minLength = min => value =>
  value && value.length < min
    ? `Password must be at least ${min} characters long`
    : undefined;

const minLength7 = minLength(7);

const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Email address is invalid'
    : undefined;

const passwordsMatch = (value, allValues) =>
  value !== allValues.password ? 'Passwords are not the same' : undefined;

const twoPartValue = value => {
  const [firstPart, secondPart] = value.split(' ');
  return firstPart &&
    firstPart.length >= 1 &&
    secondPart &&
    secondPart.length >= 1
    ? undefined
    : 'Please enter both your name and lasName';
};

// const alphaNumeric = value =>
//   value && /[^a-zA-Z0-9 ]/i.test(value)
//     ? 'Your input must contain alphanumeric characters'
//     : undefined;

// const number = value =>
//   value && isNaN(Number(value)) ? 'Entered number is not valid' : undefined;

export default {
  required,
  twoPartValue,
  minLength7,
  email,
  passwordsMatch
};
