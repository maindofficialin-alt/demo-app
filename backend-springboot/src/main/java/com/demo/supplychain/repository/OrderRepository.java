package com.demo.supplychain.repository;

import com.demo.supplychain.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {
    List<Order> findByRetailerId(String retailerId);
    List<Order> findByFranchiseId(String franchiseId);
}
