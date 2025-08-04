package com.chatbot.springchatbot.service;

import com.chatbot.springchatbot.entity.ChatMessage;
import com.chatbot.springchatbot.entity.ChatSession;
import com.chatbot.springchatbot.repository.ChatMessageRepository;
import com.chatbot.springchatbot.repository.ChatSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ChatSessionService {
    
    @Autowired
    private ChatSessionRepository chatSessionRepository;
    
    @Autowired
    private ChatMessageRepository chatMessageRepository;
    
    public ChatSession createNewSession(String title) {
        ChatSession session = new ChatSession(title);
        return chatSessionRepository.save(session);
    }
    
    public List<ChatSession> getAllSessions() {
        return chatSessionRepository.findAllOrderByUpdatedAtDesc();
    }
    
    public Optional<ChatSession> getSessionById(Long id) {
        return chatSessionRepository.findById(id);
    }
    
    public ChatSession getSessionWithMessages(Long id) {
        return chatSessionRepository.findByIdWithMessages(id).orElse(null);
    }
    
    public ChatMessage addMessageToSession(Long sessionId, String content, ChatMessage.MessageSender sender) {
        Optional<ChatSession> sessionOpt = chatSessionRepository.findById(sessionId);
        if (sessionOpt.isPresent()) {
            ChatSession session = sessionOpt.get();
            ChatMessage message = new ChatMessage(content, sender, session);
            session.addMessage(message);
            
            // Update session title if it's the first user message
            if (sender == ChatMessage.MessageSender.USER && session.getMessages().size() == 1) {
                String title = content.length() > 50 ? content.substring(0, 50) + "..." : content;
                session.setTitle(title);
            }
            
            chatSessionRepository.save(session);
            return chatMessageRepository.save(message);
        }
        throw new RuntimeException("Session not found with id: " + sessionId);
    }
    
    public void deleteSession(Long id) {
        chatSessionRepository.deleteById(id);
    }
    
    public List<ChatMessage> getSessionMessages(Long sessionId) {
        return chatMessageRepository.findByChatSessionIdOrderByTimestamp(sessionId);
    }
}
