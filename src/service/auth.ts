import {getRepository} from 'typeorm';
import {User} from '../entity/User';
import {hash, compare} from 'bcrypt';
import AppError from '../util/AppError';
import {PasswordReset} from '../entity/PasswordReset';
const crypto = require('crypto');


const IncorrectCredentialsError = new AppError(401, 'Incorrect Credentials');


const register = async (newUser) => {
  await _checkUser(newUser.username);

  newUser.password = await _generatePassword(newUser.password);

  await getRepository(User)
      .save(newUser);
};


const login = async ({
  username,
  password,
}) => {
  const user = await findByUsername(username);

  if (!user) {
    throw IncorrectCredentialsError;
  }

  await _checkPasswordMatch(password, user.password);

  return {
    username: user.username,
    password: user.password,
    mail: user.mail,
    name: user.name,
    surname: user.surname,
    imgUrl: user.imgUrl,
  };
};


const findByUsername = async (username) => {
  return getRepository(User)
      .findOne({username});
};


const findByMail = async (mail) => {
  return getRepository(User)
      .findOne({mail});
};


const update = async ({
  username,
  mail,
  name,
  surname,
  imgUrl,
}) => {
  const user = await findByUsername(username);

  if (user) {
    user.mail = mail;
    user.name = name;
    user.surname = surname;
    user.imgUrl = imgUrl;
    user.updateDate = new Date();

    return getRepository(User)
        .save(user);
  }
};


const sendResetToken = async (mail) => {
  const user = await findByMail(mail);

  function saveToken() {
    const resetToken = crypto.randomBytes(64).toString('hex');
    const expireDate = new Date(Date.now() + 1000 * 60 * 30);
    return getRepository(PasswordReset)
        .save({
          mail,
          resetToken,
          expireDate,
        });
  }

  if (user) {
    await saveToken();
    // todo send token to mail
  }
};


const resetPassword = async (resetToken, password) => {
  const resetEntry = await getRepository(PasswordReset)
      .findOne({resetToken});

  const invalidUriError = new AppError(404, 'Invalid reset link. Please request a new password again.');

  if (!resetEntry) {
    throw invalidUriError;
  }

  if (resetEntry.expireDate < new Date()) {
    await _removeResetToken(resetEntry.id);
    throw invalidUriError;
  }

  const userEntry = await findByMail(resetEntry.mail);
  await _setPassword(userEntry, password);

  await _removeResetToken(resetEntry.id);
};


const changePassword = async (user, oldPassword, newPassword) => {
  const resetEntry = await findByMail(user.mail);
  if (resetEntry) {
    await _removeResetToken(resetEntry.id);
  }

  const userEntry = await findByMail(resetEntry.mail);

  await _checkPasswordMatch(oldPassword, userEntry.password);
  await _setPassword(userEntry, newPassword);
};


const _setPassword = async (user, password) => {
  user.password = await _generatePassword(password);
  user.updateDate = new Date();

  await getRepository(User)
      .save(user);
};


const _checkUser = async (username) => {
  const user = await findByUsername(username);

  if (user) {
    throw new AppError(409, `Username '${username}' is already taken. Try another one`);
  }
};


const _checkPasswordMatch = async (plaintextPassword, hashedPassword) => {
  if (!(await compare(plaintextPassword, hashedPassword))) {
    throw IncorrectCredentialsError;
  }
};


const _generatePassword = async (plainTextPassword) => {
  return hash(plainTextPassword, 10);
};


const _removeResetToken = async (id) => {
  await getRepository(PasswordReset)
      .delete(id);
};


export {
  register, login, sendResetToken, resetPassword, changePassword, update,
};
