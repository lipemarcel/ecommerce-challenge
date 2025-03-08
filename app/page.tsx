import CharactersList from "./components/characters-list";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-8 py-12">
        <h1 className="text-4xl font-normal text-gray-900 dark:text-white mb-4">
          Star Wars Characters
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-12">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </p>
        <CharactersList />
      </div>
    </main>
  );
}