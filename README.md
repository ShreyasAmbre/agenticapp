# 🛒 Fruit Ecommerce AI Chatbot
Welcome to the Fruit Ecommerce AI Chatbot project! 🍇🍉🍍

This project is a modern, intelligent chatbot system for a fruit-based ecommerce website. It enhances the shopping experience by helping customers explore products, answer their queries, and even add products directly to their cart — powered by Vertex AI through Firebase.

### 🚀 Project Overview
- AI Agent integrated with Vertex AI (Gemini 2.0 Flash model) to simulate a friendly shopping assistant.

- Real-time chat system where users can send prompts and receive intelligent replies.
- Tools integration allowing the AI to:

- Fetch product details.
- Get inventory statistics.
- Add products directly into the shopping cart.

- Responsive, Premium UI using gradient purple themes for a luxurious, ecommerce-focused design.

- Standalone Angular Component Architecture for highly maintainable and modular code.

- Signal-based State Management in Angular for chat history and product data handling.

- Firebase App and Vertex AI SDK for seamless AI communication.

### 📂 Features
- Interactive AI Chat

- Welcoming header: "Hi, I am your Fruit Store Assistant!"

- Natural conversation experience.

- Product Inventory Handling

- List available fruits.

- Show product counts.

- Add selected fruits to the shopping cart.

- Cart Management

- View added items.

- Dynamic total price updates.

- Modern UI/UX

- Gradient-themed chatbot design.

- Responsive input and message layouts.

### Firebase Integration

1. Vertex AI API integration for intelligent agent responses.

2. 🛠️ Tech Stack
Angular 18+ (with standalone components)

3. Firebase (Vertex AI integration)

4. Vertex AI SDK (Generative Model + Tools API)

5. RxJS Signals (for reactive state management)

6. Bootstrap 5 (for responsive design)

7. TypeScript (strong typing and clean structure)

### 📖 How It Works
#### User Interaction:
- A user types a message/question in the chatbox.

#### AI Handling:
- The prompt is sent to Vertex AI (Gemini model).
If the AI model detects a tool-based task (like getting products or adding to cart), it triggers a function call.

#### Tool Execution:
- The application captures the function call:

- Fetches product information.

- Adds selected product to the shopping cart.

- Replies back with a success message.

## Important Guideline 
1. Firebase Prject and APP Console Dashboard URL 
=> https://console.firebase.google.com/u/0/project/agentic-vertexai-app/genai/vertex
2. Firebase Gemeni Vertex AI Agent Integration Docs
=> https://firebase.google.com/docs/vertex-ai/get-started?platform=web&hl=en&authuser=0&_gl=1*t97x0q*_ga*MTMxNTc2MjA2NC4xNzQ1NTg2NzEw*_ga_CW55HF8NVT*MTc0NTY0NDk4NC4zLjEuMTc0NTY0NjM3OC4yMS4wLjA.#add-sdk
3. Examples of Prompts
=> Hi
=> How many available products
=> List down all products
=> Add all the items less then 20 rupees
=> Get products from cart
