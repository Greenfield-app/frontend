import { RecordWithFood } from "../vite-env";
import { useState, MouseEvent } from "react";
import { deleteRecordById } from "../helper/fetchHelper";
import trashIcon from "../assets/icons/icon-monster-trash.svg";

interface FoodCardProps {
  recordWithFood: RecordWithFood;
  recordsWithFood: RecordWithFood[];
  setRecordsWithFood: Function;
}
const FoodCard: React.FC<FoodCardProps> = ({
  recordWithFood,
  recordsWithFood,
  setRecordsWithFood,
}) => {
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const handleDeleteFood = async (e: MouseEvent<HTMLButtonElement>) => {
    console.log(" was deleted!", recordWithFood.record.recordId);
    // delete in database
    const result = await deleteRecordById(recordWithFood.record.recordId);
    setRecordsWithFood((prev: RecordWithFood[]) =>
      prev.filter(
        (data: RecordWithFood) =>
          data.record.recordId !== recordWithFood.record.recordId
      )
    );
    console.log(result);
    setDeleteModal(false);
  };

  return (
    <>
      {/* Food Card  w/trashIcon*/}
      <div className="food-card">
        <h3 className="food-title">{recordWithFood.food.foodName}</h3>
        <img
          className="food-delete-icon"
          src={trashIcon}
          alt="red trash icon"
          onClick={() => setDeleteModal(true)}
        />
      </div>
      {/* Delete Modal */}
      {deleteModal && (
        // Everything in the screen if clicked will setDeleteModal = false
        <div className="modal-outofbox" onClick={() => setDeleteModal(false)}>
          {/* prevents the above function to effect the modal itself => stopPropagation */}
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
                onClick={(e) => handleDeleteFood(e)}
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
