import {getRepository} from 'typeorm';
import {User} from '../entity/User';
import {hash, compare} from 'bcrypt';
import AppError from '../util/AppError';


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

  if (!(await compare(password, user.password))) {
    throw new AppError(401, 'Incorrect Password');
  }

  return user;
};


const findByUsername = async (username) => {
  const user = await getRepository(User)
      .findOne({username});

  if (!user) {
    throw new AppError(404, `User with ${username} not found`);
  }

  return user;
};


const update = async () => {

};

const passwordReset = async () => {

};

export {
  register, login,
};
