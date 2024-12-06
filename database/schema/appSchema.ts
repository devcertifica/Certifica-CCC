import { appSchema } from '@nozbe/watermelondb';
import farmSchema from './tables/farmSchema';
import foeSchema from './tables/foeSchema';
import lawSchema from './tables/lawSchema';
import ldeSchema from './tables/ldeSchema';
import seasonSchema from './tables/seasonSchema';

export const schema = appSchema({
  version: 1,
  tables: [farmSchema, seasonSchema, lawSchema, ldeSchema, foeSchema],
});
