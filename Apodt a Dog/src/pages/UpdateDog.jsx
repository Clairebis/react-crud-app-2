import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateDog() {
  const placeholderImage =
    "https://archive.org/download/placeholder-image/placeholder-image.jpg";
  const { dogId } = useParams();
  const navigate = useNavigate();
  const url = `https://dog-app-7792f-default-rtdb.europe-west1.firebasedatabase.app/dogs/${dogId}.json`;

  const [dog, setDog] = useState({
    name: "",
    breed: "",
    age: "",
    description: "",
    image: "",
    contact: "",
    status: "",
    uid: "",
  });

  useEffect(() => {
    //fetch existing post data based on the dogId
    async function getDog() {
      const response = await fetch(url);
      const dogData = await response.json();
      setDog(dogData);
    }
    getDog();
  }, [url]);

  async function updateDog(dogToUpdate) {
    dogToUpdate.preventDefault();
    dogToUpdate.uid = dog.uid;

    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(dog),
    });

    if (response.ok) {
      console.log("Dog updated");
      navigate("/");
    } else {
      console.log("An error occurred when updating the dog");
    }
  }

  return (
    <section className="page">
      <h1>Update details for {dog.name}</h1>
      <form onSubmit={updateDog}>
        <label>Name</label>
        <input
          type="text"
          value={dog.name}
          onChange={(e) => setDog({ ...dog, name: e.target.value })}
        />
        <label>Breed</label>
        <input
          type="text"
          value={dog.breed}
          onChange={(e) => setDog({ ...dog, breed: e.target.value })}
        />
        <label>Age</label>
        <input
          type="text"
          value={dog.age}
          onChange={(e) => setDog({ ...dog, age: e.target.value })}
        />
        <label>Description</label>
        <textarea
          type="text"
          value={dog.description}
          onChange={(e) => setDog({ ...dog, description: e.target.value })}
        />
        <label>Image</label>
        <input
          type="url"
          value={dog.image}
          onChange={(e) => setDog({ ...dog, image: e.target.value })}
        />
        {dog.image ? (
          <img src={dog.image} alt="Image preview" className="image-preview" />
        ) : (
          <img
            src={placeholderImage}
            alt="PLaceholder Image"
            className="image-preview"
          />
        )}

        <label>Contact</label>
        <input
          type="text"
          value={dog.contact}
          onChange={(e) => setDog({ ...dog, contact: e.target.value })}
        />
        <label>Status</label>

        <select
          value={dog.status}
          onChange={(e) => setDog({ ...dog, status: e.target.value })}
        >
          <option value="Available">Available</option>
          <option value="Adopted">Adopted</option>
        </select>

        <button type="submit">Update</button>
      </form>
    </section>
  );
}
