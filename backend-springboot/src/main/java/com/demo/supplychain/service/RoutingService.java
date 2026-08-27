package com.demo.supplychain.service;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class RoutingService {
    
    private final Map<String, String> routingMap = new HashMap<>();

    public RoutingService() {
        routingMap.put("retailer_east", "franchise_east_01");
        routingMap.put("retailer_west", "franchise_west_01");
        routingMap.put("retailer_south", "franchise_south_01");
    }

    public String routeOrder(String retailerId) {
        return routingMap.getOrDefault(retailerId, "franchise_east_01");
    }
}
