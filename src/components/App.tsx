import { useEffect, useState } from "react";
import FoodList from "./FoodList.tsx";

function App() {
  // useStates and variables
  let url = "http://localhost:8080/";
  const [foods, setFoods] = useState<string[]>([]);

  // useEffects
  // useEffect(() => {
  //   getFood();
  // }, []);

  // handler functions
  async function getFood() {}

  // return

  return (
    <>
      <nav className='l-header header'>
        <h1>What's Eat</h1>
      </nav>
      <FoodList />
    </>
  );
}

export default App;
