import { motion } from 'framer-motion'
import { Code, FileText, Music, Lightbulb, Sparkles, Zap } from 'lucide-react'

const WelcomeScreen = ({ onSuggestionClick }) => {
  const suggestions = [
    {
      icon: Code,
      title: "Write code",
      description: "Create a React component with hooks",
      prompt: "Create a React component that fetches data from an API and displays it in a table with loading states"
    },
    {
      icon: FileText,
      title: "Write content",
      description: "Draft an email or article",
      prompt: "Write a professional email to a client explaining a project delay and proposing solutions"
    },
    {
      icon: Music,
      title: "Creative writing",
      description: "Write a song or poem",
      prompt: "Write a motivational song about overcoming challenges and achieving dreams"
    },
    {
      icon: Lightbulb,
      title: "Brainstorm ideas",
      description: "Generate creative solutions",
      prompt: "Brainstorm 10 innovative app ideas for improving remote work productivity"
    }
  ]

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-accent-primary rounded-lg flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            How can I help you today?
          </h1>
          <p className="text-lg text-gray-400">
            I'm Springi, your AI assistant powered by Spring Boot and Google Gemini. I can help you write code, create content, brainstorm ideas, and much more.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {suggestions.map((suggestion, index) => (
            <motion.button
              key={index}
              onClick={() => onSuggestionClick(suggestion.prompt)}
              className="p-6 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 transition-all duration-200 text-left group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-gray-600 rounded-lg group-hover:bg-gray-500 transition-colors">
                  <suggestion.icon className="w-5 h-5 text-gray-300" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1">
                    {suggestion.title}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {suggestion.description}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <Zap className="w-4 h-4" />
            <span>Powered by Google Gemini</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default WelcomeScreen
