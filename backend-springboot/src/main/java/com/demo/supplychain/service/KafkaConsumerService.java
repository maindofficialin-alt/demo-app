package com.demo.supplychain.service;

import com.demo.supplychain.model.Order;
import com.demo.supplychain.model.OrderStatus;
import com.demo.supplychain.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumerService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private KafkaProducerService kafkaProducerService;

    @Autowired
    private RoutingService routingService;

    @KafkaListener(topics = "order-placed", groupId = "supply-chain-group")
    public void consumeOrderPlaced(String message) {
        System.out.println("Kafka digested order-placed event: " + message);
        // Deserialization and routing simulation
        // In real app, we parse the message and persist it
    }

    @KafkaListener(topics = "order-routed", groupId = "supply-chain-group")
    public void consumeOrderRouted(String message) {
        System.out.println("Kafka digested order-routed event: " + message);
    }

    @KafkaListener(topics = "order-status-update", groupId = "supply-chain-group")
    public void consumeStatusUpdate(String message) {
        System.out.println("Kafka digested order-status-update event: " + message);
    }
}
