package com.ApplicationBackend.controller;

import org.springframework.web.bind.annotation.*;

@RestController
public class AppController {

    @GetMapping("/health")
    public String healthStatus() {
        return "Application health status: UP";
    }

    @PostMapping("/employee/{id}/add")
    public String addEmployee(@PathVariable("id") String id) {
        return "Adding a new employee: " + id;
    }

    @PutMapping("/employee/{id}/update")
    public String modifyEmployee(@PathVariable("id") String id) {
        return "Updating an existing employee: " + id;
    }

    @DeleteMapping("employee/{id}/delete")
    public String deleteEmployee(@PathVariable("id") String id) {
        return "Deleting an existing employee: " + id;
    }
}