import "./App.css";
import Search from "./components/search/Search";

function App() {
  const handleOnSearchChange = (searchData) => {
    console.log(searchData);
  };
  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
    </div>
  );
}

export default App;

//12minuti https://www.youtube.com/watch?v=Reny0cTTv24&t=1105s
