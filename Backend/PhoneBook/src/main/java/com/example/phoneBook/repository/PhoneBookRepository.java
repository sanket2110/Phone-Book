package com.example.phoneBook.repository;

import com.example.phoneBook.entity.PhoneBook;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface PhoneBookRepository extends MongoRepository<PhoneBook, ObjectId> {
    PhoneBook findByName(String name);
    PhoneBook findByNumber(long number);
    Optional<PhoneBook> findById(ObjectId id);
}
