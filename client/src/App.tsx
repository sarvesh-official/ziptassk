
import "./App.css";
import Navbar from "./components/Navbar";
import Tasks from "./Tasks";
import TodoDetails from "./TodoDetails";
function App() {
  const isTodoDetailsPage = window.location.pathname === "/todo" || window.location.pathname === "/todo/";
  return (
    <>
      <Navbar />
      {isTodoDetailsPage ? <TodoDetails /> : <Tasks />}
    </>
  );
}

export default App;
