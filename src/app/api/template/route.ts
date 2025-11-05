import { NextRequest, NextResponse } from "next/server";
import memoryStore from "@/lib/memoryStore";
import { metadata } from "@/app/layout";

interface OpacityApiResponse {
  id: string;
  url: string;
  [key: string]: any; // For any additional fields returned by the API
}

// Call the external Opacity API
const callOpacityApi = async (
  templateId: string
): Promise<OpacityApiResponse> => {
  try {
    // No longer checking for cached responses by templateId
    console.log(`Making API call for templateId: ${templateId}`);

    // Make the API call if no cached response
    const response = await fetch(`${process.env.API_URL}/app-links/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        apiKey: process.env.API_KEY,
        templateId: templateId,
        // Add any other required parameters for the Opacity API here
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `API call failed with status ${response.status}: ${JSON.stringify(
          errorData
        )}`
      );
    }

    const data = (await response.json()).data;
    const result = {
      id: data.id || `${templateId}-${Date.now()}`, // Use the ID from the API or fallback
      url: data.url || `/${templateId}-${Date.now()}`, // Use the URL from the API or fallback
      templateId, // Store the templateId explicitly
      ...data, // Include all original data from the API
    };

    // Only store by ID for simplicity
    console.log(`Storing data with key id:${result.id}`);
    memoryStore.set(`id:${result.id}`, result, 24 * 60 * 60 * 1000);

    return result;
  } catch (error) {
    console.error("Error calling Opacity API:", error);
    throw error;
  }
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { templateId } = body;

    if (!templateId) {
      return NextResponse.json(
        { error: "Template ID is required" },
        { status: 400 }
      );
    }

    // Call the external Opacity API
    const result = await callOpacityApi(templateId);

    // Return the result
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error processing template request:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
