package com.aja.e_commerce.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import com.aja.e_commerce.repository.UserRepository;
import com.aja.e_commerce.security.UserPrincipal;
import com.aja.e_commerce.model.User;


@AllArgsConstructor
@Service
public class ImsUserDetailsService implements UserDetailsService {

	private UserRepository userRepository;

	
	@Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userRepository.findByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException(username);
        }
        UserPrincipal userPrincipal = new UserPrincipal(user);
		return userPrincipal;
    }
}