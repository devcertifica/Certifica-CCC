import { tableSchema } from '@nozbe/watermelondb';

const lawSchema = tableSchema({
  name: 'laws', // Table name
  columns: [
    { name: 'id', type: 'number', isIndexed: true }, // Unique identifier for the law
    { name: 'type', type: 'string' }, // Type of law (e.g., CORE, MAN_SMRT_METER_0)
    { name: 'number', type: 'string' }, // Law number (e.g., "1.1.1")
    { name: 'requirement', type: 'string' }, // The requirement text of the law
    { name: 'status', type: 'boolean' }, // Status (true/false)
    { name: 'findings', type: 'string', isOptional: true }, // Findings (nullable)
    { name: 'action', type: 'string', isOptional: true }, // Actions (nullable)
    { name: 'responsible', type: 'string', isOptional: true }, // Responsible person/entity (nullable)
    { name: 'deadline', type: 'string', isOptional: true }, // Deadline (nullable, ideally ISO 8601 date)
    { name: 'detail_pdf_source', type: 'string', isOptional: true }, // PDF source URL or path (nullable)
    { name: 'last_update', type: 'string', isOptional: true }, // Last update timestamp (nullable, ideally ISO 8601 date)
    { name: 'season_id', type: 'number', isIndexed: true }, // Foreign key to reference seasons
  ],
});

export default lawSchema;
