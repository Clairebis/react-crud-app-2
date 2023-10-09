import { useEffect, useState } from "react";
import DogCard from "../components/DogCard";

export default function DogList() {
  const [dogs, setDogs] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    async function getDogs() {
      const url =
        "https://dog-app-7792f-default-rtdb.europe-west1.firebasedatabase.app/dogs.json";
      const response = await fetch(url);
      const data = await response.json();
      const dogsArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      })); // object to array of objects

      console.log(data);
      console.log(dogsArray);
      setDogs(dogsArray);
    }

    getDogs();
  }, []);

  let dogsToDisplay = [...dogs];

  if (searchValue) {
    dogsToDisplay = dogsToDisplay.filter(
      (dog) =>
        dog.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        dog.breed.toLowerCase().includes(searchValue.toLowerCase()) ||
        dog.status.toLowerCase().includes(searchValue.toLowerCase()) ||
        dog.age.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  return (
    <section className="page">
      <h1>Adopt a Dog</h1>
      <section className="filters-pane">
        <input
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value.toLowerCase())}
        />
      </section>
      <section className="grid">
        {dogsToDisplay.map((dog) => (
          <DogCard dog={dog} key={dog.id} />
        ))}
      </section>
    </section>
  );
}
