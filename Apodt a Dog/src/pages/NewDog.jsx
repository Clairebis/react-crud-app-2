import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewDog() {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState("");

  const newDog = {
    name: name,
    breed: breed,
    age: age,
    description: description,
    image: image,
    contact: contact,
    status: status,
    uid: "fTs84KRoYw5pRZEWCq2Z",
  };

  const navigate = useNavigate();

  const placeholderImage =
    "https://archive.org/download/placeholder-image/placeholder-image.jpg";

  console.log(newDog);

  async function createDog(event) {
    event.preventDefault();

    newDog.uid = "fTs84KRoYw5pRZEWCq2Z";

    const url =
      "https://dog-app-7792f-default-rtdb.europe-west1.firebasedatabase.app/dogs.json";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(newDog),
    });

    if (response.ok) {
      console.log("Dog added");
      navigate("/");
    } else {
      console.log("An error occurred when adding the dog");
    }
  }

  return (
    <section>
      <h1>Add a Dog</h1>
      <form onSubmit={createDog}>
        <label>Name</label>
        <input
          type="text"
          placeholder="Dog's name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Breed</label>
        <input
          type="text"
          placeholder="Dog's breed"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
        />
        <label>Age</label>
        <input
          type="text"
          placeholder="Dog's age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <label>Description</label>
        <textarea
          type="text"
          placeholder="Information about the dog, e.g. personality, likes, dislikes, etc."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Image</label>
        <input
          type="url"
          placeholder="Paste image url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        {image ? (
          <img src={image} alt="Image preview" />
        ) : (
          <img src={placeholderImage} alt="PLaceholder Image" />
        )}

        <label>Contact</label>
        <input
          type="text"
          placeholder="Contact info"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <label>Status</label>
        <input
          type="text"
          placeholder="e.g. Available / Adopted"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />

        <button type="submit">Add dog</button>
      </form>
    </section>
  );
}
