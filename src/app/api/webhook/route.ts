import { NextRequest, NextResponse } from "next/server";
import memoryStore from "@/lib/memoryStore";


/**
 * Webhook API endpoint that receives a payload and updates the memory store
 * The payload should contain a sessionId field that matches an id in the memory store
 */
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    console.log("body", JSON.stringify(body, null, 2));
    const { sessionId, ...restOfPayload_ } = body;

    const restOfPayload = restOfPayload_ as any;

    // Validate that sessionId is provided
    if (!sessionId) {
      return NextResponse.json(
        { error: "sessionId is required in the payload" },
        { status: 400 }
      );
    }

    // Get all keys in the memory store for debugging
    const allKeys = memoryStore.keys();
    console.log("Available memory store keys:", allKeys);

    // Get the existing data from memory store
    const existingData = memoryStore.get<Record<string, any>>(
      `id:${sessionId}`
    );

    if (!existingData) {
      // Try to find any keys that might contain this sessionId
      const possibleMatches = allKeys.filter((key) => key.includes(sessionId));
      const allData = memoryStore.getAll();

      return NextResponse.json(
        {
          error: `No data found for sessionId: ${sessionId}`,
          availableKeys: allKeys,
          possibleMatches,
          suggestion:
            "Check if the ID matches exactly with what's stored in memory",
        },
        { status: 404 }
      );
    }

    console.log("restOfPayload", JSON.stringify(restOfPayload, null, 2));

    // Update the existing data with the new payload
    const updatedData = {
      ...existingData,
      payload: {
        ...((existingData.payload as Record<string, any>) || {}),
        ...restOfPayload,
        _receivedAt: new Date().toISOString(),
      },
    };

    // Store the updated data back in the memory store
    // Use the same TTL as before (24 hours from now)
    memoryStore.set(`id:${sessionId}`, updatedData, 24 * 60 * 60 * 1000);

    // No longer updating template-keyed entries

    // Return success response
    return NextResponse.json({
      success: true,
      message: `Data updated for sessionId: ${sessionId}`,
      sessionId,
    });
  } catch (error) {
    console.error("Error processing webhook:", error);
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
 * Handle OPTIONS requests for CORS preflight
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
