import './App.css';
import MovieSubmission from './components/MovieSubmission';
import MovieList from './components/MovieList'

function App() {
  return (
    <div className="App">
      <MovieList></MovieList>
      <MovieSubmission></MovieSubmission>
    </div>
  );
}

export default App;
