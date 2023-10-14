import { useEffect, useState } from "react";
import DogCard from "../components/DogCard";

//Functional component that displays a list of dogs
export default function DogList() {
  //useState hook to create 3 state variables
  const [dogs, setDogs] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [sortBy, setSortBy] = useState("age");

  //useEffect hook to fetch the list of dogs (from firebase)
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
      setDogs(dogsArray); // data stored in the dogs variable "setDogs"
    }

    getDogs();
  }, []);

  let dogsToDisplay = [...dogs]; // copy of the dogs array

  //filter the dogs based on the searchValue input by the user
  //does the searchValue match any of the dog properties?
  if (searchValue) {
    dogsToDisplay = dogsToDisplay.filter(
      (dog) =>
        dog.name.toLowerCase().includes(searchValue) ||
        dog.breed.toLowerCase().includes(searchValue) ||
        dog.status.toLowerCase().includes(searchValue) ||
        dog.age.toLowerCase().includes(searchValue)
    );
  }

  //sort the dogs based on the sortBy value selected by the user - name or breed
  dogsToDisplay.sort((dog1, dog2) => {
    console.log(sortBy);
    if (sortBy === "name") {
      return dog1[sortBy].localeCompare(dog2[sortBy]);
    } else if (sortBy === "breed") {
      return dog1[sortBy].localeCompare(dog2[sortBy]);
    }
  });

  return (
    <section className="page">
      <h1>Adopt a Dog</h1>
      <section className="filters-pane">
        <label>
          Sort by
          <select onChange={(e) => setSortBy(e.target.value)}>
            {/*onChange event handler to set the sortBy state variable*/}
            <option value="name">Name</option>
            <option value="breed">Breed</option>
          </select>
        </label>

        <input
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value.toLowerCase())}
        />
        {/*onChange event handler to set the searchBy state variable*/}
      </section>
      <section className="grid">
        {dogsToDisplay.map((dog) => (
          <DogCard dog={dog} key={dog.id} />
        ))}
      </section>
    </section>
  );
}
