import { tableSchema } from '@nozbe/watermelondb';

const seasonSchema = tableSchema({
  name: 'seasons', // Table name
  columns: [
    // { name: 'id', type: 'number', isIndexed: true }, // Unique identifier for the season
    { name: 'farm_id', type: 'number', isIndexed: true }, // Foreign key to reference the farm
    { name: 'calendar_year', type: 'string' }, // Calendar year of the season
    { name: 'ra_file_source', type: 'string' }, // File source for Rainforest Alliance files
    { name: 'active', type: 'boolean' }, // Indicates if the season is active
  ],
});

export default seasonSchema;
