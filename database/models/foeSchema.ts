import { tableSchema } from '@nozbe/watermelondb';

const foeSchema = tableSchema({
  name: 'users',
  columns: [
    { name: 'name', type: 'string' },
    { name: 'email', type: 'string', isIndexed: true },
    { name: 'created_at', type: 'number' }, // Timestamp
  ],
});

export default foeSchema;
