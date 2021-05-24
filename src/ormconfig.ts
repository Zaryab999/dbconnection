import {ConnectionOptions} from 'typeorm'; 
const ormconfig:ConnectionOptions={
    type: 'mssql',
    host: 'localhost',
    port:1433,
    username: 'user1',
    password: '1234',
    database: 'ec',
    entities: ['./dist/**/entities/*.entity{.ts,.js}'],
    synchronize: false,

};
export=ormconfig

