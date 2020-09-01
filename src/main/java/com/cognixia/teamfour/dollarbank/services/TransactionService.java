package com.cognixia.teamfour.dollarbank.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognixia.teamfour.dollarbank.models.Transaction;
import com.cognixia.teamfour.dollarbank.repositories.TransactionRepo;


@Service
public class TransactionService {

	@Autowired
	TransactionRepo transactionRepo;
	
	public List<Transaction> getTransactionByUserId(int id) {
		return transactionRepo.getUserTransactions(id);
	}
	
	public List<Transaction> getTransactionByAccountId(int id) {
		return transactionRepo.getAccountTransactions(id);
	}
	
	public void create(Transaction transaction) {
		transactionRepo.save(transaction);
	}
	
	public void update(Transaction transaction) {
		transactionRepo.save(transaction);
	}
	
	public void delete(int id) {
		transactionRepo.deleteById(id);
	}
}
