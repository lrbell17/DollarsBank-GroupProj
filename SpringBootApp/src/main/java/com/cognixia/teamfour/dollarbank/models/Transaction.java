package com.cognixia.teamfour.dollarbank.models;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.sun.istack.NotNull;

@Entity
@Table(name = "transactions")
public class Transaction {

	@NotNull
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "transaction_id")
	private int id;

	@NotNull
	@Column(name = "type")
	private String type;

	@NotNull
	@Column(name = "user_id")
	private int userId;

	@NotNull
	@Column(name = "account_id")
	private int accountId;

	@NotNull
	@Column(name = "amount")
	private float amount;

	@NotNull
	@Column(name = "start_balance")
	private float startBalance;

	@NotNull
	@Column(name = "end_balance")
	private float endBalance;

	@NotNull
	@Column(name = "time_stamp")
	private String timeStamp;

	public Transaction() {

	}

	public Transaction(int id, String type, int userId, int accountId, float amount, float startBalance,
			float endBalance) {
		super();
		SimpleDateFormat df = new SimpleDateFormat("EEE, d MMM yyyy HH:mm:ss Z");
		this.id = id;
		this.type = type;
		this.userId = userId;
		this.accountId = accountId;
		this.amount = amount;
		this.startBalance = startBalance;
		this.endBalance = endBalance;
		String d = df.format(new Date());
		this.timeStamp = d;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public int getAccountId() {
		return accountId;
	}

	public void setAccountId(int accountId) {
		this.accountId = accountId;
	}

	public float getAmount() {
		return amount;
	}

	public void setAmount(float amount) {
		this.amount = amount;
	}

	public float getStartBalance() {
		return startBalance;
	}

	public void setStartBalance(float startBalance) {
		this.startBalance = startBalance;
	}

	public float getEndBalance() {
		return endBalance;
	}

	public void setEndBalance(float endBalance) {
		this.endBalance = endBalance;
	}

	public String getTimeStamp() {
		return timeStamp;
	}

	public void setTimeStamp(String timeStamp) {
		this.timeStamp = timeStamp;
	}

	@Override
	public String toString() {
		return "Transaction [id=" + id + ", type=" + type + ", userId=" + userId + ", accountId=" + accountId
				+ ", amount=" + amount + ", startBalance=" + startBalance + ", endBalance=" + endBalance
				+ ", timeStamp=" + timeStamp + "]";
	}

}
