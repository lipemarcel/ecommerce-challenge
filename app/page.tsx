import FilterNavigation from "./components/filter_navigation";
import PlanetsList from "./components/planets-list";

export default function Home() {
  return (
    <header>
      <h1>Star Wars Characters</h1>
      <PlanetsList />
    </header>
  );
}