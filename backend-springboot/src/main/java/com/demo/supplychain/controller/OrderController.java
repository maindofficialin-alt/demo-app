package com.demo.supplychain.controller;

import com.demo.supplychain.model.Order;
import com.demo.supplychain.model.OrderStatus;
import com.demo.supplychain.repository.OrderRepository;
import com.demo.supplychain.service.KafkaProducerService;
import com.demo.supplychain.service.RoutingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private KafkaProducerService kafkaProducerService;

    @Autowired
    private RoutingService routingService;

    @PostMapping
    @PreAuthorize("hasRole('RETAILER')")
    public ResponseEntity<Order> placeOrder(@RequestBody Order order) {
        String franchiseId = routingService.routeOrder(order.getRetailerId());
        order.setFranchiseId(franchiseId);
        order.setStatus(OrderStatus.Placed);
        Order savedOrder = orderRepository.save(order);
        
        // Publish order placed event to Kafka
        kafkaProducerService.sendMessage("order-placed", savedOrder.getId(), "Order placed by: " + order.getRetailerId());
        
        return ResponseEntity.ok(savedOrder);
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('FRANCHISE') or hasRole('ADMIN')")
    public ResponseEntity<Order> updateStatus(@PathVariable String id, @RequestParam OrderStatus status) {
        Optional<Order> optionalOrder = orderRepository.findById(id);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            order.setStatus(status);
            Order updatedOrder = orderRepository.save(order);
            
            // Send update to Kafka
            kafkaProducerService.sendMessage("order-status-update", id, "Status updated to: " + status);
            return ResponseEntity.ok(updatedOrder);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderRepository.findAll());
    }

    @GetMapping("/retailer/{retailerId}")
    @PreAuthorize("hasRole('RETAILER') and #retailerId == authentication.name")
    public ResponseEntity<List<Order>> getRetailerOrders(@PathVariable String retailerId) {
        return ResponseEntity.ok(orderRepository.findByRetailerId(retailerId));
    }

    @GetMapping("/franchise/{franchiseId}")
    @PreAuthorize("hasRole('FRANCHISE')")
    public ResponseEntity<List<Order>> getFranchiseOrders(@PathVariable String franchiseId) {
        return ResponseEntity.ok(orderRepository.findByFranchiseId(franchiseId));
    }
}
