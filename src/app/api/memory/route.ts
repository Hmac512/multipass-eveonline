import { NextRequest, NextResponse } from "next/server";
import memoryStore from "@/lib/memoryStore";


/**
 * GET handler to retrieve stored items
 */
export async function GET(request: NextRequest) {
  try {
    // Get the key from the URL query params
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");



    // If a specific key is provided, return just that item
    if (key) {
      const item = memoryStore.get(key);

      if (!item) {
        return NextResponse.json({ error: "Item not found" }, { status: 404 });
      }

      return NextResponse.json({ key, value: item });
    }

    // Otherwise return all items
    const allItems = memoryStore.getAll();
    return NextResponse.json(allItems);
  } catch (error) {
    console.error("Error retrieving from memory store:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * POST handler to store new items
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { key, value, ttl } = body;

    if (!key || value === undefined) {
      return NextResponse.json(
        { error: "Key and value are required" },
        { status: 400 }
      );
    }

    memoryStore.set(key, value, ttl);

    return NextResponse.json({ success: true, key, value });
  } catch (error) {
    console.error("Error storing in memory store:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE handler to remove items
 */
export async function DELETE(request: NextRequest) {
  try {
    // Get the key from the URL query params
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");

    if (!key) {
      memoryStore.clear();
      return NextResponse.json({ success: true, key });
    } else {
      const deleted = memoryStore.delete(key);

      if (!deleted) {
        memoryStore.clear();
      }
    }

    return NextResponse.json({ success: true, key });
  } catch (error) {
    console.error("Error deleting from memory store:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
