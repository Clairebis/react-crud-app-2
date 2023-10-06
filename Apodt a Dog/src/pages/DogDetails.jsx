import User from "../components/User";

export default function DogDetails({ dog }) {
  return (
    <>
      <h1>Read all about: {dog.name}</h1>
      <article>
        <User uid={dog.uid} />
        <img src={dog.image} alt={dog.name} />
        <h3>{dog.name}</h3>
        <p>{dog.breed}</p>
        <p>{dog.age}</p>
        <p>{dog.status}</p>
      </article>
    </>
  );
}
