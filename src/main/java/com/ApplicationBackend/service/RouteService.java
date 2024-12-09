package com.ApplicationBackend.service;

import com.ApplicationBackend.model.Route;
import com.ApplicationBackend.repository.EmployeeRepository;
import com.ApplicationBackend.repository.RouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RouteService {

    private final RouteRepository routeRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    public RouteService(RouteRepository routeRepository) {
        this.routeRepository = routeRepository;
    }

    public Route addRoute(Route route) {
        // Check if employee exists before saving
        Long employeeId = route.getEmployee().getId();
        if (employeeId != null && employeeRepository.existsById(employeeId)) {
            return routeRepository.save(route);
        }
        throw new IllegalArgumentException("Invalid employee ID");
    }

    public List<Route> getRoutesByEmployeeId(Long employeeId) {
        return routeRepository.findByEmployeeId(employeeId);
    }

    public Optional<Route> getRouteById(Long id) {
        return routeRepository.findById(id);
    }

    public Route updateRoute(Long id, Route updatedRoute) {
        return routeRepository.findById(id)
                .map(existingRoute -> {
                    existingRoute.setRoute(updatedRoute.getRoute());
                    existingRoute.setDeliveredGoods(updatedRoute.getDeliveredGoods());
                    existingRoute.setDistance(updatedRoute.getDistance());
                    existingRoute.setDate(updatedRoute.getDate());
                    existingRoute.setDuration(updatedRoute.getDuration());
                    existingRoute.setStatus(updatedRoute.getStatus());
                    if (updatedRoute.getEmployee() != null) {
                        Long employeeId = updatedRoute.getEmployee().getId();
                        if (employeeId != null && employeeRepository.existsById(employeeId)) {
                            existingRoute.setEmployee(updatedRoute.getEmployee());
                        } else {
                            throw new IllegalArgumentException("Invalid employee ID");
                        }
                    }
                    return routeRepository.save(existingRoute);
                })
                .orElseThrow(() -> new IllegalArgumentException("Route not found"));
    }

    public boolean deleteRoute(Long id) {
        if (routeRepository.existsById(id)) {
            routeRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<Route> getAllRoutes() {
        return routeRepository.findAll();
    }
}
