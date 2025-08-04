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
          <div key={index} className="my-6 bg-gray-950 border border-gray-800 rounded-xl overflow-hidden shadow-lg">
            <div className="flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-gray-800">
              <span className="text-sm font-mono text-gray-300 font-medium">{part.language}</span>
              <button
                onClick={() => copyToClipboard(part.content)}
                className="flex items-center space-x-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-sm font-medium"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
                <span className="text-gray-300">{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <pre className="p-6 text-sm text-gray-100 overflow-x-auto font-mono leading-relaxed">
              <code>{part.content}</code>
            </pre>
          </div>
        )
      } else {
        // Handle inline code in text
        const textWithInlineCode = part.content.replace(inlineCodeRegex, (match, code) => {
          return `<code class="bg-gray-800 text-blue-300 px-2 py-1 rounded-md text-sm font-mono border border-gray-700">${code}</code>`
        })

        return (
          <div
            key={index}
            className="whitespace-pre-wrap leading-relaxed text-gray-100"
            dangerouslySetInnerHTML={{ __html: textWithInlineCode }}
          />
        )
      }
    })
  }

  return (
    <div className="flex items-start space-x-4">
      <div className={`w-8 h-8 rounded-sm flex items-center justify-center text-white text-sm font-medium ${
        isUser ? 'bg-blue-600' : 'bg-accent-primary'
      }`}>
        {isUser ? 'U' : 'AI'}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-white">
          {renderContent(message.text)}
        </div>
      </div>
    </div>
  )
}

export default ChatMessage
