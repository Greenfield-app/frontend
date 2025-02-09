import { FoodInfo } from "../vite-env";
import { useState } from "react";
import trashIcon from "../assets/icons/icon-monster-trash.svg";

const FoodCard: React.FC<{ food: FoodInfo }> = ({ food }) => {
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const handleDeleteFood = (foodCard: FoodInfo) => {
    console.log(foodCard, " was deleted!");
    // delete in database
    setDeleteModal(false);
  };

  return (
    <>
      {/* Food Card  w/trashIcon*/}
      <div className='food-card'>
        <h3 className='food-title'>{food.foodName}</h3>
        <img
          className='food-delete-icon'
          src={trashIcon}
          alt='red trash icon'
          onClick={() => setDeleteModal(true)}
        />
      </div>
      {/* Delete Modal */}
      {deleteModal && (
        // Everything in the screen if clicked will setDeleteModal = false
        <div className='modal-outofbox' onClick={() => setDeleteModal(false)}>
          {/* prevents the above function to effect the modal itself => stopPropagation */}
          <div className='modal-box' onClick={(e) => e.stopPropagation()}>
            <h3>Are you sure you want to delete?</h3>

            {/* modal btns Cancel & Delete */}
            <div className='del-modal-btns'>
              <button
                className='del-modal-cancel'
                onClick={() => setDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className='del-modal-delete'
                onClick={() => handleDeleteFood(food)}
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

export default FoodCard;
