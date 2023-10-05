import { Routes, Route, Navigate } from "react-router-dom";
import Nav from "./components/Nav";
import DogList from "./pages/DogList";
import NewDog from "./pages/NewDog";

function App() {
  return (
    <>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<DogList />} />
          <Route path="/add" element={<NewDog />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
