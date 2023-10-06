import { useEffect, useState } from "react";
import DogCard from "../components/DogCard";

export default function DogList() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    async function getDogs() {
      const url =
        "https://dog-app-7792f-default-rtdb.europe-west1.firebasedatabase.app/dogs.json";
      const response = await fetch(url);
      const data = await response.json();
      const dogsArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));

      console.log(data);
      console.log(dogsArray);
      setDogs(dogsArray);
    }

    getDogs();
  }, []);

  return (
    <section>
      <h1>Adopt a Dog</h1>
      <section>
        {dogs.map((dog) => (
          <DogCard dog={dog} key={dog.id} />
        ))}
      </section>
    </section>
  );
}
