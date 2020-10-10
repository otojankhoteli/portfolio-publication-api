import {getRepository} from 'typeorm';
import {Portfolio} from '../entity/Portfolio';
import AppError from '../util/AppError';


const save = async (portfolio, user) => {
  const newEntry = {
    data: portfolio.data,
    imgUrl: portfolio.imgUrl,
    user: user.id,
  };
  return getRepository(Portfolio)
      .save(newEntry);
};


const update = async (portfolio, user) => {
  const portfolioOld = await getById(portfolio.id);

  await _checkOwnership(portfolioOld, user.id);

  portfolioOld.data = portfolio;
  portfolioOld.updateDate = new Date();
  portfolioOld.imgUrl = portfolio.imgUrl;

  return getRepository(Portfolio)
      .save(portfolioOld);
};


const getById = async (id) => {
  const portfolio = await getRepository(Portfolio).findOne(id);
  if (!portfolio) {
    throw new AppError(404, `Portfolio with id: '${id}' not found`);
  }
  return portfolio;
};


const remove = async (id, user) => {
  const portfolio = await getById(id);
  _checkOwnership(portfolio, user.id);
  return getRepository(Portfolio).delete(id);
};


const _checkOwnership = (portfolio, userId) => {
  if (portfolio.user !== userId) {
    throw new AppError(403, 'Forbidden Operation');
  }
};

export {
  save, update, remove, getById,
};
