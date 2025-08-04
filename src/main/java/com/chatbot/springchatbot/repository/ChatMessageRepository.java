package com.chatbot.springchatbot.repository;

import com.chatbot.springchatbot.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    
    @Query("SELECT cm FROM ChatMessage cm WHERE cm.chatSession.id = :sessionId ORDER BY cm.timestamp ASC")
    List<ChatMessage> findByChatSessionIdOrderByTimestamp(Long sessionId);
}
