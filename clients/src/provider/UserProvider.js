import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URI}api/private/user/auth`,
            {
                withCredentials: true
            }
        )
            .then(response => {
                if (response.headers['content-type'] === 'application/json') {
                    setUser(response.data);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};