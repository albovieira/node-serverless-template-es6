import knex from 'knex';
import logger from '../../lib/util/logger';

/**
 * Conexão MYSQL.
 *
 */
export default async function connect() {
  try {
    return knex(process.env.MYSQL_DATABASE);
  } catch (error) {
    logger.error('CONNECTION ERROR', error);
    throw error;
  }
}
