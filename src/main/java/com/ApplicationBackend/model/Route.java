package com.ApplicationBackend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Route {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    private String route;
    private String deliveredGoods;
    private String distance;
    private LocalDate date;  // New field for date
    private String duration; // New field for duration
    private Status status;   // New field for status

    // Enum for Status
    public enum Status {
        TELJESITETT, AKTIV, VISSZAMONDOTT
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public String getRoute() {
        return route;
    }

    public void setRoute(String route) {
        this.route = route;
    }

    public String getDeliveredGoods() {
        return deliveredGoods;
    }

    public void setDeliveredGoods(String deliveredGoods) {
        this.deliveredGoods = deliveredGoods;
    }

    public String getDistance() {
        return distance;
    }

    public void setDistance(String distance) {
        this.distance = distance;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
