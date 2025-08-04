# Springi - AI Chatbot Application

A modern, full-stack AI chatbot application built with Spring Boot and React, featuring a ChatGPT-like interface and persistent chat history.

![Springi Screenshot](https://via.placeholder.com/800x400/212121/ffffff?text=Springi+AI+Chatbot)

## ✨ Features

- 🤖 **AI-Powered Conversations** - Powered by Google Gemini AI
- 💬 **ChatGPT-like Interface** - Modern, responsive dark theme UI
- 💾 **Persistent Chat History** - PostgreSQL database integration
- 🗂️ **Session Management** - Create, view, and delete chat sessions
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🔄 **Real-time Messaging** - Smooth animations and loading states
- 🎨 **Professional UI** - Clean, modern design with hover effects
- 🔒 **Secure Configuration** - Environment-based configuration

## 🛠️ Tech Stack

### Backend
- **Spring Boot 3.5.4** - Java framework
- **Spring Data JPA** - Database abstraction
- **PostgreSQL** - Database
- **Spring WebFlux** - Reactive web framework
- **Google Gemini AI** - AI language model

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

## 🚀 Quick Start

### Prerequisites

- Java 17 or higher
- Node.js 18 or higher
- PostgreSQL 12 or higher
- Google AI API Key

### 1. Clone the Repository

```bash
git clone https://github.com/Harsha430/springi.git
cd springi
```

### 2. Database Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE springi;
CREATE USER springi WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE springi TO springi;
```

### 3. Environment Configuration

Create environment variables or copy the example configuration:

```bash
# Copy example configuration
cp src/main/resources/application.properties.example src/main/resources/application-local.properties
```

Set the following environment variables:

```bash
export GOOGLE_AI_API_KEY=your_google_ai_api_key
export DATABASE_URL=jdbc:postgresql://localhost:5432/springi
export DATABASE_USERNAME=springi
export DATABASE_PASSWORD=your_password
```

Or update `application-local.properties` with your values.

### 4. Backend Setup

```bash
# Run the Spring Boot application
./mvnw spring-boot:run

# Or with specific profile
./mvnw spring-boot:run -Dspring-boot.run.profiles=local
```

The backend will start on `http://localhost:8080`

### 5. Frontend Setup

```bash
# Navigate to frontend directory
cd chatbot-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will start on `http://localhost:5173`

## 📖 API Documentation

### Chat Endpoints

- `POST /chat` - Send a message and get AI response
- `GET /sessions` - Get all chat sessions
- `GET /sessions/{id}` - Get specific session with messages
- `GET /sessions/{id}/messages` - Get messages for a session
- `POST /sessions` - Create a new session
- `DELETE /sessions/{id}` - Delete a session

### Example Request

```bash
curl -X POST http://localhost:8080/chat \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Hello, how are you?", "sessionId": 1}'
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `GOOGLE_AI_API_KEY` | Google AI API key | Required |
| `DATABASE_URL` | PostgreSQL connection URL | `jdbc:postgresql://localhost:5432/springi` |
| `DATABASE_USERNAME` | Database username | `postgres` |
| `DATABASE_PASSWORD` | Database password | Required |

### Getting Google AI API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key and set it as `GOOGLE_AI_API_KEY`

## 🏗️ Project Structure

```
springi/
├── src/main/java/com/chatbot/springchatbot/
│   ├── entity/          # JPA entities
│   ├── repository/      # Data repositories
│   ├── service/         # Business logic
│   ├── ChatController.java
│   ├── GoogleAiService.java
│   └── SpringChatbotApplication.java
├── src/main/resources/
│   ├── application.properties
│   └── application.properties.example
├── chatbot-frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── App.jsx      # Main application
│   │   └── main.jsx     # Entry point
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🎨 Features in Detail

### Chat Interface
- Real-time messaging with typing indicators
- Code syntax highlighting
- Message timestamps
- Responsive design for all screen sizes

### Session Management
- Automatic session creation
- Session titles generated from first message
- Delete sessions with confirmation dialog
- Session history in sidebar

### Database Schema
- `chat_sessions` - Stores chat session metadata
- `chat_messages` - Stores individual messages with sender info

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Google Gemini AI](https://ai.google.dev/) for the AI capabilities
- [Spring Boot](https://spring.io/projects/spring-boot) for the backend framework
- [React](https://reactjs.org/) for the frontend framework
- [Tailwind CSS](https://tailwindcss.com/) for the styling system

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

Made with ❤️ by [Harsha430](https://github.com/Harsha430)
