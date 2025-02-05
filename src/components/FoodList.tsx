type FoodListProps = {};

const FoodList: React.FC<FoodListProps> = (props) => {
  return (
    <div className='food-list'>
      <div className='food'>ramen</div>
      <div className='food'>yakiniku</div>
      <div className='food'>mexican</div>
      <div className='food'>italian</div>
      <div className='food'>pizza</div>
    </div>
  );
};

export default FoodList;
