package com.thejobseekr.web;

import java.util.Base64;
import java.util.HashMap;

import com.thejobseekr.model.UserPojo;
import com.thejobseekr.model.SignInPojo;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.auth.UserRecord;
import com.google.firebase.auth.UserRecord.CreateRequest;
import com.google.firebase.cloud.FirestoreClient;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
	
	Logger logger = LoggerFactory.getLogger(UserController.class);
	String storedUsername = "";
	
	@PostMapping("/user")
	public ResponseEntity<?> getUser(@RequestBody String tokenString) {
		if(tokenString.contains("=")) {
			tokenString = tokenString.replace("=", "");
		}
		boolean checkRevoked = true;
		try {
			FirebaseToken token = FirebaseAuth.getInstance().verifyIdToken(tokenString, checkRevoked);
			return new ResponseEntity<>(token, HttpStatus.OK);
		} catch (FirebaseAuthException e) {
			logger.info(e.getMessage());
			return new ResponseEntity<>("", HttpStatus.OK);
		}
	}
	
	@PostMapping("/user/create")
	public ResponseEntity<?> createUser(@RequestBody UserPojo userPojo) {
		logger.info("UserPojo: " + userPojo.getFirstName() + "\n"
								 + userPojo.getLastName() + "\n"
								 + userPojo.getPhoneNumber() + "\n"
								 + userPojo.getPassword() + "\n"
								 + userPojo.getUsername() + "\n"
								 + userPojo.getEmail() + "\n"
								 + userPojo.getRole());

		byte[] decodedPass = Base64.getDecoder().decode(userPojo.getPassword());
		String password = new String(decodedPass);
		
		try {
			CreateRequest request = new CreateRequest()
				.setUid(userPojo.getUsername())
				.setPassword(password)
				.setDisplayName(userPojo.getFirstName() + " " + userPojo.getLastName())
				.setEmail(userPojo.getEmail())
				.setPhoneNumber(userPojo.getPhoneNumber());
			UserRecord userRecord = FirebaseAuth.getInstance().createUser(request);
			logger.info("Successfully created user: " + userRecord.getUid());
			Firestore db = FirestoreClient.getFirestore();
			DocumentReference docRef = db.collection("users").document(userPojo.getUsername());
			HashMap <String, String> data = new HashMap<>();
			data.put("role", userPojo.getRole());
			ApiFuture<WriteResult> result = docRef.set(data);
			logger.info("Successfully added role at: " + result.get().getUpdateTime());
			return new ResponseEntity<>("Successfully created user: " + userRecord.getUid(), HttpStatus.CREATED);
		} catch (Exception e) {
			logger.error(e.getMessage());
			logger.error(e + "");
			return new ResponseEntity<>(e.getMessage(), HttpStatus.OK);
		}
	}
	
	@PostMapping("/user/username")
	public ResponseEntity<?> checkUsername(@RequestBody String username) {
		logger.info("got to username check: " + username);
		if(username.contains("=")) {
			username = username.replace("=", "");
		}

		try {
			UserRecord userRecord = FirebaseAuth.getInstance().getUser(username);
			logger.info("user exists!" + userRecord.getUid());
			return new ResponseEntity<>(userRecord.getUid(), HttpStatus.OK);
		} catch(FirebaseAuthException e) {
			
			if(e.getMessage().contains("No user record found")) {
				return new ResponseEntity<>("", HttpStatus.OK);
			}
			return new ResponseEntity<>("", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/user/email")
	public ResponseEntity<?> checkEmail(@RequestBody String email) {
		logger.info("got to email check: " + email);
		if(email.contains("=")) {
			email = email.replace("=", "");
		}
		email = email.replace("%40", "@");

		try {
			UserRecord userRecord = FirebaseAuth.getInstance().getUserByEmail(email);
			logger.info("user exists!" + userRecord.getUid());
			
			return new ResponseEntity<>(userRecord.getUid(), HttpStatus.OK);
		} catch(FirebaseAuthException e) {
			if(e.getMessage().contains("No user record found")) {
				return new ResponseEntity<>("", HttpStatus.OK);
			}
			return new ResponseEntity<>("", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/user/phoneNumber")
	public ResponseEntity<?> checkPhoneNumber(@RequestBody String phoneNumber) {
		logger.info("got to username check: " + phoneNumber);
		if(phoneNumber.contains("=")) {
			phoneNumber = phoneNumber.replace("=", "");
		}

		try {
			UserRecord userRecord = FirebaseAuth.getInstance().getUserByPhoneNumber(phoneNumber);
			logger.info("user exists!" + userRecord.getUid());
			return new ResponseEntity<>(userRecord.getUid(), HttpStatus.OK);
		} catch(FirebaseAuthException e) {
			logger.info("caught error: " + e.getMessage());
			if(e.getMessage().contains("No user record found")) {
				return new ResponseEntity<>("", HttpStatus.OK);
			}
			return new ResponseEntity<>("", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/user/role")
	public ResponseEntity<?> getRole(@RequestBody String username) {
		if(username.contains("=")) {
			username = username.replace("=", "");
		}

		try {
			Firestore db = FirestoreClient.getFirestore();
			DocumentReference roleRef = db.collection("users").document(username);
			String role = roleRef.get().get().getString("role");
			return new ResponseEntity<>(role, HttpStatus.OK);
		} catch (Exception e) {
			logger.error(e.getMessage());
			return new ResponseEntity<>("", HttpStatus.OK);
		}
	}

	@GetMapping("/user/storedUser")
	public ResponseEntity<?> getStoredUsername() {
		logger.info("getting user: " + storedUsername);
		return new ResponseEntity<>(storedUsername, HttpStatus.OK);
	}

	@PostMapping("/user/storeUser")
	public void storeUsername(@RequestBody String username) {
		logger.info("storing: " + username);
		if(username.contains("=")) {
			username = username.replace("=", "");
		}
		storedUsername = username;
	}

	@DeleteMapping("/user/deleteStoredUsername")
	public void deleteStoredUsername() {
		storedUsername = "";
	}
	
	@PostMapping("/user/signin")
	public ResponseEntity<?> signIn(@RequestBody SignInPojo signInPojo) {
		UserRecord userRecord = null;
		boolean passVerified = false;
		byte[] decodedPass = Base64.getDecoder().decode(signInPojo.getPassword());
		String pass = new String(decodedPass);
		try {
			userRecord = FirebaseAuth.getInstance().getUser(signInPojo.getUsername());
			HttpResponse<JsonNode> jsonResponse = Unirest.post("https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyC1o3nf2A7eujNtq2icba48bZdulMo-jF4")
														 .header("accept", "application/json")
														 .field("email", userRecord.getEmail())
														 .field("password", pass)
														 .field("returnSecureToken", false)
														 .asJson();
			logger.info("response: " + jsonResponse.getStatus());											
			if(jsonResponse.getStatus() == 200) {
				passVerified = true;
			} else {
				passVerified = false;
			}
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
		if(passVerified) {
			if(userRecord == null) {
				return new ResponseEntity<>("", HttpStatus.OK);
			} else {
				String customToken = "";
				try {
					customToken = FirebaseAuth.getInstance().createCustomToken(userRecord.getUid());
				} catch (FirebaseAuthException e) {
					logger.error(e.getMessage());
					return new ResponseEntity<>("", HttpStatus.OK);
				}
				return new ResponseEntity<>(customToken, HttpStatus.ACCEPTED);
			} 
		} else {
			return new ResponseEntity<>("", HttpStatus.OK);
		}
	}
	
	@PostMapping("/user/signout")
	public ResponseEntity<?> signOut(@RequestBody String username) {
		FirebaseAuth auth = FirebaseAuth.getInstance();
		try {
			auth.revokeRefreshTokens(username);
			return new ResponseEntity<>("success", HttpStatus.OK);
		} catch (FirebaseAuthException e) {
			logger.error("failed to logout: " + e.getMessage());
			return new ResponseEntity<>("failed", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
