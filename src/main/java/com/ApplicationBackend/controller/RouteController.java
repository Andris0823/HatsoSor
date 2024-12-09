package com.ApplicationBackend.controller;

import com.ApplicationBackend.model.Route;
import com.ApplicationBackend.service.RouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/routes")
public class RouteController {
    private final RouteService routeService;

    @Autowired
    public RouteController(RouteService routeService) {
        this.routeService = routeService;
    }

    @GetMapping
    public ResponseEntity<List<Route>> getAllRoutes() {
        List<Route> routes = routeService.getAllRoutes();
        return ResponseEntity.ok(routes);
    }

    // POST: Create a new route
    @PostMapping
    public ResponseEntity<Route> createRoute(@RequestBody Route route) {
        Route savedRoute = routeService.addRoute(route);
        return new ResponseEntity<>(savedRoute, HttpStatus.CREATED);
    }

    // GET: Get all routes for an employee
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<Route>> getRoutesByEmployeeId(@PathVariable Long employeeId) {
        return ResponseEntity.ok(routeService.getRoutesByEmployeeId(employeeId));
    }

    // PUT: Update a route
    @PutMapping("/{routeId}")
    public ResponseEntity<Route> updateRoute(@PathVariable Long routeId, @RequestBody Route updatedRoute) {
        Route updated = routeService.updateRoute(routeId, updatedRoute);
        if (updated == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(updated);
    }

    // DELETE: Delete a route
    @DeleteMapping("/{routeId}")
    public ResponseEntity<Void> deleteRoute(@PathVariable Long routeId) {
        if (routeService.deleteRoute(routeId)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
