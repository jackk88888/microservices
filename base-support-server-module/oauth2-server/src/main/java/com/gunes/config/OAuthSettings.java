package com.gunes.config;

import org.springframework.context.annotation.Configuration;

@Configuration
public class OAuthSettings {

    private Integer tokenExpirationTime;

    private Integer refreshTokenExpTime;

    private String tokenSigningKey;

    private String clientId;

    private String clientSecret;

    private String grantTypePassword;

    private String authorizationCode;

    private String refreshToken;

    private String implicit;

    private String scopeRead;

    private String scopeWrite;

    private String trust;

    public Integer getTokenExpirationTime() {
        return tokenExpirationTime;
    }

    public void setTokenExpirationTime(final Integer tokenExpirationTime) {
        this.tokenExpirationTime = tokenExpirationTime;
    }

    public Integer getRefreshTokenExpTime() {
        return refreshTokenExpTime;
    }

    public void setRefreshTokenExpTime(final Integer refreshTokenExpTime) {
        this.refreshTokenExpTime = refreshTokenExpTime;
    }

    public String getTokenSigningKey() {
        return tokenSigningKey;
    }

    public void setTokenSigningKey(final String tokenSigningKey) {
        this.tokenSigningKey = tokenSigningKey;
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(final String clientId) {
        this.clientId = clientId;
    }

    public String getClientSecret() {
        return clientSecret;
    }

    public void setClientSecret(final String clientSecret) {
        this.clientSecret = clientSecret;
    }

    public String getGrantTypePassword() {
        return grantTypePassword;
    }

    public void setGrantTypePassword(final String grantTypePassword) {
        this.grantTypePassword = grantTypePassword;
    }

    public String getAuthorizationCode() {
        return authorizationCode;
    }

    public void setAuthorizationCode(final String authorizationCode) {
        this.authorizationCode = authorizationCode;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(final String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public String getImplicit() {
        return implicit;
    }

    public void setImplicit(final String implicit) {
        this.implicit = implicit;
    }

    public String getScopeRead() {
        return scopeRead;
    }

    public void setScopeRead(final String scopeRead) {
        this.scopeRead = scopeRead;
    }

    public String getScopeWrite() {
        return scopeWrite;
    }

    public void setScopeWrite(final String scopeWrite) {
        this.scopeWrite = scopeWrite;
    }

    public String getTrust() {
        return trust;
    }

    public void setTrust(final String trust) {
        this.trust = trust;
    }
}
