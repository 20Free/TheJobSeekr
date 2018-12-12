package com.thejobseekr.web;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.thejobseekr.util.Constants;

@Configuration
public class WebConfiguration implements WebMvcConfigurer {

	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController(Constants.CONFIG_FORWARD_1)
		.setViewName(Constants.CONFIG_FORWARD);
		registry.addViewController(Constants.CONFIG_FORWARD_2)
		.setViewName(Constants.CONFIG_FORWARD);
		registry.addViewController(Constants.CONFIG_FORWARD_3)
		.setViewName(Constants.CONFIG_FORWARD);
	}
}
