package com.thejobseekrtest.controller;

import org.junit.Test;
import org.junit.runner.RunWith;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;


import com.thejobseekr.TheJobSeekrApp;
import com.thejobseekr.web.model.UserPojo;
import com.thejobseekr.util.Constants;
import com.thejobseekrtest.util.TestUtil;

@RunWith(SpringRunner.class)
@SpringBootTest(
		webEnvironment = SpringBootTest.WebEnvironment.MOCK,
		classes = TheJobSeekrApp.class)
@AutoConfigureMockMvc
public class UserControllerTest {

	@Autowired
	private MockMvc mvc;

	@Test
	public void postUser() throws Exception {
		mvc.perform(post(Constants.LOCAL_HOST_ADDRESS + Constants.USER_ENDPOINT)
				.content(Constants.EMPTY))
				.andExpect(status().is(400))
				.andExpect(content().string(Constants.EMPTY));
	}

	@Test
	public void postCreate() throws Exception {
		UserPojo pojo = new UserPojo();
		pojo.setUsername(Constants.USER_20);

		mvc.perform(post(Constants.LOCAL_HOST_ADDRESS + Constants.CREATE_ENDPOINT)
				.contentType(TestUtil.APPLICATION_JSON_UTF8)
				.content(TestUtil.convertObjectToJsonBytes(pojo)))
				.andExpect(status().isOk());

	}

	@Test
	public void postUsername() throws Exception {
		mvc.perform(post(Constants.LOCAL_HOST_ADDRESS + Constants.USERNAME_ENDPOINT)
				.content(Constants.USER_20))
				.andExpect(status().isOk())
				.andExpect(content().string(Constants.USER_20));

		mvc.perform(post(Constants.LOCAL_HOST_ADDRESS + Constants.USERNAME_ENDPOINT)
				.content(Constants.FAKE_USER))
				.andExpect(status().isOk())
				.andExpect(content().string(Constants.EMPTY));

		mvc.perform(post(Constants.LOCAL_HOST_ADDRESS + Constants.USERNAME_ENDPOINT)
				.content(Constants.EMPTY))
				.andExpect(status().is(400))
				.andExpect(content().string(Constants.EMPTY));
	}

	@Test
	public void postEmail() throws Exception {
		mvc.perform(post(Constants.LOCAL_HOST_ADDRESS + Constants.EMAIL_ENDPOINT)
				.content(Constants.EMAIL_20))
				.andExpect(status().isOk())
				.andExpect(content().string(Constants.USER_20));

		mvc.perform(post(Constants.LOCAL_HOST_ADDRESS + Constants.EMAIL_ENDPOINT)
				.content(Constants.FAKE_USER))
				.andExpect(status().isOk())
				.andExpect(content().string(Constants.EMPTY));

		mvc.perform(post(Constants.LOCAL_HOST_ADDRESS + Constants.EMAIL_ENDPOINT)
				.content(Constants.EMPTY))
				.andExpect(status().is(400))
				.andExpect(content().string(Constants.EMPTY));
	}

	@Test
	public void postPhone() throws Exception {
		mvc.perform(post(Constants.LOCAL_HOST_ADDRESS + Constants.PHONENUMBER_ENDPOINT)
				.content(Constants.PHONE_20))
				.andExpect(status().isOk())
				.andExpect(content().string(Constants.USER_20));

		mvc.perform(post(Constants.LOCAL_HOST_ADDRESS + Constants.PHONENUMBER_ENDPOINT)
				.content(Constants.FAKE_USER))
				.andExpect(status().is(500))
				.andExpect(content().string(Constants.EMPTY));

		mvc.perform(post(Constants.LOCAL_HOST_ADDRESS + Constants.PHONENUMBER_ENDPOINT)
				.content(Constants.EMPTY))
				.andExpect(status().is(400))
				.andExpect(content().string(Constants.EMPTY));
	}
}
