import { FoodInfo } from "../vite-env";
import { useEffect } from "react";

// types from App.tsx
interface FoodListProps {
  setFoods: React.Dispatch<React.SetStateAction<FoodInfo[]>>; // to be used for deleting and editing Food Cards
  foods: FoodInfo[]; // to get current Food list
}

//  (props) temp removed for build
const FoodList: React.FC<FoodListProps> = (props) => {
  // temporary food list until database/ apis done
  const sampleFoods: FoodInfo[] = [
    { id: 1, name: "ramen", description: null },
    { id: 2, name: "yakiniku", description: null },
    { id: 3, name: "mexican", description: null },
    { id: 4, name: "italian", description: null },
    { id: 5, name: "pizza", description: null },
    { id: 6, name: "sushi", description: null },
    { id: 7, name: "oden", description: null },
  ];

  // set foods state to the samples

  useEffect(() => {
    props.setFoods(sampleFoods);
  }, []);

  return (
    <ul className="food-list l-food-list">
      {sampleFoods.map((food) => (
        <li key={food.id} className="food">
          {food.name}
        </li>
      ))}
    </ul>
  );
};

export default FoodList;
