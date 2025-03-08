import FilterNavigation from "./components/filter-navigation";
import CharactersList from "./components/characters-list";

export default function Home() {
  return (
    <header className="flex flex-col gap-[25px] p-5">
      <h1 className="font-light text-[54px] leading-[64px] tracking-[0%]">
        Star Wars Characters
      </h1>
      <p className="font-light text-[22px] leading-[32px] tracking-[0.92px] text-[#666666]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo reprehenderit numquam explicabo vel, non mollitia enim nulla, a, cum quam sit quisquam impedit temporibus expedita? Assumenda doloremque animi amet numquam.
      </p>
      <CharactersList />
    </header>
  );
}