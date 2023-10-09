import { useEffect, useState } from "react";
import DogCard from "../components/DogCard";

export default function DogList() {
  const [dogs, setDogs] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [sortBy, setSortBy] = useState("age");

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
        dog.name.toLowerCase().includes(searchValue) ||
        dog.breed.toLowerCase().includes(searchValue) ||
        dog.status.toLowerCase().includes(searchValue) ||
        dog.age.toLowerCase().includes(searchValue)
    );
  }

  dogsToDisplay.sort((dog1, dog2) => {
    console.log(sortBy);
    if (sortBy === "name") {
      return dog1[sortBy].localeCompare(dog2[sortBy]);
    } else if (sortBy === "status") {
      return dog1[sortBy] - dog2[sortBy];
    }
  });

  return (
    <section className="page">
      <h1>Adopt a Dog</h1>
      <section className="filters-pane">
        <label>
          Sort by
          <select onChange={(e) => setSortBy(e.target.value)}>
            <option value="name">Name</option>
            <option value="status">Status</option>
          </select>
        </label>

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
