package com.gunes.repository;

import com.gunes.model.AuthClientDetails;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthClientRepository extends CrudRepository<AuthClientDetails, String> {

    Optional<AuthClientDetails> findByClientId(String clientId);

}
