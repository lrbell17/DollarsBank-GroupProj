package com.cognixia.teamfour.dollarbank.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cognixia.teamfour.dollarbank.models.Account;
import com.cognixia.teamfour.dollarbank.services.AccountService;

@RestController
@RequestMapping("/account")
public class AccountController {

	@Autowired
	AccountService as;
	
	@GetMapping("/{id}")
	public Account getAccount(@Valid @PathVariable int id) {
		return as.getAccountById(id);
	}
	
	@GetMapping("/all/{userId}")
	public List<Account> getUserAccounts(@Valid @PathVariable int userId) {
		return as.getUserAccounts(userId);
	}
	
	@PostMapping("/create")
	public void createAccount(@Valid @RequestBody Account a) {
		as.create(a);
	}
	
	@PutMapping("/update")
	public void updateAccount(@Valid @RequestBody Account a) {
		as.update(a);
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteAccount(@Valid @PathVariable int id) {
		as.delete(id);
	}
}
