package com.cognixia.teamfour.dollarbank.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.cognixia.teamfour.dollarbank.models.User;

@Repository
public interface UserRepo extends CrudRepository<User, Integer> {

	@Query(value = "select * from users where user_name = ?", nativeQuery = true)
	public User getByUserName(String userName);
	
	@Query(value = "select * from users where user_name = ? and password = ?", nativeQuery = true)
	public User getByUserNamePass(String userName, String password);
	
	@Query(value = "select * from users where email = ?", nativeQuery = true)
	public User getByEmail(String email);
}
