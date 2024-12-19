import { Model, Q } from '@nozbe/watermelondb';
import { database } from './database';

export class DatabaseService<T extends Model> {
  private collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  async create(item: Partial<T>): Promise<T | null> {
    try {
      const collection = database.collections.get<T>(this.collectionName);
      if (!collection) {
        console.error(`${this.collectionName} collection not found`);
        return null;
      }

      const newItem = await database.write(async () => {
        return await collection.create((record: any) => {
          Object.assign(record, item);
        });
      });

      console.log(`New item created in ${this.collectionName}:`, newItem);
      return newItem as T;
    } catch (error) {
      console.error(`Error creating item in ${this.collectionName}:`, error);
      return null;
    }
  }

  async fetchById(id: string): Promise<T | null> {
    try {
      const collection = database.collections.get<T>(this.collectionName);
      if (!collection) {
        console.error(`${this.collectionName} collection not found`);
        return null;
      }

      const item = await collection.find(id);
      if (!item) {
        console.error(`Item with id ${id} not found in ${this.collectionName}`);
        return null;
      }

      console.log(`Fetched item from ${this.collectionName}:`, item);
      return item;
    } catch (error) {
      console.error(
        `Error fetching item by id from ${this.collectionName}:`,
        error
      );
      return null;
    }
  }

  async fetchAll(): Promise<Partial<T>[]> {
    try {
      const collection = database.collections.get<T>(this.collectionName);
      if (!collection) {
        console.error(`${this.collectionName} collection not found`);
        return [];
      }

      const items = await collection.query().fetch();
      return items.map((item) => {
        // Pick only the fields from _raw that match your model's structure
        const raw = item._raw as any; // Cast to `any` to safely access fields
        const { id, ...fields } = raw;
        return {
          id,
          ...fields,
        } as Partial<T>; // Ensure the result matches `Partial<T>`
      });
    } catch (error) {
      console.error(`Error fetching items from ${this.collectionName}:`, error);
      return [];
    }
  }

  async update(id: string, updatedData: Partial<T>): Promise<T | null> {
    try {
      const collection = database.collections.get<T>(this.collectionName);
      if (!collection) {
        console.error(`${this.collectionName} collection not found`);
        return null;
      }

      const item = await collection.find(id);
      if (!item) {
        console.error(`Item with id ${id} not found in ${this.collectionName}`);
        return null;
      }

      const updatedItem = await database.write(async () => {
        return await item.update((record: any) => {
          Object.assign(record, updatedData);
        });
      });

      console.log(`Item updated in ${this.collectionName}:`, updatedItem);
      return updatedItem as T;
    } catch (error) {
      console.error(`Error updating item in ${this.collectionName}:`, error);
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const collection = database.collections.get<T>(this.collectionName);
      if (!collection) {
        console.error(`${this.collectionName} collection not found`);
        return false;
      }

      const item = await collection.find(id);
      if (!item) {
        console.error(`Item with id ${id} not found in ${this.collectionName}`);
        return false;
      }

      await database.write(async () => {
        await item.markAsDeleted(); // This marks the item as deleted
        await item.destroyPermanently(); // Use this if you want to remove it permanently
      });

      console.log(`Item deleted from ${this.collectionName}:`, id);
      return true;
    } catch (error) {
      console.error(`Error deleting item from ${this.collectionName}:`, error);
      return false;
    }
  }
}
