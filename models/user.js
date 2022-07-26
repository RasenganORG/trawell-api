class User {
  constructor(
    id,
    firstName,
    lastName,
    email,
    birthdate,
    phoneNumber,
    password,
  ) {
    this.id = id;
    this.firstName = firstName
    this.lastName = lastName
    this.email = email;
    this.birthdate = birthdate
    this.phoneNumber = phoneNumber
    this.password = password;
  }
}

module.exports = User;
