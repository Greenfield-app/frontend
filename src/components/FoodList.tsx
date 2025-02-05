type FoodListProps = {};
//  (props) temp removed for build
const FoodList: React.FC<FoodListProps> = () => {
  return (

<!--     <div className="food-list">
      <div className="food">ramen</div>
      <div className="food">yakiniku</div>
      <div className="food">mexican</div>
      <div className="food">italian</div>
      <div className="food">pizza</div>
    </div> -->

    <ul className='food-list l-food-list'>
      <li className='food'>ramen</li>
      <li className='food'>yakiniku</li>
      <li className='food'>mexican</li>
      <li className='food'>italian</li>
      <li className='food'>pizza</li>
    </ul>

  );
};

export default FoodList;
