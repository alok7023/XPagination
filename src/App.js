import { useState, useEffect } from "react";
import "./App.css";
const URL = `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`;
function App() {
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const fetchData = async () => {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      setTableData(data);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const handlePageChange = (newPage) => setCurrentPage(newPage);

  return (
    <div className="App">
      <h1>Employee Data Table</h1>
      <table className="custom-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((val, key) => (
            <tr key={key}>
              <th>{val.id}</th>
              <th>{val.name}</th>
              <th>{val.email}</th>
              <th>{val.role}</th>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-container">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="current-page">{currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={indexOfLastItem >= tableData.length}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
