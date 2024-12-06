import { Model, Query } from '@nozbe/watermelondb';
import { children, field } from '@nozbe/watermelondb/decorators';
import Law from './Law';

export default class Season extends Model {
  static table = 'seasons';

  @field('calendar_year') calendarYear!: string; // Calendar year of the season
  @field('ra_file_source') raFileSource!: string; // File source for Rainforest Alliance
  @field('active') active!: boolean; // Indicates if the season is active

  // One-to-many relationship: A season has many laws
  @children('laws') laws!: Query<Law>; // Type-safe relationship query
}
