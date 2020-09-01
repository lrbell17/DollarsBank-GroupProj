package com.cognixia.teamfour.dollarbank.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.cognixia.teamfour.dollarbank.models.Transaction;

@Repository
public interface TransactionRepo extends CrudRepository<Transaction, Integer>{

	@Query(value = "select * from transactions where user_id = ?", nativeQuery = true)
	public List<Transaction> getUserTransactions(int userId);
	
	@Query(value = "select * from transactions where account_id = ?", nativeQuery = true)
	public List<Transaction> getAccountTransactions(int accountId);
	
	@Query(value = "delete from transactions where transaction_id = ?", nativeQuery = true)
	public void deleteById(int id);
}
