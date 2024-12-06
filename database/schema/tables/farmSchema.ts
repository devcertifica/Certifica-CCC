import { tableSchema } from '@nozbe/watermelondb';

const farmSchema = tableSchema({
  name: 'farms', // Table name
  columns: [
    // { name: 'id', type: 'number', isIndexed: true },
    { name: 'name', type: 'string' },
    { name: 'address', type: 'string' },
    { name: 'created_at', type: 'number' },
    { name: 'updated_at', type: 'number' },
  ],
});

export default farmSchema;
