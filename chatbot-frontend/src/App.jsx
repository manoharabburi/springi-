import { useState, useRef, useEffect } from 'react'
import { Send, Plus, Menu, X, MessageSquare, Settings, User, Trash2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ChatMessage from './components/ChatMessage'
import WelcomeScreen from './components/WelcomeScreen'

function App() {
  const [messages, setMessages] = useState([])
  const [showWelcome, setShowWelcome] = useState(true)
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentSessionId, setCurrentSessionId] = useState(null)
  const [sessions, setSessions] = useState([])
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    loadSessions()
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && deleteConfirm) {
        cancelDelete()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [deleteConfirm])

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion)
    setShowWelcome(false)
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const startNewChat = () => {
    setMessages([])
    setShowWelcome(true)
    setInputMessage('')
    setCurrentSessionId(null)
  }

  const loadSessions = async () => {
    try {
      const response = await fetch('http://localhost:8080/sessions')
      if (response.ok) {
        const sessionsData = await response.json()
        setSessions(sessionsData)
      }
    } catch (error) {
      console.error('Error loading sessions:', error)
    }
  }

  const loadSession = async (sessionId) => {
    try {
      const response = await fetch(`http://localhost:8080/sessions/${sessionId}/messages`)
      if (response.ok) {
        const messagesData = await response.json()
        const formattedMessages = messagesData.map(msg => ({
          id: msg.id,
          text: msg.content,
          sender: msg.sender.toLowerCase(),
          timestamp: new Date(msg.timestamp)
        }))
        setMessages(formattedMessages)
        setCurrentSessionId(sessionId)
        setShowWelcome(false)
      }
    } catch (error) {
      console.error('Error loading session:', error)
    }
  }

  const handleDeleteClick = (sessionId, event) => {
    event.stopPropagation() // Prevent triggering loadSession
    setDeleteConfirm(sessionId)
  }

  const confirmDelete = async () => {
    if (!deleteConfirm) return

    try {
      const response = await fetch(`http://localhost:8080/sessions/${deleteConfirm}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        // Remove session from local state
        setSessions(prev => prev.filter(session => session.id !== deleteConfirm))

        // If we're currently viewing the deleted session, start a new chat
        if (currentSessionId === deleteConfirm) {
          startNewChat()
        }
      }
    } catch (error) {
      console.error('Error deleting session:', error)
    } finally {
      setDeleteConfirm(null)
    }
  }

  const cancelDelete = () => {
    setDeleteConfirm(null)
  }

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    setShowWelcome(false)

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    const currentPrompt = inputMessage
    setInputMessage('')
    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:8080/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: currentPrompt,
          sessionId: currentSessionId
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()

      // Update current session ID if it's a new session
      if (data.sessionId && !currentSessionId) {
        setCurrentSessionId(data.sessionId)
        loadSessions() // Refresh sessions list
      }

      const botMessage = {
        id: Date.now() + 1,
        text: data.response,
        sender: 'bot',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: "I apologize, but I'm having trouble connecting to the server right now. Please try again in a moment.",
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="h-screen bg-dark-primary flex overflow-hidden">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-64 bg-dark-sidebar flex flex-col fixed lg:relative h-full z-50"
          >
            {/* New Chat Button */}
            <div className="p-3">
              <button
                onClick={startNewChat}
                className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-md border border-gray-600 hover:bg-gray-700 transition-colors text-sm"
              >
                <Plus className="w-4 h-4 text-white" />
                <span className="text-white">New chat</span>
              </button>
            </div>

            {/* Chat History */}
            <div className="flex-1 px-3 pb-3 overflow-y-auto">
              <div className="text-xs text-gray-400 mb-2 px-3">Recent</div>
              <div className="space-y-1">
                {sessions.length > 0 ? (
                  sessions.map((session) => (
                    <div
                      key={session.id}
                      className={`group relative flex items-center px-3 py-2 rounded-md text-sm hover:bg-gray-700 transition-colors cursor-pointer ${
                        currentSessionId === session.id ? 'bg-gray-700' : ''
                      }`}
                      onClick={() => loadSession(session.id)}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="text-white truncate">
                          {session.title || 'New Chat'}
                        </div>
                        <div className="text-xs text-gray-400">
                          {new Date(session.updatedAt).toLocaleDateString()}
                        </div>
                      </div>

                      {/* Delete button - shows on hover */}
                      <button
                        onClick={(e) => handleDeleteClick(session.id, e)}
                        className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-gray-600 rounded transition-all duration-200 ml-2"
                        title="Delete chat"
                      >
                        <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-400 px-3 py-2">No recent chats</div>
                )}
              </div>
            </div>

            {/* Bottom Section */}
            <div className="p-3 border-t border-gray-600">
              <div className="flex items-center space-x-3 px-3 py-2 hover:bg-gray-700 rounded-md cursor-pointer">
                <div className="w-6 h-6 bg-gray-600 rounded-sm flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-300" />
                </div>
                <span className="text-sm text-white">User</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-600 bg-dark-chat">
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleSidebar}
              className="p-1.5 hover:bg-gray-700 rounded-md transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-300" />
            </button>
            <h1 className="text-lg font-medium text-white">Springi</h1>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-400">Online</span>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {showWelcome && messages.length === 0 ? (
            <div className="flex-1 overflow-y-auto bg-dark-chat">
              <WelcomeScreen onSuggestionClick={handleSuggestionClick} />
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`border-b border-gray-600 ${
                    message.sender === 'user' ? 'bg-dark-chat' : 'bg-message-ai'
                  }`}
                >
                  <div className="max-w-3xl mx-auto px-4 py-6">
                    <ChatMessage message={message} />
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="bg-message-ai border-b border-gray-600">
                  <div className="max-w-3xl mx-auto px-4 py-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 rounded-sm bg-accent-primary flex items-center justify-center text-white text-sm font-medium">
                        AI
                      </div>
                      <div className="flex space-x-1 mt-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Input Area */}
          <div className="border-t border-gray-600 bg-dark-chat p-4">
            <div className="max-w-3xl mx-auto">
              <div className="relative flex items-end space-x-3">
                <div className="flex-1 relative">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Send a message..."
                    className="w-full p-3 pr-12 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-gray-500 resize-none text-white placeholder-gray-400 text-sm"
                    rows="1"
                    style={{ minHeight: '44px', maxHeight: '200px' }}
                    disabled={isLoading}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="absolute right-2 bottom-2 p-1.5 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="text-xs text-gray-500 text-center mt-2">
                Springi can make mistakes. Consider verifying important information.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Delete Confirmation Dialog */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-gray-800 rounded-lg p-6 max-w-md w-full border border-gray-700"
            >
              <h3 className="text-lg font-semibold text-white mb-2">Delete chat?</h3>
              <p className="text-gray-400 mb-6">
                This will delete the chat and all its messages. This action cannot be undone.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={cancelDelete}
                  className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
