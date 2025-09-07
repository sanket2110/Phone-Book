package com.example.phoneBook.entity;

import lombok.Data;
import lombok.NonNull;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "PhoneBook")
@Data

public class PhoneBook {
    @Id
    private ObjectId id;
    @NonNull
    private String name;
    @NonNull
    private long number;
    private String city;
}
