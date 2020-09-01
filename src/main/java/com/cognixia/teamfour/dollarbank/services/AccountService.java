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
	
	public List<Account> getCustomerAccounts(int customerId) {
		return accountRepo.getCustomerAccounts(customerId);
	}
	
	public void createAccount(Account acct) {
		accountRepo.save(acct);
	}
	
	public void updateAccount(Account acct) {
		accountRepo.save(acct);
	}
	
	public void deleteAccount(Account acct) {
		accountRepo.delete(acct);
	}
}
