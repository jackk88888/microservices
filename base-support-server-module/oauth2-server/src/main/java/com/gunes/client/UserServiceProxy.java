package com.gunes.client;

import com.gunes.vo.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "users-service", decode404 = true)
public interface UserServiceProxy {

    @GetMapping(value = "/find-by-username/{username}")
    ResponseEntity<User> findByUsername(@PathVariable(name = "username") String username);
}