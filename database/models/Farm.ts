import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export default class Farm extends Model {
  static table = 'farms'; // Table name should match schema

  @field('name') name!: string; // Farm name
  @field('address') address!: string; // Farm address
}
