import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pastSearches, setPastSearches] = useState([]);

  useEffect(() => {
    fetchUsers();
    const storedSearches = JSON.parse(localStorage.getItem('pastSearches')) || [];
    setPastSearches(storedSearches);
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUsers(data);
      setAllUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const searchUser = () => {
    if (searchTerm.trim() === '') {
      alert('Please enter a search term.');
      return;
    }
    const searchResult = allUsers.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setUsers(searchResult);
    const updatedPastSearches = [...pastSearches, searchTerm];
    setPastSearches(updatedPastSearches);
    localStorage.setItem('pastSearches', JSON.stringify(updatedPastSearches));
  };

  const showPastSearch = () => {
    alert('Past Searches:\n' + pastSearches.join('\n'));
  };

  const sortByName = () => {
    const sortedUsers = [...users].sort((a, b) => a.name.localeCompare(b.name));
    setUsers(sortedUsers);
  };

  const resetSearch = () => {
    setUsers(allUsers);
    setSearchTerm('');
  };

  const clearPastSearches = () => {
    setPastSearches([]);
    localStorage.removeItem('pastSearches');
  };

  return (
    <div className="App container mt-5">
      <div className="mb-3">
        <input 
          type="text" 
          className="form-control d-inline w-auto"
          placeholder="Search by name..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-primary mx-2" onClick={searchUser}>Search</button>
        <button className="btn btn-secondary mx-2" onClick={showPastSearch}>Past Searches</button>
        <button className="btn btn-info mx-2" onClick={sortByName}>Sort by Name</button>
        <button className="btn btn-warning mx-2" onClick={resetSearch}>Reset</button>
        <button className="btn btn-danger mx-2" onClick={clearPastSearches}>Clear Past Searches</button>
      </div>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}</td>
              <td>{user.company.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
