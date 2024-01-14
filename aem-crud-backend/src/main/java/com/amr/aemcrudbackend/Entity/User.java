package com.amr.aemcrudbackend.Entity;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {
    private UUID id;
    private String name;
    private String email;
}
