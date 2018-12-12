package com.thejobseekr.web;

import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.auth.UserRecord.CreateRequest;
import com.google.firebase.auth.UserRecord;
import com.google.firebase.cloud.FirestoreClient;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;

import com.thejobseekr.util.Constants;

import com.thejobseekr.web.model.SignInPojo;
import com.thejobseekr.web.model.UserPojo;

import java.util.Base64;
import java.util.HashMap;

// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

	//logger for use if needed
	//Logger logger = LoggerFactory.getLogger(UserController.class);
	String storedUsername = Constants.EMPTY;

	@PostMapping(Constants.USER_ENDPOINT)
	public ResponseEntity<?> getUser(@RequestBody String tokenString) {
		if(tokenString.contains(Constants.EQUALS)) {
			tokenString = tokenString.replace(Constants.EQUALS, Constants.EMPTY);
		}
		boolean checkRevoked = Constants.CHECK_REVOKED;
		try {
			FirebaseToken token = FirebaseAuth.getInstance().verifyIdToken(tokenString, checkRevoked);
			return new ResponseEntity<>(token, HttpStatus.OK);
		} catch (FirebaseAuthException e) {
			return new ResponseEntity<>(Constants.EMPTY, HttpStatus.OK);
		}
	}

	@PostMapping(Constants.CREATE_ENDPOINT)
	public ResponseEntity<?> createUser(@RequestBody UserPojo userPojo) {

		byte[] decodedPass = Base64.getDecoder().decode(userPojo.getPassword());
		String password = new String(decodedPass);

		try {
			CreateRequest request = new CreateRequest()
			                        .setUid(userPojo.getUsername())
			                        .setPassword(password)
			                        .setDisplayName(userPojo.getFirstName() + Constants.SPACE + userPojo.getLastName())
			                        .setEmail(userPojo.getEmail())
			                        .setPhoneNumber(userPojo.getPhoneNumber());
			UserRecord userRecord = FirebaseAuth.getInstance().createUser(request);
			Firestore db = FirestoreClient.getFirestore();
			DocumentReference docRef = db.collection(Constants.DB_USERS).document(userPojo.getUsername());
			HashMap <String, String> data = new HashMap<>();
			data.put(Constants.DB_ROLE, userPojo.getRole());
			docRef.set(data);
			return new ResponseEntity<>(Constants.RESPONSE_CREATED_SUCCESS + userRecord.getUid(), HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.OK);
		}
	}

	@PostMapping(Constants.USERNAME_ENDPOINT)
	public ResponseEntity<?> checkUsername(@RequestBody String username) {
		if(username.contains(Constants.EQUALS)) {
			username = username.replace(Constants.EQUALS, Constants.EMPTY);
		}

		try {
			UserRecord userRecord = FirebaseAuth.getInstance().getUser(username);
			return new ResponseEntity<>(userRecord.getUid(), HttpStatus.OK);
		} catch(FirebaseAuthException e) {

			if(e.getMessage().contains(Constants.ERR_NO_RECORD_FOUND)) {
				return new ResponseEntity<>(Constants.EMPTY, HttpStatus.OK);
			}
			return new ResponseEntity<>(Constants.EMPTY, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping(Constants.EMAIL_ENDPOINT)
	public ResponseEntity<?> checkEmail(@RequestBody String email) {
		if(email.contains(Constants.EQUALS)) {
			email = email.replace(Constants.EQUALS, Constants.EMPTY);
		}
		email = email.replace(Constants.PERCENT_40, Constants.AT);

		try {
			UserRecord userRecord = FirebaseAuth.getInstance().getUserByEmail(email);

			return new ResponseEntity<>(userRecord.getUid(), HttpStatus.OK);
		} catch(FirebaseAuthException e) {
			if(e.getMessage().contains(Constants.ERR_NO_RECORD_FOUND)) {
				return new ResponseEntity<>(Constants.EMPTY, HttpStatus.OK);
			}
			return new ResponseEntity<>(Constants.EMPTY, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping(Constants.PHONENUMBER_ENDPOINT)
	public ResponseEntity<?> checkPhoneNumber(@RequestBody String phoneNumber) {
		if(phoneNumber.contains(Constants.EQUALS)) {
			phoneNumber = phoneNumber.replace(Constants.EQUALS, Constants.EMPTY);
		}

		try {
			UserRecord userRecord = FirebaseAuth.getInstance().getUserByPhoneNumber(phoneNumber);
			return new ResponseEntity<>(userRecord.getUid(), HttpStatus.OK);
		} catch(FirebaseAuthException e) {
			if(e.getMessage().contains(Constants.ERR_NO_RECORD_FOUND)) {
				return new ResponseEntity<>(Constants.EMPTY, HttpStatus.OK);
			}
			return new ResponseEntity<>(Constants.EMPTY, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping(Constants.ROLE_ENDPOINT)
	public ResponseEntity<?> getRole(@RequestBody String username) {
		if(username.contains(Constants.EQUALS)) {
			username = username.replace(Constants.EQUALS, Constants.EMPTY);
		}

		try {
			Firestore db = FirestoreClient.getFirestore();
			DocumentReference roleRef = db.collection(Constants.DB_USERS).document(username);
			String role = roleRef.get().get().getString(Constants.DB_ROLE);
			return new ResponseEntity<>(role, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(Constants.EMPTY, HttpStatus.OK);
		}
	}

	@GetMapping(Constants.STORED_USER_ENDPOINT)
	public ResponseEntity<?> getStoredUsername() {
		return new ResponseEntity<>(storedUsername, HttpStatus.OK);
	}

	@PostMapping(Constants.STORE_USER_ENDPOINT)
	public void storeUsername(@RequestBody String username) {
		if(username.contains(Constants.EQUALS)) {
			username = username.replace(Constants.EQUALS, Constants.EMPTY);
		}
		storedUsername = username;
	}

	@DeleteMapping(Constants.DELETE_STORED_USER_ENDPOINT)
	public void deleteStoredUsername() {
		storedUsername = Constants.EMPTY;
	}

	@PostMapping(Constants.SIGNIN_ENDPOINT)
	public ResponseEntity<?> signIn(@RequestBody SignInPojo signInPojo) {
		UserRecord userRecord = (UserRecord) Constants.NULL;
		boolean passVerified = Constants.PASS_VERIFIED_FALSE;
		byte[] decodedPass = Base64.getDecoder().decode(signInPojo.getPassword());
		String pass = new String(decodedPass);
		try {
			userRecord = FirebaseAuth.getInstance().getUser(signInPojo.getUsername());
			HttpResponse<JsonNode> jsonResponse = Unirest.post(Constants.POST_IDENTIFY)
			                                      .header(Constants.HEADER_ACCEPT, Constants.HEADER_JSON)
			                                      .field(Constants.FIELD_EMAIL, userRecord.getEmail())
			                                      .field(Constants.FIELD_PASSWORD, pass)
			                                      .field(Constants.FIELD_RETURN_SECURE_TOKEN, Constants.FIELD_RETURN_SECURE_TOKEN_VALUE)
			                                      .asJson();
			if(jsonResponse.getStatus() == Constants.RESPONSE_STATUS_OK) {
				passVerified = Constants.PASS_VERIFIED_TRUE;
			}
		} catch (Exception e) {
		}
		if(passVerified) {
			if(userRecord == Constants.NULL) {
				return new ResponseEntity<>(Constants.EMPTY, HttpStatus.OK);
			} else {
				String customToken = Constants.EMPTY;
				try {
					customToken = FirebaseAuth.getInstance().createCustomToken(userRecord.getUid());
				} catch (FirebaseAuthException e) {
					return new ResponseEntity<>(Constants.EMPTY, HttpStatus.OK);
				}
				return new ResponseEntity<>(customToken, HttpStatus.ACCEPTED);
			}
		} else {
			return new ResponseEntity<>(Constants.EMPTY, HttpStatus.OK);
		}
	}

	@PostMapping(Constants.SIGNOUT_ENDPOINT)
	public ResponseEntity<?> signOut(@RequestBody String username) {
		FirebaseAuth auth = FirebaseAuth.getInstance();
		try {
			auth.revokeRefreshTokens(username);
			return new ResponseEntity<>(Constants.RESPONSE_SUCCESS, HttpStatus.OK);
		} catch (FirebaseAuthException e) {
			return new ResponseEntity<>(Constants.RESPONSE_FAILED, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
