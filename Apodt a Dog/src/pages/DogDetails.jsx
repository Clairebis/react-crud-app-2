import { useNavigate, useParams } from "react-router-dom";
import User from "../components/User";
import { useEffect, useState } from "react";

export default function DogDetails() {
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

  return (
    <>
      <section className="page">
        <h1>Read all about {dog.name}</h1>
        <article>
          <User uid={dog.uid} />
          <img src={dog.image} alt={dog.name} className="image-preview" />
          <h3>{dog.name}</h3>
          <p>{dog.breed}</p>
          <p>{dog.age}</p>
          <p>{dog.status}</p>
          <p>{dog.description}</p>
          <p>{dog.contact}</p>
          <button onClick={() => navigate(-1)}>Back to overview</button>
        </article>
        /{" "}
      </section>
    </>
  );
}
