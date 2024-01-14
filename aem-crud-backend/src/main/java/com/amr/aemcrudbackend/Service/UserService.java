package com.amr.aemcrudbackend.Service;

import com.amr.aemcrudbackend.Entity.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class UserService {

    public static List<User> usersList = new ArrayList<>();

    public void setUsersList(String addition) throws Exception {
        if (addition == null)
            throw new Exception("Null Value");

        usersList.add(User.builder()
                .id(UUID.randomUUID())
                .name(addition)
                .email(addition + "@domain.com.sa")
                .build());
    }

    public List<User> getUsersList() {
        return usersList;
    }

    public void deleteUser(String deletedUser) throws Exception {
        if (deletedUser == null)
            throw new Exception("Null Value");

        usersList.removeIf(s -> s.getName().equals(deletedUser));
    }
}
