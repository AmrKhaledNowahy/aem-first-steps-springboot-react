package com.amr.aemcrudbackend.Repository;

import com.amr.aemcrudbackend.Entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UsersRepository extends JpaRepository<Users, UUID> {

    @Modifying
    @Query("delete from Users u where u.name = ?1")
    void deleteByUsername(String deletedUser);

    @Query("select u from Users u where u.name = ?1")
    public Users findByUsername(String username);
}
