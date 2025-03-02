import FilterNavigation from "./components/filter-navigation";
import CharactersList from "./components/characters-list";

export default function Home() {
  return (
    <header>
      <h1>Star Wars Characters</h1>
      <CharactersList />
    </header>
  );
}