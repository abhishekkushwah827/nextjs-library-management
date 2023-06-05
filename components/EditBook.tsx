import React from 'react'

function EditBook({ handleSubmit, inputChangeHandler, formVals }) {
    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4 text-center"> Edit Book</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formVals.title}
                        onChange={inputChangeHandler}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="author" className="block text-gray-700 font-bold mb-2">
                        Author
                    </label>
                    <input
                        type="text"
                        id="author"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formVals.author}
                        onChange={inputChangeHandler}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="available" className="block text-gray-700 font-bold mb-2">
                    Available
                    </label>
                    <input
                        type="text"
                        id="available"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formVals.available}
                        onChange={inputChangeHandler}
                        required
                    />
                </div>
               
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Edit Book
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditBook