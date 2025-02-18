import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import CandObj from '../interfaces/Candidate.interface';
import { BasicUser } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [detailedUsers, setDetailedUsers] = useState<CandObj[]>([]); 
  const [currentIndex, setCurrentIndex] = useState<number>(0); 
  const [endOfCandidates, setEndOfCandidates] = useState<boolean>(false); 

  
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

  
  const handleSaveUser = () => {
    const selectedUser = detailedUsers[currentIndex];
    if (selectedUser) {
      const savedUsers = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      if (!savedUsers.some((user: CandObj) => user.id === selectedUser.id)) {
        savedUsers.push(selectedUser);
        localStorage.setItem('savedCandidates', JSON.stringify(savedUsers));
      }
    }
    moveToNextCandidate();
  };

 
  const handleSkipUser = () => {
    moveToNextCandidate();
  };

  
  const moveToNextCandidate = () => {
    if (currentIndex < detailedUsers.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      setEndOfCandidates(true);
    }
  };

  return (
    <div>
      <h1>Candidate Search</h1>

      
      {detailedUsers.length > 0 && !endOfCandidates && (
        <tr>
        <div className="selected-user">
          <img src={detailedUsers[currentIndex].avatar_url} alt={detailedUsers[currentIndex].login} width={100} />
          <h3>User Name: {detailedUsers[currentIndex].login}</h3>
          <p>Email: {detailedUsers[currentIndex].email || 'Not Available'}</p>
          <p>Company: {detailedUsers[currentIndex].company || 'Not Available'}</p>
          <p>Location: {detailedUsers[currentIndex].location || 'Not Available'}</p>
          <p>Bio: {detailedUsers[currentIndex].bio || 'Not Available'}</p>
          <button onClick={handleSaveUser}>+</button> 
          <button onClick={handleSkipUser}>-</button> 
        </div>
        </tr>
      )}

      
      {endOfCandidates && (
        <div>
          <p>No more candidates. Please refresh to see more candidates.</p>
        </div>
      )}
    </div>
  );
};

export default CandidateSearch;