export default function loginValidate(values) {
  const errors = {};

  // Validate email field
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  // Validate password field
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8) {
    errors.password = "Must be greater than 8 characters";
  } else if (values.password.length > 20) {
    errors.password = "Must be less than 20 characters";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid password";
  }

  return errors;
}

export function registerValidate(values) {
  const errors = {};

  // Validate name field
  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.includes(" ")) {
    errors.name = "Invalid name. No space";
  } else if (values.name.length <= 2) {
    errors.name = "Invalid name"
  }
   else if (values.name.toLowerCase().includes("test")) {
    errors.name = `Write your real first name instead of ${values.name})`;
  }

  // Validate email field
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  // Validate password field
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8) {
    errors.password = "Must be greater than 8 characters";
  } else if (values.password.length > 20) {
    errors.password = "Must be less than 20 characters";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid password";
  }

  // Validate confirmPassword field
  if (!values.confirmPassword) {
    errors.confirmPassword = "Required";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Password does not match";
  } else if (values.confirmPassword.includes(" ")) {
    errors.confirmPassword = "Invalid password";
  }

  return errors;
}
