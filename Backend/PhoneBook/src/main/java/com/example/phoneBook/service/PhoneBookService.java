package com.example.phoneBook.service;

import com.example.phoneBook.entity.PhoneBook;
import com.example.phoneBook.repository.PhoneBookRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class PhoneBookService {
    @Autowired
    private PhoneBookRepository phoneBookRepository;


    public void saveEntry(PhoneBook phoneBook){
        phoneBookRepository.save(phoneBook);
    }


    public List<PhoneBook> getAll(){
        return phoneBookRepository.findAll();
    }

    public void deleteById(ObjectId id){
        phoneBookRepository.deleteById(id);
    }


    public PhoneBook findByNumber(long number) {
        return phoneBookRepository.findByNumber(number);
    }
}
