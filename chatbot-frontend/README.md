# AI Chatbot Frontend

A beautiful, modern React frontend for the AI Chatbot powered by Google Gemini.

## Features

✨ **Beautiful UI/UX**
- Modern gradient design with glassmorphism effects
- Smooth animations and transitions using Framer Motion
- Responsive design that works on all devices
- Custom loading animations and micro-interactions

🎨 **Design Elements**
- Tailwind CSS 3 for styling
- Custom color palette with gradients
- Lucide React icons for consistent iconography
- Inter font for modern typography

🚀 **Functionality**
- Real-time chat interface
- Message history with timestamps
- Loading states and error handling
- Auto-scroll to latest messages
- Keyboard shortcuts (Enter to send)

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS 3** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful icons

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Backend Connection

Make sure your Spring Boot backend is running on `http://localhost:8080` for the chat functionality to work.

## Project Structure

```
src/
├── components/
│   ├── Message.jsx          # Individual message component
│   └── LoadingDots.jsx      # Loading animation component
├── App.jsx                  # Main application component
├── index.css               # Global styles and Tailwind imports
└── main.jsx                # Application entry point
```

## Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.
