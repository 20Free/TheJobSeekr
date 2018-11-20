package com.thejobseekr.model;

public class UserPojo {
	
	private String firstName;
	private String lastName;
	private String phoneNumber;
	private String username;
	private String password;
	private String email;
	private String role;
	
	public UserPojo() {
		setFirstName("");
		setLastName("");
		setPhoneNumber("");
		setUsername("");
		setPassword("");
		setEmail("");
		setRole("");
	}
	
	public UserPojo(String firstName, String lastName, String phoneNumber, String username, String password, String email, String role) {
		this.setFirstName(firstName);
		this.setLastName(lastName);
		this.setPhoneNumber(phoneNumber);
		this.setUsername(username);
		this.setPassword(password);
		this.setEmail(email);
		this.setRole(role);
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

}
