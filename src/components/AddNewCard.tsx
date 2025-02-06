type AddNewCardProps = {};
import "../styles/modules/addnewcard.css";
//  (props) temp removed for build
const AddNewCard: React.FC<AddNewCardProps> = (props) => {
  return (
    // <ul className="">
    //   <li className="food">
    //     <input type="text" placeholder="name" />
    //     <input type="text" placeholder="description" />
    //   </li>
    // </ul>
    <div className="addnewcardview">
      <div className="newcard">
        <label htmlFor="">Add new food!</label>
        <input type="text" placeholder="name" />
        <input type="text" placeholder="description" />
      </div>
    </div>
  );
};

export default AddNewCard;
