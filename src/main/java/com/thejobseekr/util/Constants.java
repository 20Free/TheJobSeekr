package com.thejobseekr.util;

public class Constants {
	public static final Object NULL = null;
	public static final String EQUALS = "=";
	public static final String SPACE = " ";
	public static final String DBL_SPACE = "  ";
	public static final String PERCENT_40 = "%40";
	public static final String DOT = ".";
	public static final String SEMI_COLON = ";";
	public static final String AT = "@";
	public static final String QUOTE = "\"";
	public static final String EMPTY = "";
	public static final String ASTERISK = "*";
	public static final String OPENING_TAG = "<";
	public static final String CLOSING_TAG = ">";
	public static final String NEW_LINE = "\n";
	public static final String OPENING_CURLY = "{";
	public static final String CLOSING_CURLY = "}";
	public static final String TAB = "\t";
	public static final String SEPARATOR = "/";

	public static final String FAKE_TOKEN = "sdaijdiwjiojddwiaj";
	public static final String USER_20 = "20Free";
	public static final String EMAIL_20 = "jon.austin@hotmail.ca";
	public static final String PHONE_20 = "+12898340521";
	public static final String FAKE_USER = "wiudhwiuhdhuih218923124joidwajiojwdw2381124iodwjijdwad";

	public static final String LOCAL_HOST_ADDRESS = "http://localhost:8080";
	public static final String USER_ENDPOINT = "/user";
	public static final String CREATE_ENDPOINT = USER_ENDPOINT + "/create";
	public static final String USERNAME_ENDPOINT = USER_ENDPOINT + "/username";
	public static final String EMAIL_ENDPOINT = USER_ENDPOINT + "/email";
	public static final String PHONENUMBER_ENDPOINT = USER_ENDPOINT + "/phoneNumber";
	public static final String ROLE_ENDPOINT = USER_ENDPOINT + "/role";
	public static final String STORED_USER_ENDPOINT = USER_ENDPOINT + "/storedUser";
	public static final String STORE_USER_ENDPOINT = USER_ENDPOINT + "/storeUser";
	public static final String DELETE_STORED_USER_ENDPOINT = USER_ENDPOINT + "/deleteStoredUsername";
	public static final String SIGNIN_ENDPOINT = USER_ENDPOINT + "/signin";
	public static final String SIGNOUT_ENDPOINT = USER_ENDPOINT + "/signout";

	public static final String RES_FIREBASE_ADMIN_SDK_JSON = "/spring-firebase-test-firebase-adminsdk-ql2kg-95106115e4.json";

	public static final boolean CHECK_REVOKED = true;

	public static final boolean PASS_VERIFIED_TRUE = true;
	public static final boolean PASS_VERIFIED_FALSE = false;

	public static final String POST_IDENTIFY = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyC1o3nf2A7eujNtq2icba48bZdulMo-jF4";

	public static final String RESPONSE_CREATED_SUCCESS = "Successfully created user: ";
	public static final String RESPONSE_SUCCESS = "success";
	public static final String RESPONSE_FAILED = "failed";
	public static final int RESPONSE_STATUS_OK = 200;

	public static final String DB_USERS = "users";
	public static final String DB_ROLE = "role";

	public static final String ERR_NO_RECORD_FOUND = "No user record found";

	public static final String CONFIG_ALL = "/**";
	public static final String CONFIG_FORWARD = "forward:/";
	public static final String CONFIG_FORWARD_1 = "/{spring:\\w+}";
	public static final String CONFIG_FORWARD_2 = "/**/{spring:\\w+}";
	public static final String CONFIG_FORWARD_3 = "/{spring:\\w+}/**{spring:?!(\\.js|\\.css)$}";

	public static final String METHOD_GET = "GET";
	public static final String METHOD_PUT = "PUT";
	public static final String METHOD_POST = "POST";
	public static final String METHOD_DELETE = "DELETE";
	public static final String HEADER_FIREBASE_AUTH = "x-firebase-auth";
	public static final String HEADER_ACCEPT = "accept";
	public static final String HEADER_JSON = "application/json";
	public static final String FIELD_EMAIL = "email";
	public static final String FIELD_PASSWORD = "password";
	public static final String FIELD_RETURN_SECURE_TOKEN = "returnSecureToken";
	public static final boolean FIELD_RETURN_SECURE_TOKEN_VALUE = false;

}
