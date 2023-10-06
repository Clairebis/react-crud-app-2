import { useNavigate } from "react-router-dom";
import User from "./User";

export default function DogCard({ dog }) {
  const navigate = useNavigate();

  function updateClick() {
    navigate(`/dogs/${dog.id}/update`);
  }

  function readMoreClick() {
    navigate(`/dogs/${dog.id}`);
  }

  return (
    <article key={dog.id}>
      <User uid={dog.uid} />
      <img src={dog.image} alt={dog.name} />
      <h3>{dog.name}</h3>
      <p>{dog.breed}</p>
      <p>{dog.age}</p>
      <p>{dog.status}</p>
      <button key={dog.id} onClick={readMoreClick} type="submit">
        Read More
      </button>
      <button key={dog.id} onClick={updateClick} type="submit">
        Update
      </button>
    </article>
  );
}
