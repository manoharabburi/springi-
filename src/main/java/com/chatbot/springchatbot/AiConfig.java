package com.chatbot.springchatbot;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class AiConfig {

    @Bean
    public WebClient webClient() {
        return WebClient.builder()
                .baseUrl("https://generativelanguage.googleapis.com")
                .build();
    }

    @Bean
    public GoogleAiService googleAiService(WebClient webClient, @Value("${google.ai.api-key}") String apiKey) {
        return new GoogleAiService(webClient, apiKey);
    }
}
