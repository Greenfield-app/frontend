type FoodListProps = {};
//  (props) temp removed for build
const FoodList: React.FC<FoodListProps> = () => {
  return (
    <ul className="food-list l-food-list">
      <li className="food">ramen</li>
      <li className="food">yakiniku</li>
      <li className="food">mexican</li>
      <li className="food">italian</li>
      <li className="food">pizza</li>
    </ul>
  );
};

export default FoodList;
