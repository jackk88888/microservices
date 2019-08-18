package com.gunes.service;

import com.gunes.client.UserServiceProxy;
import com.gunes.vo.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
public class DomainUserDetailsService implements UserDetailsService {


    private final Logger log = LoggerFactory.getLogger(DomainUserDetailsService.class);

    @Autowired
    private UserServiceProxy userServiceProxy;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.debug("Authenticating {}", username);
        String lowercaseUsername = username.toLowerCase(Locale.ENGLISH);
        User user = userServiceProxy.findByUsername(lowercaseUsername).getBody();
        return createSpringSecurityUser(user);
    }

    private org.springframework.security.core.userdetails.User createSpringSecurityUser(User user) {
        List<GrantedAuthority> grantedAuthorities = user.getAuthorities().stream().map(
                SimpleGrantedAuthority::new).collect(Collectors.toList());
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                                                                      grantedAuthorities);
    }
}
