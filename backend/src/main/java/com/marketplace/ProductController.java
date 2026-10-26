package com.marketplace;

import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {
    @GetMapping
    public List<Map<String, Object>> getProducts() {
        return List.of(
            Map.of("id", 1, "name", "Wireless Headphones", "category", "Tech", "price", 1499, "emoji", "🎧", "description", "Comfortable sound for every day"),
            Map.of("id", 2, "name", "Everyday Sneakers", "category", "Fashion", "price", 1999, "emoji", "👟", "description", "Easy style, all-day comfort"),
            Map.of("id", 3, "name", "Desk Lamp", "category", "Home", "price", 899, "emoji", "💡", "description", "A little light for big ideas"),
            Map.of("id", 4, "name", "Smart Watch", "category", "Tech", "price", 2499, "emoji", "⌚", "description", "Keep your day in view"),
            Map.of("id", 5, "name", "Canvas Backpack", "category", "Fashion", "price", 1199, "emoji", "🎒", "description", "Carry your essentials"),
            Map.of("id", 6, "name", "Coffee Mug", "category", "Home", "price", 299, "emoji", "☕", "description", "Your favourite morning ritual"),
            Map.of("id", 7, "name", "Portable Speaker", "category", "Tech", "price", 1799, "emoji", "🔊", "description", "Bring music wherever you go"),
            Map.of("id", 8, "name", "Classic Cap", "category", "Fashion", "price", 499, "emoji", "🧢", "description", "A simple finishing touch")
        );
    }
}