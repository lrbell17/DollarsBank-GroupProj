package com.cognixia.teamfour.dollarbank.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cognixia.teamfour.dollarbank.models.Account;
import com.cognixia.teamfour.dollarbank.models.Transaction;
import com.cognixia.teamfour.dollarbank.models.User;
import com.cognixia.teamfour.dollarbank.services.AccountService;
import com.cognixia.teamfour.dollarbank.services.TransactionService;
import com.cognixia.teamfour.dollarbank.services.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	UserService us;
	
	@Autowired
	AccountService as;
	
	@Autowired
	TransactionService ts;
	
	@GetMapping("/{username}/{password}")
	public User getUser(@Validated @PathVariable String username, @Validated @PathVariable String password) {
		User u = us.getByUserName(username);
		if(u.getPassword().equals(password)) {
			return u;
		} else {
			return null;
		}
	}
	
	@PostMapping("/create/{amount}")
	public void createUser(@Validated @RequestBody User u, @Validated @PathVariable float amount) {
		us.create(u);
		User user = us.getByUserName(u.getUserName());
		
		Account a = new Account();
		a.setUserId(user.getId());
		a.setBalance(amount);
		as.create(a);
		
		Transaction t = new Transaction();
		t.setAccountId(a.getId());
		t.setUserId(user.getId());
		t.setAmount(amount);
		t.setStartBalance(0);
		t.setEndBalance(amount);
		t.setType("DEPOSIT");
		ts.create(t);
	}
	
	@PutMapping("/update")
	public void updateUser(@Validated @RequestBody User u) {
		us.update(u);
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteUser(@Validated @PathVariable int id) {
		us.delete(id);
	}
}
