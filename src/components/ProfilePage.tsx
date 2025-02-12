import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../styles/modules/profilePage.css';
import { FaUser } from "react-icons/fa";

// Defining the ProfileProps interface to specify the structure of the props passed to the ProfilePage component
interface ProfileProps {
    user: {
        userName: string,
        email:string,
        profilePicture?: string,
    };
    deleteAccount: () => void; // Function to delete the account
}

const ProfilePage: React.FC<ProfileProps> = ({ user, deleteAccount }) => {

    // Function to handle account deletion after confirming with the user
    const handleDeleteAccount = () => {

        // Display a confirmation dialog to the user asking if they are sure they want to delete their account
        const confirmDelete = window.confirm("Are you sure you want to delete your account? This action is irreversible.");
        if(confirmDelete) {
            deleteAccount()
        };
    }
  return (
    <div className="profile-page-container">
    <Card style={{ position: 'relative', width: '12rem', height: '12rem' }}>{/* Card styling with specific width and height */}

      {/* Displaying the user's profile picture if provided, otherwise displaying a default image */}
      <Card.Img variant="top" 
                src={user.profilePicture? user.profilePicture : ""}
                />

        {/* If no profile picture is provided, show the user icon instead */}
        {!user.profilePicture && (
            <FaUser style={{position: 'relative', left:'38%', fontSize: '3rem', color: '#25d366'}} className='user-icon'/>
        )}

      {/* Card body containing the user's details */}
      <Card.Body>
        <Card.Title>Username: {user.userName}</Card.Title>
        <Card.Text>
          Email: {user.email}
        </Card.Text>
        <Button style = {{position: 'absolute', bottom: 0}}
                variant="danger"
                className="mt-3" 
                onClick={handleDeleteAccount} 
        > Delete Account </Button>
      </Card.Body>
    </Card>
    </div>
  );
}

export default ProfilePage;