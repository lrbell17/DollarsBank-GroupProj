package com.cognixia.teamfour.dollarbank.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.cognixia.teamfour.dollarbank.models.Account;

@Repository
public interface AccountRepo extends CrudRepository<Account, Integer> {

	@Query(value = "select * from account where customer_id = ?", nativeQuery = true)
	public List<Account> getCustomerAccounts(int id);
}
