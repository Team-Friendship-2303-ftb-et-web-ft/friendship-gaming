import './Admin.css'
import { changeAdminStatus, deleteUser } from '../api';

const AdminUsers = ({adminUsersList, token, isAdmin}) => {

    
    
    return(
        <div className="container">

        {isAdmin &&
          adminUsersList.map(user => {
              const handleUpdate = async () => {
                  try {
                    let bool = !user.adminDetails.isAdmin;
                    const target = { id: user.id, boolean: bool};
                    await changeAdminStatus(target, token);
                    window.location.reload();

                  } catch (error) {
                    console.error(error);
                  }
                }
              
          return (
            <div key={user.id} id="game">
            <div className="titlebox">
                <p className="title">{user.username}</p>
                {user.adminDetails.isAdmin && <p className="featured">(Admin)</p>}
            </div>
            {user.info &&
            <>
                <p>First Name: {user.info.firstName}</p>
                <p>Last Name: {user.info.lastName}</p>
                <p>Date of Birth: {user.info.dateOfBirth}</p>
                {user.info.address &&
                <>
                    <p>Address:</p>
                    <p>Street: {user.info.address.street_address}</p>
                    <p>City: {user.info.address.city}</p>
                    <p>State: {user.info.address.state}</p>
                    <p>Country: {user.info.address.country}</p>
                    <p>Postal Code: {user.info.address.postal_code}</p>
                </>  
                }
            </>   
            }
            
            <div className="button">
                <button onClick={()=>{handleUpdate()}}>Make Admin</button>
                <button onClick={async()=>{await deleteUser(user.id, token)}}>Delete</button>
            </div>
            </div>
          )
          })
        }
        </div>  
    );
}

export default AdminUsers;