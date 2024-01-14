package com.amr.aemcrudbackend.Controller;

import Request.SimpleStringRequest;
import com.amr.aemcrudbackend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(maxAge = 3600)
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService service;

    @GetMapping
    public ResponseEntity<?> getUsers(){
        return ResponseEntity.ok(service.getUsersList());
    }

    @PostMapping
    public ResponseEntity<?> addUser(@RequestBody SimpleStringRequest request) throws Exception {
        service.setUsersList(request.getPayload());
        return ResponseEntity.noContent().build();

    }

    @DeleteMapping
    public ResponseEntity<?> deleteUser(@RequestBody SimpleStringRequest request) throws Exception {
        service.deleteUser(request.getPayload());
        return ResponseEntity.noContent().build();
    }
}
