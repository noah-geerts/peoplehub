package com.noahgeerts.peoplehubbackend.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String eid;

    @Column(nullable = false)
    String first;

    @Column(nullable = false)
    String last;

    @Column(nullable = false)
    String email;

    @Column(nullable = false)
    Float salary;
}
