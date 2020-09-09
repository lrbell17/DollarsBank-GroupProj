package com.cognixia.teamfour.dollarbank.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.cognixia.teamfour.dollarbank.models.Account;

@Repository
public interface AccountRepo extends CrudRepository<Account, Integer> {

	@Query(value = "select * from accounts where account_id = ?", nativeQuery = true)
	public Account getAccountById(int id);
	
	@Query(value = "select * from accounts where user_id = ?", nativeQuery = true)
	public List<Account> getUserAccounts(int id);
	
	@Modifying
	@Query(value = "delete from accounts where account_id = ?", nativeQuery = true)
	public void deleteById(int id);
}
