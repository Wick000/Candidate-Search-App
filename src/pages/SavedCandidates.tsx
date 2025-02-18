import { useState, useEffect } from 'react';
import CandObj from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<CandObj[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(saved);
  }, []);

  return (
    <div>
      <h1>Saved Candidates</h1>
      <ul>
        {savedCandidates.length === 0 ? (
          <p>No saved candidates yet.</p>
        ) : (
          savedCandidates.map((user) => (
            <li key={user.id}>
              <img src={user.avatar_url} alt={user.login} width={50} />
              <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                {user.login}
              </a>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default SavedCandidates;
