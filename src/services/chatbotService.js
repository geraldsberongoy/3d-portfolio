// Chatbot API Service
class ChatbotService {
  constructor() {
    // Using your deployed API endpoint
    this.baseURL = "https://chatbot-portfolio-two.vercel.app/api/v1";
  }

  async sendMessage(message) {
    try {
      const response = await fetch(`${this.baseURL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Chatbot service error:", error);

      // Throw error since the microservice has built-in fallbacks
      throw new Error(
        "Unable to connect to chatbot service. Please try again later."
      );
    }
  }

  async getHealth() {
    try {
      const response = await fetch(`${this.baseURL}/health`);
      return await response.json();
    } catch (error) {
      console.error("Health check failed:", error);
      return { status: "offline", error: error.message };
    }
  }

  // Configuration method to update API settings
  configure(config) {
    if (config.baseURL) this.baseURL = config.baseURL;
    if (config.apiKey) this.apiKey = config.apiKey;
  }
}

export const chatbotService = new ChatbotService();
export default ChatbotService;
