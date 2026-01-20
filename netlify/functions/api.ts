import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const contacts: any[] = [];

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const path = event.path.replace("/.netlify/functions/api", "").replace("/api", "");
  const method = event.httpMethod;

  // CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Content-Type": "application/json",
  };

  // Handle preflight
  if (method === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  // POST /api/contact
  if (path === "/contact" && method === "POST") {
    try {
      const body = JSON.parse(event.body || "{}");
      const { firstName, lastName, email, organization, message } = body;

      if (!firstName || !lastName || !email || !message) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ success: false, message: "Missing required fields" }),
        };
      }

      const contact = {
        id: Date.now().toString(),
        firstName,
        lastName,
        email,
        organization: organization || null,
        message,
      };

      contacts.push(contact);

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({ success: true, message: "Contact form submitted successfully", contact }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ success: false, message: "An error occurred" }),
      };
    }
  }

  // GET /api/contacts
  if (path === "/contacts" && method === "GET") {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(contacts),
    };
  }

  return {
    statusCode: 404,
    headers,
    body: JSON.stringify({ message: "Not found" }),
  };
};

export { handler };
