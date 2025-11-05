/**
 * In-memory data store for API responses
 * 
 * This provides a simple way to store and retrieve data across API routes
 * without requiring an external database.
 */

// Define the structure of stored items
export interface StoredItem<T = any> {
  data: T;
  createdAt: number;
  expiresAt?: number;
}

class MemoryStore {
  private store: Map<string, StoredItem>;
  
  constructor() {
    this.store = new Map();
  }

  /**
   * Set a value in the store
   * @param key The key to store the value under
   * @param value The value to store
   * @param ttlMs Optional time-to-live in milliseconds
   */
  set<T>(key: string, value: T, ttlMs?: number): void {
    const item: StoredItem<T> = {
      data: value,
      createdAt: Date.now(),
    };
    
    if (ttlMs) {
      item.expiresAt = Date.now() + ttlMs;
    }
    
    this.store.set(key, item);
  }

  /**
   * Get a value from the store
   * @param key The key to retrieve
   * @returns The stored value or null if not found or expired
   */
  get<T>(key: string): T | null {
    const item = this.store.get(key) as StoredItem<T> | undefined;
    
    if (!item) {
      return null;
    }
    
    // Check if the item has expired
    if (item.expiresAt && item.expiresAt < Date.now()) {
      this.delete(key);
      return null;
    }
    
    return item.data;
  }

  /**
   * Delete a value from the store
   * @param key The key to delete
   * @returns true if the item was deleted, false if it didn't exist
   */
  delete(key: string): boolean {
    return this.store.delete(key);
  }

  /**
   * Get all keys in the store
   * @returns Array of keys
   */
  keys(): string[] {
    return Array.from(this.store.keys());
  }

  /**
   * Get all items in the store
   * @returns Object with all key-value pairs
   */
  getAll<T>(): Record<string, T> {
    const result: Record<string, T> = {};
    
    for (const [key, item] of this.store.entries()) {
      // Skip expired items
      if (item.expiresAt && item.expiresAt < Date.now()) {
        this.delete(key);
        continue;
      }
      
      result[key] = (item as StoredItem<T>).data;
    }
    
    return result;
  }

  /**
   * Clear all items from the store
   */
  clear(): void {
    this.store.clear();
  }

  /**
   * Clean up expired items
   * @returns Number of items removed
   */
  cleanup(): number {
    let count = 0;
    const now = Date.now();
    
    for (const [key, item] of this.store.entries()) {
      if (item.expiresAt && item.expiresAt < now) {
        this.store.delete(key);
        count++;
      }
    }
    
    return count;
  }
}

// Create a singleton instance
const memoryStore = new MemoryStore();

// Export the singleton
export default memoryStore;
