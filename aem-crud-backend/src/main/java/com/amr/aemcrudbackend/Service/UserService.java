package com.amr.aemcrudbackend.Service;

import Request.LoginRequest;
import Request.RegisterUserRequest;
import com.amr.aemcrudbackend.Entity.UserStatusEnum;
import com.amr.aemcrudbackend.Entity.Users;
import com.amr.aemcrudbackend.Repository.UsersRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;


@Service
public class UserService {
    @Autowired
    private UsersRepository usersRepository;

    public Users setUsersList(RegisterUserRequest addition) throws Exception {
        if (addition == null || addition.getUsername() == null || addition.getPassword() == null)
            throw new Exception("Null Value");

        var user = Users.builder()
                .id(UUID.randomUUID())
                .name(addition.getUsername())
                .password(addition.getPassword())
                .email(addition.getUsername() + "@stc.com.sa")
                .status(UserStatusEnum.Pending.ordinal())
                .imageUrl("https://i.pravatar.cc/48?u=" + generateRandom(10000, 20000))
                .build();
        return usersRepository.save(user);
    }

    public List<Users> getUsersList() {
        return usersRepository.findAll();
    }

    @Transactional
    public void deleteUser(String deletedUser) throws Exception {
        if (deletedUser == null)
            throw new Exception("Null Value");

        usersRepository.deleteByUsername(deletedUser);
    }


    private int generateRandom(int lower, int upper) {
        return (int) (Math.random() * (upper - lower)) + lower;
    }

    public boolean authenticate(LoginRequest request) {
        var user = usersRepository.findByUsername(request.getUsername());

        if( user == null)
            return false;
        else {
            return request.getPassword().equals(user.getPassword());
        }
    }
}
