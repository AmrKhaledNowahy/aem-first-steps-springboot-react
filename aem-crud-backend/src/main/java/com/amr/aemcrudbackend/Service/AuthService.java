package com.amr.aemcrudbackend.Service;

import Request.LoginRequest;
import Request.RegisterUserRequest;
import com.amr.aemcrudbackend.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private UserService userService;

    public String login(LoginRequest request) {
        var authenticated = userService.authenticate(request);
        if (!authenticated) {
            throw new RuntimeException("Authentication Failed!");
        }
        // If authentication is successful, generate a JWT
        return JwtUtil.generateToken(request.getUsername());
    }

    public String register(RegisterUserRequest request) throws Exception {
        userService.setUsersList(request);
        return null;
    }
}
