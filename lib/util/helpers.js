import logger from './logger';

const md5 = require('md5');
const moment = require('moment');

export function removeCognitoPrefix(user) {
  const prefix = 'custom:';

  const unMountedUser = Object.keys(user).reduce((accumulator, value) => {
    if (value.startsWith(prefix)) {
      const attrFixed = value.replace(prefix, '');
      accumulator[attrFixed] = user[value];
    }
    return accumulator;
  }, {});

  unMountedUser.email = user.email;
  unMountedUser.email_verified = 'true';
  if (user.birthdate) {
    unMountedUser.birthday = user.birthdate;
  }
  if (user.phone) {
    unMountedUser.phone = user.phone;
  }
  logger.info('unMountedUser', unMountedUser);
  return unMountedUser;
}

export function formattedDate(date) {
  if (date) {
    logger.info('date', date);
    return moment(date, 'DD/MM/YYYY')
      .endOf('day')
      .toDate();
  }
  return moment().toDate();
}

export function hashPassword(password, salt) {
  const passwordPrefix = md5(process.env.PASSWORD_PREFIX);
  const cryptoPassword = md5(password);
  return md5(passwordPrefix + cryptoPassword + salt);
}

export function isEmail(str) {
  // eslint-disable-next-line no-use-before-define
  const regxpr = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return regxpr.test(str);
}
