// Note: the "@anthropic-ai/claude-code" package has been renamed
// to "@anthropic-ai/claude-agent-sdk"
import { query } from "@anthropic-ai/claude-agent-sdk";

// const prompt = "Look for duplicate queries in the ./src/queries dir";
const prompt = "Add a description to the package.json file";

// Check if API key is set
const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey) {
  console.error("Error: ANTHROPIC_API_KEY environment variable is not set");
  console.log("Please set your API key:");
  console.log("export ANTHROPIC_API_KEY='your-api-key'");
  process.exit(1);
}

try {
  for await (const message of query({
    prompt,
    options: {
      allowedTools: ["Edit"]
    }
  })) {
    console.log(JSON.stringify(message, null, 2));
  }
} catch (error) {
  console.error("Error running query:", error instanceof Error ? error.message : String(error));
  console.log("Please check your authentication and configuration.");
}

