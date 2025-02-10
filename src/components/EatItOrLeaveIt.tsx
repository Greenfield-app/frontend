import "../styles/modules/eatitorleaveit.css";
import { FoodInfo, UserInfo, FoodInfoDisplay } from "../vite-env";
import { sendNewRecord, fetchRecommendation } from "../helper/fetchHelper";
import { useState, useEffect, MouseEvent } from "react";
import trashIcon from "../assets/icons/icon-monster-trash.svg";
import eatIcon from "../assets/icons/eat.svg";

interface EatItOrLeaveItProps {
  currentUser: UserInfo;
  setView: Function;
  availableFoodsWithImg: FoodInfoDisplay[];
  setAvailableFoodsWithImg: (foodInfoDisplay: FoodInfoDisplay[]) => void;
}

const EatItOrLeaveIt: React.FC<EatItOrLeaveItProps> = ({
  currentUser,
  setView,
  availableFoodsWithImg,
  setAvailableFoodsWithImg,
}) => {
  // random food for picking recommendation from foods array
  const [randomFood, setRandomFood] = useState<FoodInfoDisplay | null>(null);
  useEffect(() => {
    const resolveRecommendation = async () => {
      const recommendationResponse: FoodInfoDisplay[] =
        await fetchRecommendation(0);
      console.log(recommendationResponse);
      setRandomFood(recommendationResponse[0]);
    };
    resolveRecommendation();
  }, []);

  useEffect(() => {}, [randomFood]);
  const handleDeleteFood = (e: MouseEvent<HTMLImageElement>) => {
    console.log(e, " was deleted!");
    //change to get next food
  };

  const handleEatFood = async (e: MouseEvent<HTMLImageElement>) => {
    console.log(e, "was eaten!");
    console.log(currentUser, randomFood, " was eaten!");
    // const response = await sendNewRecord(currentUser.userId, randomFood.foodId);
    // console.log(response);
    // send to database Records of when eaten
  };

  return (
    <>
      <nav className="l-header header">
        <h1 onClick={() => setView("home")}>What's Eat</h1>
        <h1 onClick={() => setView("loginpage")}>Logout</h1>
      </nav>
      <div className="eatitorleaveit-container">
        <h1>Eat it or leave it</h1>
        {/* <h2>{randomFood.name}</h2> currently doesn't work, will need to refactor*/}

        <li className="food">
          {randomFood && (
            <div>
              <img
                src={trashIcon}
                alt="trash icon"
                className="food-delete-icon"
                onClick={(e) => handleDeleteFood(e)}
              />
              <img src={randomFood.image} alt="" />
              <h3 className="food-title">Ramen</h3>
              <img
                className="food-eat-icon"
                src={eatIcon}
                alt="red trash icon"
                onClick={(e) => handleEatFood(e)}
              />
            </div>
          )}
        </li>
      </div>
    </>
  );
};

export default EatItOrLeaveIt;
