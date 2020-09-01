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

import com.cognixia.teamfour.dollarbank.models.Transaction;
import com.cognixia.teamfour.dollarbank.services.TransactionService;

@RestController
@RequestMapping("/transaction")
public class TransactionController {

	@Autowired
	TransactionService ts;
	
	@GetMapping("/user/{id}")
	public List<Transaction> getUserTansactions(@Valid @PathVariable int id) {
		return ts.getTransactionByUserId(id);
	}
	
	@GetMapping("/acct/{id}")
	public List<Transaction> getAccountTansactions(@Valid @PathVariable int id) {
		return ts.getTransactionByAccountId(id);
	}
	
	@PostMapping("/create")
	public void createTransaciton(@Valid @RequestBody Transaction t) {
		ts.create(t);
	}
	
	@PutMapping("/update")
	public void updateTransaction(@Valid @RequestBody Transaction t) {
		ts.update(t);
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteTransaciton(@Valid @PathVariable int id) {
		ts.delete(id);
	}
}
