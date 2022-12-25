import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const Profile = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showEditField, setShowEditField] = useState(false);
    const [showEditPasswordField, setShowEditPasswordField] = useState(false);
  return (
    <div className='profile container mt-5' >
        <h2 className='mt-5'>Profile</h2>

        <h4 className='mx-auto' style={{width: "200px"}}>Welcome, Name</h4>
        <button className='btn btn-primary d-block' onClick={() => setShowEditField(!showEditField)}>
            Edit Profile
        </button>

        {showEditField && 
        <form>
            <div class="row mt-4">
                <div class="col">
                    <label for='name'>Name: </label>
                    <input type="text" readOnly id='name' name='name' class="form-control" value='name' />
                </div>
                <div class="col">
                <label for='surname'>Surname: </label>
                    <input type="text" name='surname' class="form-control" id='surname' value="Surname" />
                </div>
            </div>
            <div class="row mt-4">
                <div class="col">
                    <label for="address" class="form-label">Address: </label>
                    <input type="text" name='email' class="form-control" id="address" value='address' />
                </div>
                <div class="col">
                    <label for="phone" class="form-label">Phone: </label>
                    <input type="number" name='phone' class="form-control" id="phone" value='Phone' />
                </div>
            </div>
        </form>}
        
        <button className='btn btn-primary my-5' onClick={() => setShowEditPasswordField(!showEditPasswordField)}>Change Password</button>
        {showEditPasswordField && 
        <div class="row">          
             <label for="password" class="form-label">Password: </label>
            <div className="col position-relative">
                <input
                type="password" 
                name='password' 
                class="form-control" 
                id="password" 
                value='password'
                />
                <Icon 
                //showPassword ? "icon='mdi:eye-off'" : "ic:baseline-remove-red-eye"
                icon='mdi:eye-off'
                className='position-absolute top-0 end-0'
                style={{margin: "7px 20px 0 0"}}
                width="25"
                />
            </div>
            <label for="password" class="form-label">Password: </label>
            <div className="col position-relative">
                <input
                type="password" 
                name='password' 
                class="form-control" 
                id="password" 
                value='password'
                />
                <Icon 
                //showPassword ? "icon='mdi:eye-off'" : "ic:baseline-remove-red-eye"
                icon='mdi:eye-off'
                className='position-absolute top-0 end-0'
                style={{margin: "7px 20px 0 0"}}
                width="25"
                />
            </div>
        </div>}
    </div>
  )
}

export default Profile