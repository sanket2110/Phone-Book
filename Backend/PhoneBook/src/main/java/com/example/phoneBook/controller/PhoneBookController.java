package com.example.phoneBook.controller;


import com.example.phoneBook.entity.PhoneBook;
import com.example.phoneBook.service.PhoneBookService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/phone")
public class PhoneBookController {
     @Autowired
     private PhoneBookService phoneBookService;



     @PostMapping
    public ResponseEntity<PhoneBook> saveUserEntry(@RequestBody PhoneBook phoneBook){
        phoneBookService.saveEntry(phoneBook);
        return new ResponseEntity<PhoneBook>(phoneBook,HttpStatus.CREATED);
    }



      @GetMapping
      public ResponseEntity<List<PhoneBook>> getAllUser() {
          List<PhoneBook> listOfUser = phoneBookService.getAll();
          return new ResponseEntity<List<PhoneBook>>(listOfUser, HttpStatus.OK);
      }

      @PutMapping("/{number}")
    public ResponseEntity<PhoneBook> updateUser( @RequestBody PhoneBook phoneBook, @PathVariable long number){
         PhoneBook old= phoneBookService.findByNumber(number);
         if(old != null){
             old.setName(!phoneBook.getName().equals(old.getName()) ? phoneBook.getName() : old.getName());
             old.setNumber(phoneBook.getNumber() != old.getNumber() ? phoneBook.getNumber() : old.getNumber());
             old.setCity(!phoneBook.getCity().equals(old.getCity()) ? phoneBook.getCity() : old.getCity());
             phoneBookService.saveEntry(old);
         }
         return new ResponseEntity<PhoneBook>(old, HttpStatus.CREATED);
     }

     @DeleteMapping("/{number}")
    public ResponseEntity<PhoneBook> deleteUser(@PathVariable long number){
         PhoneBook delete= phoneBookService.findByNumber(number);
         if(delete != null) {
             ObjectId deleteId=delete.getId();
             phoneBookService.deleteById(deleteId);
         }
         return new ResponseEntity<PhoneBook>(delete,HttpStatus.ACCEPTED);
     }

}
