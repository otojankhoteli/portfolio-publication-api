import {getRepository} from 'typeorm';
import {User} from '../entity/User';
import {hash, compare} from 'bcrypt';
import AppError from '../util/AppError';
import {PasswordReset} from '../entity/PasswordReset';
const crypto = require('crypto');


const register = async (newUser) => {
  await _checkUser(newUser.username);

  newUser.password = await _generatePassword(newUser.password);

  await getRepository(User)
      .save(newUser);
};


const _checkUser = async (username) => {
  const user = await findByUsername(username);

  if (user) {
    throw new Error(`Username '${username}' is already taken. Try another one`);
  }
};


const _generatePassword = async (plainTextPassword) => {
  return hash(plainTextPassword, 10);
};


const login = async ({
  username,
  password,
}) => {
  const user = await findByUsername(username);

  if (!user) {
    throw new AppError(404, `User with ${username} not found`);
  }

  if (!(await compare(password, user.password))) {
    throw new AppError(401, 'Incorrect Password');
  }

  return user;
};


const findByUsername = async (username) => {
  return getRepository(User)
      .findOne({username});
};


const findByMail = async (mail) => {
  return getRepository(User)
      .findOne({mail});
};


const update = async () => {

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
    // todo token with mail
  }
};

const resetPassword = async (resetToken, password) => {
  const resetEntry = await getRepository(PasswordReset)
      .findOne({resetToken});

  const invalidUriError = new AppError(404, 'Invalid reset link. Please request a new password again.');

  if (!resetEntry) {
    throw invalidUriError;
  }

  async function removeResetToken() {
    await getRepository(PasswordReset)
        .delete(resetEntry.id);
  }

  if (resetEntry.expireDate < new Date()) {
    await removeResetToken();
    throw invalidUriError;
  }

  const userEntry = await findByMail(resetEntry.mail);
  userEntry.password = await _generatePassword(password);
  userEntry.updateDate = new Date();

  await getRepository(User)
      .save(userEntry);

  await removeResetToken();
};

export {
  register, login, sendResetToken, resetPassword,
};
