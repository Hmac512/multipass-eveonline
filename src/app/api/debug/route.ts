import { NextRequest, NextResponse } from 'next/server';
import memoryStore from '@/lib/memoryStore';

/**
 * Debug endpoint to view all data in the memory store
 */
export async function GET(request: NextRequest) {
  try {
    // Get all keys in the memory store
    const allKeys = memoryStore.keys();
    
    // Get all data in the memory store
    const allData = memoryStore.getAll();
    
    // Return the data
    return NextResponse.json({
      keys: allKeys,
      data: allData,
      keyCount: allKeys.length,
      memoryStoreInfo: {
        type: 'In-memory store',
        persistent: false,
        ttlSupport: true
      }
    });
  } catch (error) {
    console.error('Error retrieving debug data:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
