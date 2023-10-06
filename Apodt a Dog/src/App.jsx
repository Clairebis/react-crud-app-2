import { Routes, Route, Navigate } from "react-router-dom";
import Nav from "./components/Nav";
import DogList from "./pages/DogList";
import NewDog from "./pages/NewDog";
import DogDetails from "./pages/DogDetails";
import UpdateDog from "./pages/UpdateDog";

function App() {
  return (
    <>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<DogList />} />
          <Route path="/add" element={<NewDog />} />
          <Route path="/dogs/:dogId" element={<DogDetails />} />
          <Route path="/dogs/:dogId/update" element={<UpdateDog />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
