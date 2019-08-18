package com.gunes.vo;

import com.gunes.vo.base.BaseStatusVO;

import java.util.List;

public class User extends BaseStatusVO {

    private String username;

    private String password;

    private List<String> authorities;

    public String getUsername() {
        return username;
    }

    public void setUsername(final String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(final String password) {
        this.password = password;
    }

    public List<String> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(final List<String> authorities) {
        this.authorities = authorities;
    }
}