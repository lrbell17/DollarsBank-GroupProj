package com.cognixia.teamfour.dollarbank.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognixia.teamfour.dollarbank.models.Account;
import com.cognixia.teamfour.dollarbank.repositories.AccountRepo;


@Service
public class AccountService {

	@Autowired
	AccountRepo accountRepo;
	
	public Account getAccountById(int id) {
		return accountRepo.getAccountById(id);
	}
	
	public List<Account> getUserAccounts(int userId) {
		return accountRepo.getUserAccounts(userId);
	}
	
	public void create(Account acct) {
		accountRepo.save(acct);
	}
	
	public void update(Account acct) {
		accountRepo.save(acct);
	}
	
	public void delete(int id) {
		accountRepo.deleteById(id);
	}
}
