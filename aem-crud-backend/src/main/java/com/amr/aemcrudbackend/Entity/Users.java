package com.amr.aemcrudbackend.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "users")
public class Users {
    @Id
    private UUID id;
    private String name;
    private String password;
    private String email;
    private String imageUrl;
    private Integer status;

}
