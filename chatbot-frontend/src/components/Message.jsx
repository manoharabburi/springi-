import { motion } from 'framer-motion'
import { Copy, Check } from 'lucide-react'
import { useState } from 'react'

const ChatMessage = ({ message }) => {
  const isUser = message.sender === 'user'
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const renderContent = (text) => {
    // Simple code block detection
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g
    const inlineCodeRegex = /`([^`]+)`/g

    let parts = []
    let lastIndex = 0
    let match

    // Handle code blocks
    while ((match = codeBlockRegex.exec(text)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: text.slice(lastIndex, match.index)
        })
      }

      // Add code block
      parts.push({
        type: 'codeblock',
        language: match[1] || 'text',
        content: match[2].trim()
      })

      lastIndex = match.index + match[0].length
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push({
        type: 'text',
        content: text.slice(lastIndex)
      })
    }

    return parts.map((part, index) => {
      if (part.type === 'codeblock') {
        return (
          <div key={index} className="my-4 bg-gray-900 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800 text-gray-300 text-sm">
              <span>{part.language}</span>
              <button
                onClick={() => copyToClipboard(part.content)}
                className="flex items-center space-x-1 hover:text-white transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <pre className="p-4 text-sm text-gray-100 overflow-x-auto">
              <code>{part.content}</code>
            </pre>
          </div>
        )
      } else {
        // Handle inline code in text
        const textWithInlineCode = part.content.replace(inlineCodeRegex, (match, code) => {
          return `<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">${code}</code>`
        })

        return (
          <div
            key={index}
            className="whitespace-pre-wrap leading-relaxed"
            dangerouslySetInnerHTML={{ __html: textWithInlineCode }}
          />
        )
      }
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6"
    >
      <div className="flex items-start space-x-4">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
          isUser ? 'bg-blue-500' : 'bg-green-500'
        }`}>
          {isUser ? 'You' : 'AI'}
        </div>
        <div className="flex-1 min-w-0">
          <div className={`${isUser ? 'bg-gray-100' : 'bg-white'} rounded-lg px-4 py-3`}>
            {renderContent(message.text)}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ChatMessage
