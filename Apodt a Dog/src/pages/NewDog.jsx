import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewDog() {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const placeholderImage =
    "https://archive.org/download/placeholder-image/placeholder-image.jpg";

  /*handleImageChange is called when the user selects a file. It reads the file and sets the imageFile state to the file. The imageFile state is used to display a preview of the image.*/
  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file.size < 500000) {
      //image file size must be less than 0.5MB
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
      setErrorMessage(""); // reset errorMessage state
    } else {
      setErrorMessage("Image file size must be less than 0.5MB");
    }
  }

  async function uploadImage() {
    //url to new image - make sure to have the correct firebase project id
    const url = `https://firebasestorage.googleapis.com/v0/b/dog-app-7792f.appspot.com/o/${imageFile.name}`;
    //POST request to upload image
    const response = await fetch(url, {
      method: "POST",
      body: imageFile,
      headers: { "Content-Type": imageFile.type },
    });
    const data = await response.json();
    console.log(data); // data response from image upload
    const imageUrl = `${url}?alt=media`;
    return imageUrl;
  }

  async function createDog(event) {
    event.preventDefault();
    const imageUrl = await uploadImage();

    const newDog = {
      name: name,
      breed: breed,
      age: age,
      description: description,
      image: imageUrl,
      contact: contact,
      status: status,
      uid: "fTs84KRoYw5pRZEWCq2Z",
    };

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
    console.log(newDog);
  }

  return (
    <section className="page">
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
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <p className="text-error">{errorMessage}</p>
        {image ? (
          <img src={image} alt="Image preview" className="image-preview" />
        ) : (
          <img
            src={placeholderImage}
            alt="Placeholder Image"
            className="image-preview"
          />
        )}

        <label>Contact</label>
        <input
          type="text"
          placeholder="Contact info"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <label>Status</label>
        <select onChange={(e) => setStatus(e.target.value)}>
          <option value="Available">Available</option>
          <option value="Adopted">Adopted</option>
        </select>

        <button type="submit">Add</button>
      </form>
    </section>
  );
}
