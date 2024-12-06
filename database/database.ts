import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import Farm from './models/Farm';
import Law from './models/Law';
import Season from './models/Season';
import { schema } from './schema/appSchema';

const adapter = new SQLiteAdapter({
  schema,
  dbName: 'certifica_mobile',
  jsi: true,
});

const database = new Database({
  adapter,
  modelClasses: [Farm, Law, Season],
});

export { database };
