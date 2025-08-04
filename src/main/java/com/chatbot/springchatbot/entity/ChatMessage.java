package com.chatbot.springchatbot.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "chat_messages")
public class ChatMessage {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "content", columnDefinition = "TEXT")
    private String content;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "sender")
    private MessageSender sender;
    
    @Column(name = "timestamp")
    private LocalDateTime timestamp;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_session_id")
    @JsonBackReference
    private ChatSession chatSession;
    
    // Constructors
    public ChatMessage() {
        this.timestamp = LocalDateTime.now();
    }
    
    public ChatMessage(String content, MessageSender sender) {
        this();
        this.content = content;
        this.sender = sender;
    }
    
    public ChatMessage(String content, MessageSender sender, ChatSession chatSession) {
        this(content, sender);
        this.chatSession = chatSession;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getContent() {
        return content;
    }
    
    public void setContent(String content) {
        this.content = content;
    }
    
    public MessageSender getSender() {
        return sender;
    }
    
    public void setSender(MessageSender sender) {
        this.sender = sender;
    }
    
    public LocalDateTime getTimestamp() {
        return timestamp;
    }
    
    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
    
    public ChatSession getChatSession() {
        return chatSession;
    }
    
    public void setChatSession(ChatSession chatSession) {
        this.chatSession = chatSession;
    }
    
    // Enum for message sender
    public enum MessageSender {
        USER, ASSISTANT
    }
}
