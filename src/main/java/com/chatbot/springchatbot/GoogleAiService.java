package com.chatbot.springchatbot;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@Service
public class GoogleAiService {

    private final WebClient webClient;
    private final String apiKey;

    public GoogleAiService(WebClient webClient, String apiKey) {
        this.webClient = webClient;
        this.apiKey = apiKey;
    }

    public Mono<String> generateContent(String prompt) {
        Map<String, Object> requestBody = Map.of(
            "contents", List.of(
                Map.of("parts", List.of(
                    Map.of("text", prompt)
                ))
            )
        );

        return webClient.post()
                .uri("/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(Map.class)
                .map(this::extractTextFromResponse);
    }

    private String extractTextFromResponse(Map<String, Object> response) {
        try {
            List<Map<String, Object>> candidates = (List<Map<String, Object>>) response.get("candidates");
            if (candidates != null && !candidates.isEmpty()) {
                Map<String, Object> content = (Map<String, Object>) candidates.get(0).get("content");
                if (content != null) {
                    List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");
                    if (parts != null && !parts.isEmpty()) {
                        String text = (String) parts.get(0).get("text");
                        // Clean up the response by removing <EOL> markers and replacing with actual newlines
                        return text != null ? text.replace("<EOL>", "\n").trim() : "No response generated";
                    }
                }
            }
        } catch (Exception e) {
            return "Error parsing response: " + e.getMessage();
        }
        return "No response generated";
    }
}
