import { DataSource, DataSourceOptions } from 'typeorm';
import { typeOrmModuleOptions } from './type-orm.module-options';

const typeOrmDataSource = new DataSource(
  typeOrmModuleOptions as DataSourceOptions,
);

// noinspection JSUnusedGlobalSymbols
export default typeOrmDataSource;
