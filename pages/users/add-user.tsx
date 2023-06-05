import { useState } from 'react';
import { useRouter } from 'next/router';
import newRequest from '@/utils/apiCall';
import AddEditUser from '@/components/AddEditUser';


const initialFormVals = { name: "", email: "", password: "", role: "user",issuedBooks: [] }; 

export default function AddUserPage() {
    const [formVals, setFormVals] = useState(initialFormVals);
  const router = useRouter();

  const inputChangeHandler = (e) => {
    setFormVals({ ...formVals, [e.target.id]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    await newRequest.post("users", formVals);
    router.push('/users');
  };

  return (
    <AddEditUser
      formVals={formVals}
      inputChangeHandler={inputChangeHandler}
      handleSubmit={handleSubmit}
      isEditUser={false}
    />
  );
}
