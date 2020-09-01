package com.cognixia.teamfour.dollarbank.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.cognixia.teamfour.dollarbank.models.Transaction;

@Repository
public interface TransactioRepo extends CrudRepository<Transaction, Integer>{

	@Query(value = "select * from transaction where customer_id = ?", nativeQuery = true)
	public List<Transaction> getCustomerTransactions(int customerId);
	
	@Query(value = "select * from transaction where account_id = ?", nativeQuery = true)
	public List<Transaction> getAccountTransactions(int accountId);
}
