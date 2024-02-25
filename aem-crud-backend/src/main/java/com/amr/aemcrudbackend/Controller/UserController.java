package com.amr.aemcrudbackend.Controller;

import Request.RegisterUserRequest;
import Request.SimpleStringRequest;
import com.amr.aemcrudbackend.Service.UserService;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(maxAge = 3600)
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService service;

    @GetMapping("/users")
    public ResponseEntity<?> getUsers(){
        return ResponseEntity.ok(service.getUsersList());
    }

    @PostMapping("user")
    @RolesAllowed("ADMIN")
    public ResponseEntity<?> addUser(@RequestBody RegisterUserRequest request) throws Exception {
       return ResponseEntity.ok(service.setUsersList(request));
    }

    @DeleteMapping("user")
    public ResponseEntity<?> deleteUser(@RequestBody SimpleStringRequest request) throws Exception {
        service.deleteUser(request.getPayload());
        return ResponseEntity.noContent().build();
    }
}
