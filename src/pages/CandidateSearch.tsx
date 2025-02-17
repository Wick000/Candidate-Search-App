 import { useState, useEffect } from 'react';
 import { searchGithub, searchGithubUser } from '../api/API';

const CandidateSearch = () => {
  const [users, setUsers] = useState()

  useEffect(()=> {
    searchGithub()
    .then(data => {
        setUsers(data)
        console.log(data);
    })
  }, [])

  useEffect(() => {
    searchGithubUser
  })
 
  return <h1>CandidateSearch</h1>;

};
export default CandidateSearch;
