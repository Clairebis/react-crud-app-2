import { useEffect, useState } from "react";

export default function User({ uid }) {
  const [user, setUser] = useState({});
  useEffect(() => {
    async function getUser() {
      const url = `https://dog-app-7792f-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`;
      console.log(url);
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setUser(data);
    }

    getUser();
  }, [uid]);

  return (
    <div>
      <img src={user?.image} />
      <span>
        <h3>{user?.name}</h3>
        <h3>{user?.title}</h3>
      </span>
    </div>
  );
}
