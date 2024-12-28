import React, { useState, useEffect } from "react";
import Form from "@/components/Form";
import List from "@/components/List";

export default function App() {
  const [entries, setEntries] = useState([]);

  // Load entries from localStorage on mount
  useEffect(() => {
    const storedEntries = localStorage.getItem("entries");
    if (storedEntries) {
      setEntries(JSON.parse(storedEntries));
    }
  }, []);

  // Function to add a new entry
  const handleAddEntry = (newEntry) => {
    const updatedEntries = [
      ...entries,
      { id: entries.length + 1, status: "Pending", ...newEntry },
    ];
    setEntries(updatedEntries);
    localStorage.setItem("entries", JSON.stringify(updatedEntries));
  };

  return (
    <div className="min-h-[80vh]" style={{ backgroundColor: "#0e3b52" }}>
      <div className="flex justify-around top-0">
        <div className="fixed top-28 left-0 h-full p-4 shadow-lg">
          <Form onAddEntry={handleAddEntry} />
        </div>
        <div className="ml-[25%] w-[75%]">
          <List entries={entries} setEntries={setEntries} />
        </div>
      </div>
    </div>
  );
}
