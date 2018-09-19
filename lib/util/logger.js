import winston from 'winston';
import { Redis } from 'winston-redis';

const REDIS_LOG_HOST = process.env.REDIS_LOG_HOST || 'localhost';
const REDIS_LOG_PORT = process.env.REDIS_LOG_PORT || 6379;
const REDIS_LOG_CONTAINER =
  process.env.REDIS_LOG_CONTAINER || 'cognit_users_management';
const REDIS_LOG_ENABLE =
  process.env.REDIS_LOG_ENABLE && process.env.REDIS_LOG_ENABLE === 'true';
const WINSTON_CONSOLE_LOG_ENABLE =
  process.env.WINSTON_CONSOLE_LOG_ENABLE &&
  process.env.WINSTON_CONSOLE_LOG_ENABLE === 'true';
const ENVIRONMENT = process.env.ENVIRONMENT || 'live';

/**
 * Configura o winston para log em console.
 */
function configureConsoleWinston() {
  winston.add(winston.transports.Console, {
    colorize: true,
    timestamp: new Date().toISOString()
  });
}

/**
 * Configura o transport do Redis
 */
function configureRedisWinston() {
  winston.add(Redis, {
    host: REDIS_LOG_HOST,
    port: REDIS_LOG_PORT,
    container: REDIS_LOG_CONTAINER,
    logstash: true,
    useNumericLevel: true,
    fixed: {
      '@source': ENVIRONMENT
    }
  });
}

winston.configure({
  level: 'verbose'
});

/* Configura o log em console do winston */
if (WINSTON_CONSOLE_LOG_ENABLE) {
  configureConsoleWinston();
}

/* Configura o log no Redis */
if (REDIS_LOG_ENABLE) {
  configureRedisWinston();
}

export default winston;
