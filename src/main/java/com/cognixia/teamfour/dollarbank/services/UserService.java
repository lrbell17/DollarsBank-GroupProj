package com.cognixia.teamfour.dollarbank.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognixia.teamfour.dollarbank.models.User;
import com.cognixia.teamfour.dollarbank.repositories.UserRepo;

@Service
public class UserService {

	@Autowired
	UserRepo userRepo;
	
	public User getByUserName(String userName) {
		return userRepo.getByUserName(userName);
	}
	
	public User getByUserNameAndPass(String userName, String password) {
		return userRepo.getByUserNamePass(userName, password);
	}
	
	public User getByEmail(String email) {
		return userRepo.getByEmail(email);
	}
	
	public void create(User user) {
		userRepo.save(user);
	}
	
	public void update(User user) {
		userRepo.save(user);
	}
	
	public void delete(User user) {
		userRepo.delete(user);
	}
}
