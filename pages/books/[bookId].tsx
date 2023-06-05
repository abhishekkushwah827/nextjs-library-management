import EditBookComponent from '@/components/EditBook';
import newRequest from '@/utils/apiCall';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

const initialFormVals = { name: "", email: "", password: "", role: "user","issuedBooks": [] }; 

function EditBook({book,bookId}) {
  const [formVals, setFormVals] = useState(book);
  const router = useRouter();

  const inputChangeHandler = (e) => {
    setFormVals({ ...formVals, [e.target.id]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("bookId",bookId)
    await newRequest.put(`books/${bookId}`, formVals)
    router.push('/books');
  };

  return (
    <EditBookComponent
      formVals={formVals}
      inputChangeHandler={inputChangeHandler}
      handleSubmit={handleSubmit}
    />
  )
}

export default EditBook;


export async function getServerSideProps(context) {
  const { params } = context
  const { bookId } = params
  const response = await newRequest.get(`books/${bookId}`
  );

  console.log(`Pre-rendering bookId ${bookId}`)
  return {
    props: {
      book: response.data,
      bookId
    }
  }
}