import CommentsList from "./components/CommentsList";
import ItemList from "./components/ItemList";
import "./App.css";

function App() {
  return (
    <main className="main-wrapper">
      <header className="info-header">
        <h1>DAYRY APP</h1>
        <p>Comments with no sense</p>
      </header>
      <div className="sections-wrapper">
        <ItemList />

        <CommentsList />
      </div>
    </main>
  );
}

export default App;
