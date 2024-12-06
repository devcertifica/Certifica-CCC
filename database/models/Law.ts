import { Model } from '@nozbe/watermelondb';
import { field, relation } from '@nozbe/watermelondb/decorators';
import Season from './Season';

export default class Law extends Model {
  static table = 'laws'; // Table name in the schema

  @field('type') type!: string; // Type of law (e.g., CORE, MAN_SMRT_METER_0)
  @field('number') number!: string; // Law number (e.g., "1.1.1")
  @field('requirement') requirement!: string; // Requirement text
  @field('status') status!: boolean; // Status (true/false)
  @field('findings') findings!: string | null; // Nullable findings
  @field('action') action!: string | null; // Nullable actions
  @field('responsible') responsible!: string | null; // Nullable responsible entity
  @field('deadline') deadline!: string | null; // Nullable deadline, ideally in ISO 8601 format
  @field('detail_pdf_source') detailPdfSource!: string | null; // Nullable PDF source
  @field('last_update') lastUpdate!: string | null; // Nullable last update timestamp in ISO 8601 format

  // Relation: A law belongs to a season
  @relation('seasons', 'season_id') season!: Season; // Reference to the associated Season
}
