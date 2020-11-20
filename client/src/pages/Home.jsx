// Import dependencies
import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../axios";

export default function Home() {
  const [auth] = useAuth();
  const [wishlists, setWishlists] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get(`/users/${auth.user._id}/wishlists`);

      setWishlists(response.data.data);
    })();
  }, []);

  return (
    <div className="home-page">
      <h1>Home page</h1>
    </div>
  );
}
