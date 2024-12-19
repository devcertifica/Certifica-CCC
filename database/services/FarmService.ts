import { DatabaseService } from '@/database/service';
import { Model } from '@nozbe/watermelondb';

class Farm extends Model {
  static table = 'farms';
  name!: string;
  address!: string;
}

export const farmService = new DatabaseService<Farm>('farms');

// // Create a new farm
// farmService.create({ name: 'New Farm', address: '1234 Farm Road' });

// // Fetch all farms
// farmService.fetchAll().then((farms) => console.log('Farms:', farms));

// // Update a farm
// farmService.update('farm-id', { name: 'Updated Farm Name' });

// // Delete a farm
// farmService.delete('farm-id');
