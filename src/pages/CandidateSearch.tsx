import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import CandObj from '../interfaces/Candidate.interface';
import { BasicUser } from '../interfaces/Candidate.interface';
const CandidateSearch = () => {
  const [detailedUsers, setDetailedUsers] = useState<CandObj[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0); // Track the index of the current candidate

  // Fetch users and details
  useEffect(() => {
    const fetchUsers = async () => {
      const basicUsers: BasicUser[] = await searchGithub();
      const detailedData: CandObj[] = await Promise.all(
        basicUsers.map(async (user): Promise<CandObj> => await searchGithubUser(user.login))
      );
      setDetailedUsers(detailedData);
    };

    fetchUsers();
  }, []);

  // Show previous candidate
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : detailedUsers.length - 1));
  };

  // Show next candidate
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < detailedUsers.length - 1 ? prevIndex + 1 : 0));
  };

  // Save selected user to localStorage
  const handleSaveUser = () => {
    const selectedUser = detailedUsers[currentIndex];
    if (selectedUser) {
      const savedUsers = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      if (!savedUsers.some((user: CandObj) => user.id === selectedUser.id)) {
        savedUsers.push(selectedUser);
        localStorage.setItem('savedCandidates', JSON.stringify(savedUsers));
      }
    }
  };

  return (
    <div>
      <h1>Candidate Search</h1>

      {/* Display only one candidate at a time */}
      {detailedUsers.length > 0 && (
        <div className="selected-user">
          <img src={detailedUsers[currentIndex].avatar_url} alt={detailedUsers[currentIndex].login} width={100} />
          <p>User Name: {detailedUsers[currentIndex].login}</p>
          <p>Email: {detailedUsers[currentIndex].email || 'Not Available'}</p>
          <p>Company: {detailedUsers[currentIndex].company || 'Not Available'}</p>
          <p>Location: {detailedUsers[currentIndex].location || 'Not Available'}</p>
          <p>Bio: {detailedUsers[currentIndex].bio || 'Not Available'}</p>
          <button onClick={handleSaveUser}>Save to Favorites</button>
        </div>
      )}

      {/* Navigation buttons */}
      <div>
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default CandidateSearch;