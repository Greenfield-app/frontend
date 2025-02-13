import { RecordWithFood } from "../vite-env";
import { useState } from "react";
import { deleteRecordById } from "../helper/fetchHelper";
import trashIcon from "../assets/icons/icon-monster-trash.svg";
import ListGroup from 'react-bootstrap/ListGroup';
import { FaTrash } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const RestaurantItem = () => {
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const handleDeleteRestaurant = async () => {
    console.log(recordWithFood);
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
      <ListGroup.Item className="restaurant-item">
        <h3 className="restaurant-title">Food</h3>
        <FaHeart className="restaurant-heart-icon" color={'#e74c3c'}/>
        <FaTrash className="restaurant-delete-icon" color={'#626567'} onClick={() => setDeleteModal(true)}/>
      </ListGroup.Item>
      
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
