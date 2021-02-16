import config from './configuration';

const { type, host, port, username, password, database } = config.typeorm.db;
const { synchronize, logging, autoLoadEntities } = config.typeorm;

export const typeOrmConfig = {
  type,
  host,
  port,
  username,
  password,
  database,
  // entities: [__dirname + '/../**/*.entity.{js, ts}'],
  logging,
  synchronize,
  autoLoadEntities,
};
