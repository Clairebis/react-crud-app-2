import User from "./User";

export default function DogCard({ dog }) {
  return (
    <article key={dog.id}>
      <User uid={dog.uid} />
      <img src={dog.image} alt={dog.name} />
      <h3>{dog.name}</h3>
      <p>{dog.breed}</p>
      <p>{dog.age}</p>
      <p>{dog.status}</p>
    </article>
  );
}
