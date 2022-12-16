import { Schedule } from '../scheduling/entities';
import 'reflect-metadata';
import { User } from '../user/entities';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { schedulesFactory, UsersFactory } from './factories';
import MainSeeder from './main.seeder';

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '19126222',
  database: 'test',
  entities: [User, Schedule],
  factories: [UsersFactory, schedulesFactory],
  seeds: [MainSeeder],
};

const dataSource = new DataSource(options);

dataSource.initialize().then(async () => {
  await dataSource.synchronize(true);
  await runSeeders(dataSource);
  process.exit();
});
