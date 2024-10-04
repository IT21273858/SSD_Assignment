import express from 'express';
import mongoose from 'mongoose';

import ProfileModel from '../models/ProfileModel.js';

const router = express.Router();

export const getProfiles = async (req, res) => { 
  console.log("from server 1")
  try {
      const allProfiles = await ProfileModel.find().sort({ _id: -1 });
              
      res.status(200).json(allProfiles);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
}

export const getProfile = async (req, res) => { 
  const { id } = req.params;

  try {
    console.log("Income to get profile -");
    
      const profile = await ProfileModel.findById(id);
      
      res.status(200).json(profile);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
}

export const createProfile = async (req, res) => {
  const {
    name,
    email,
    phoneNumber,
    businessName,
    contactAddress, 
    logo,
    website,
    userId,
   } = req.body;
  
  
  const newProfile = new ProfileModel({
    name,
    email,
    phoneNumber,
    businessName,
    contactAddress, 
    logo,
    website,
    userId,
    createdAt: new Date().toISOString() 
  })

  try {
    const existingUser = await ProfileModel.findOne({ email })

    if(existingUser) return res.status(404).json({ message: "Profile already exist" })
      await newProfile.save();

      res.status(201).json(newProfile );
  } catch (error) {
      res.status(409).json({ message: error.message });
  }
}



export const getProfilesByUser = async (req, res) => {
  console.log("Incoming request to get profile by userId");
  
  const {  userId } = req.query;
  var userdetails;

  try {
    console.log("Fetching profile for userId:",  userId);
    
    // Searching for a profile by the userId
const profiler = await ProfileModel.find()
.then((data) => {
  console.log("Data is ", data);
  data.filter((user)=>(user.userId==userId))
  console.log("filter",data);
  userdetails=data
}).catch((error) => {
  console.error("Error fetching profile:", error);
});


  

    
    if (!userdetails) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    console.log("Profile data found:", userdetails);

    // Return the profile data directly
    return res.status(200).json({
      data:userdetails[0]
    });
  } catch (error) {    
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: error.message });
  }
}




export const getProfilesBySearch = async (req, res) => {
  const { searchQuery } = req.query;

  try {
      const name = new RegExp(searchQuery, "i");
      const email = new RegExp(searchQuery, "i");

      const profiles = await ProfileModel.find({ $or: [ { name }, { email } ] });

      res.json({ data: profiles });
  } catch (error) {    
      res.status(404).json({ message: error.message });
  }
}


export const updateProfile = async (req, res) => {
  const { id: _id } = req.params;
  const profile = req.body;

  // Validate the ObjectId
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('No profile with that id');
  }

  try {
    // Attempt to update the profile
    const updatedProfile = await ProfileModel.findByIdAndUpdate(_id, { ...profile, _id }, { new: true });

    // Check if the profile was found and updated
    if (!updatedProfile) {
      return res.status(404).send('No profile found to update');
    }

    // Send the updated profile as response
    res.json(updatedProfile);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(409).json({ message: error.message });
  }
};


  export const deleteProfile = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No profile with id: ${id}`);

    await ProfileModel.findByIdAndRemove(id);

    res.json({ message: "Profile deleted successfully." });
}



// // Function call
// ProfileModel.insertMany([
//   { name: 'Gourav', age: 20},
//   { name: 'Kartik', age: 20},
//   { name: 'Niharika', age: 20}
// ]).then(function(){
//   console.log("Data inserted")  // Success
// }).catch(function(error){
//   console.log(error)      // Failure
// });