import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("accessToken")
            if (token) {
                try {
                    const res = await axios.get(`https://ksrtc-bus-search-booking-system.onrender.com/user/get-user`, {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                    if (res.data.success) {
                        setUser(res.data.user)
                    }
                } catch (error) {
                    localStorage.removeItem("accessToken")
                }
            }
            setLoading(false)
        }
        fetchUser()
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    )
}

export const getData = () => useContext(UserContext)