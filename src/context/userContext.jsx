// import React, { createContext, useState } from "react";

// export const UserContext = createContext();

// const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // Function to update user data
//   const updateUser = (userData) => {
//     setUser(userData);
//   };

//   // Function to clear user data (eg., on logout)
//   const clearUser = () => {
//     setUser(null);
//   };

//   return (
//     <UserContext.Provider
//       value={{
//         user,
//         updateUser,
//         clearUser,
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

// export default UserProvider;

import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Load from localStorage if available
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Function to update user data
  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // persist
  };

  // Function to clear user data (eg., on logout)
  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("user"); // remove from storage
  };

  // Keep state in sync with localStorage (optional safeguard)
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
