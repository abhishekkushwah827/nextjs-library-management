import AddEditUser from '@/components/AddEditUser';
import newRequest from '@/utils/apiCall';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

const initialFormVals = { name: "", email: "", password: "", role: "user",issuedBooks: [] }; 

function EditUser({user,userId}) {
  const [formVals, setFormVals] = useState(user);
  const router = useRouter();

  const inputChangeHandler = (e) => {
    setFormVals({ ...formVals, [e.target.id]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("userId",userId)
    await newRequest.put(`users/${userId}`, formVals)
    router.push('/users');
  };

  return (
    <AddEditUser
      formVals={formVals}
      inputChangeHandler={inputChangeHandler}
      handleSubmit={handleSubmit}
      isEditUser={true}
    />
  )
}

export default EditUser;


export async function getServerSideProps(context) {
  const { params } = context
  const { userId } = params
  const response = await newRequest.get(`users/${userId}`
  );
  // const data = await response.json()

  console.log(`Pre-rendering userID ${userId}`)
  return {
    props: {
      user: response.data,
      userId
    }
  }
}