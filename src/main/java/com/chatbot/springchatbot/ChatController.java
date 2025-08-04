package com.chatbot.springchatbot;

import com.chatbot.springchatbot.entity.ChatMessage;
import com.chatbot.springchatbot.entity.ChatSession;
import com.chatbot.springchatbot.service.ChatSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class ChatController {

    private final GoogleAiService googleAiService;

    @Autowired
    private ChatSessionService chatSessionService;

    public ChatController(GoogleAiService googleAiService) {
        this.googleAiService = googleAiService;
    }

    @PostMapping("/chat")
    public Mono<Map<String, Object>> chat(@RequestBody Map<String, Object> request) {
        String prompt = (String) request.get("prompt");
        Long sessionId = request.get("sessionId") != null ?
            Long.valueOf(request.get("sessionId").toString()) : null;

        // Create new session if none provided
        if (sessionId == null) {
            ChatSession newSession = chatSessionService.createNewSession("New Chat");
            sessionId = newSession.getId();
        }

        // Save user message
        final Long finalSessionId = sessionId;
        chatSessionService.addMessageToSession(finalSessionId, prompt, ChatMessage.MessageSender.USER);

        return googleAiService.generateContent(prompt)
                .map(response -> {
                    // Save assistant response
                    chatSessionService.addMessageToSession(finalSessionId, response, ChatMessage.MessageSender.ASSISTANT);
                    return Map.of(
                        "response", response,
                        "sessionId", finalSessionId
                    );
                });
    }

    @GetMapping("/sessions")
    public List<ChatSession> getAllSessions() {
        return chatSessionService.getAllSessions();
    }

    @GetMapping("/sessions/{id}")
    public ChatSession getSession(@PathVariable Long id) {
        return chatSessionService.getSessionWithMessages(id);
    }

    @GetMapping("/sessions/{id}/messages")
    public List<ChatMessage> getSessionMessages(@PathVariable Long id) {
        return chatSessionService.getSessionMessages(id);
    }

    @PostMapping("/sessions")
    public ChatSession createSession(@RequestBody Map<String, String> request) {
        String title = request.getOrDefault("title", "New Chat");
        return chatSessionService.createNewSession(title);
    }

    @DeleteMapping("/sessions/{id}")
    public void deleteSession(@PathVariable Long id) {
        chatSessionService.deleteSession(id);
    }
}
