function isEmailMatch(email) {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
}

function isPasswordMatch(password) {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+_=[\]{}|\\:;\"'<>,.?/~`$^*#?!@%&*])[A-Za-z\d\-+_=[\]{}|\\:;\"'<>,.?/~`$^*#?!@%&*]{8,}$/;
  return passwordRegex.test(password);
}
export { isEmailMatch, isPasswordMatch };
