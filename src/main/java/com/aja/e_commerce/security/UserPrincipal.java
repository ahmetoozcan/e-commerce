package com.aja.e_commerce.security;

import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.AllArgsConstructor;
import lombok.Getter;
import com.aja.e_commerce.model.User;

@Getter
@AllArgsConstructor
public class UserPrincipal implements UserDetails {
	private User user;

	@Override
    public List<? extends GrantedAuthority> getAuthorities() {
        return null;
    }
    
    public Long getUserId() {
        return user.getId();
    }

	@Override
	public String getPassword() {
		return user.getPassword();
	}

	@Override
	public String getUsername() {
		return user.getEmail();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
}