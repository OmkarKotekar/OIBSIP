import React, { useState } from "react";

export default function List({ entries, setEntries }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);

  // Function to delete an entry
  const handleDelete = (id) => {
    const filteredEntries = entries.filter((entry) => entry.id !== id);
    setEntries(filteredEntries);
    localStorage.setItem("entries", JSON.stringify(filteredEntries)); // Update local storage
  };

  // Function to handle status changes
  const handleStatusChange = (id, newStatus) => {
    const updatedEntries = entries.map((entry) =>
      entry.id === id ? { ...entry, status: newStatus } : entry
    );
    setEntries(updatedEntries);
    localStorage.setItem("entries", JSON.stringify(updatedEntries)); // Update local storage
  };

  // Open modal with task data
  const openEditModal = (task) => {
    setEditTask(task);
    setIsModalOpen(true);
  };

  // Handle form submission to update task
  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedEntries = entries.map((entry) =>
      entry.id === editTask.id
        ? { ...entry, title: editTask.title, description: editTask.description }
        : entry
    );
    setEntries(updatedEntries);
    localStorage.setItem("entries", JSON.stringify(updatedEntries)); // Update local storage
    setIsModalOpen(false);
  };

  // Handle input changes for the modal form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditTask({ ...editTask, [name]: value });
  };

  // Separate completed tasks from others
  const completedTasks = entries.filter((entry) => entry.status === "Completed");
  const otherTasks = entries.filter((entry) => entry.status !== "Completed");

  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-10">
      {/* Main Tasks Section */}
      <div className="rounded-lg shadow-md p-4 w-full max-w-3xl">
        <h2 className="text-lg font-semibold mb-4 text-white">Tasks</h2>
        {otherTasks.length > 0 ? (
          <table className="w-full table-fixed border-collapse">
            <thead>
              <tr className="text-white">
                <th className="w-1/4 p-3 text-center font-semibold">Title</th>
                <th className="w-1/4 p-3 text-center font-semibold">Description</th>
                <th className="w-1/4 p-3 text-center font-semibold">Status</th>
                <th className="w-1/4 p-3 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {otherTasks.map((entry) => (
                <tr
                  key={entry.id}
                  className="bg-white border-t border-gray-300 hover:bg-gray-50"
                >
                  <td className="p-3 text-gray-800 text-justify">{entry.title}</td>
                  <td className="p-3 text-gray-800 text-justify">{entry.description}</td>
                  <td className="p-3 text-gray-800 text-justify">
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => handleStatusChange(entry.id, "Pending")}
                        className={`px-3 py-1 rounded-full shadow focus:outline-none ${
                          entry.status === "Pending"
                            ? "bg-yellow-500 text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        Pending
                      </button>
                      <button
                        onClick={() => handleStatusChange(entry.id, "Ongoing")}
                        className={`px-3 py-1 rounded-full shadow focus:outline-none ${
                          entry.status === "Ongoing"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        Ongoing
                      </button>
                      <button
                        onClick={() => handleStatusChange(entry.id, "Completed")}
                        className={`px-3 py-1 rounded-full shadow focus:outline-none ${
                          entry.status === "Completed"
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        Completed
                      </button>
                    </div>
                  </td>
                  <td className="p-10 flex justify-center space-x-2">
                    <button
                      onClick={() => openEditModal(entry)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-full shadow hover:bg-blue-600 focus:outline-none"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-full shadow hover:bg-red-600 focus:outline-none"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-white">No tasks to do</p>
        )}
      </div>

      {/* Completed Tasks Section */}
      <div className="rounded-lg shadow-md p-4 w-full max-w-3xl">
        <h2 className="text-lg font-semibold mb-4 text-white">Completed Tasks</h2>
        {completedTasks.length > 0 ? (
          <table className="w-full table-fixed border-collapse">
            <thead>
              <tr className="text-white">
                <th className="w-1/4 p-3 text-center font-semibold">Title</th>
                <th className="w-1/4 p-3 text-center font-semibold">Description</th>
                <th className="w-1/4 p-3 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {completedTasks.map((entry) => (
                <tr
                  key={entry.id}
                  className="bg-white border-t border-gray-300 hover:bg-gray-50"
                >
                  <td className="p-3 text-gray-800 text-justify">{entry.title}</td>
                  <td className="p-3 text-gray-800 text-justify">{entry.description}</td>
                  <td className="p-10 flex justify-center">
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-full shadow hover:bg-red-600 focus:outline-none"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-white">No completed tasks</p>
        )}
      </div>

      {/* Modal for editing a task */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={editTask.title}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  value={editTask.description}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
