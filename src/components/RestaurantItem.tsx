import { Record } from "../vite-env";
import { useState } from "react";
import { deleteRecordById } from "../helper/fetchHelper";
import { FaTrash } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

interface RestaurantItemProps {
  restaurant: Record;
  savedRestaurants: Record[];
  index: number,
  setSavedRestaurants: React.Dispatch<React.SetStateAction<Record[]>>;
}

const RestaurantItem: React.FC<RestaurantItemProps> = (props) => {

  const [heartClicked, setHeartClicked] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const handleDeleteRestaurant = async () => {
    const newSavedRestaurants = [...props.savedRestaurants];
    newSavedRestaurants.splice(props.index, 1);
    console.log(newSavedRestaurants)
    props.setSavedRestaurants(newSavedRestaurants);
    setDeleteModal(false);
  };

  return (
    <>
      {/* Restaurant Item */}
      <div className="restaurant-item">
        <p className="restaurant-title">{props.restaurant.name}</p>
        <FaHeart className="restaurant-heart-icon" color={ heartClicked ? '#e74c3c' : '#626567'} onClick={() => {
          setHeartClicked(!heartClicked)
        }}/>
        <FaTrash className="restaurant-delete-icon" color={'#626567'} onClick={() => setDeleteModal(true)}/>
      </div>
      
      {/* Delete Modal */}
      {deleteModal && (
        // Clicking outside of the modal will close it
        <div className="modal-outofbox" onClick={() => setDeleteModal(false)}>
          {/* Prevents closing the modal when you click inside it */}
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>Are you sure you want to delete?</h3>

            {/* modal btns Cancel & Delete */}
            <div className="del-modal-btns">
              <button
                className="del-modal-cancel"
                onClick={() => setDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="del-modal-delete"
                onClick={() => handleDeleteRestaurant()}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RestaurantItem;
