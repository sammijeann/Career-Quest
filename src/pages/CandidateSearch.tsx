import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch random candidates when the component loads
  useEffect(() => {
    const fetchRandomCandidates = async () => {
      try {
        setLoading(true);
        const data = await searchGithub();
        setCandidates(data);
        if (data.length > 0) {
          // Extract the login of the first candidate
          const firstCandidateLogin = data[0].login;

          // Fetch detailed data for the first candidate
          const detailedCandidate = await searchGithubUser(firstCandidateLogin);
          setCurrentCandidate(detailedCandidate);
        } // Set the first candidate or null
      } catch (err: any) {
        setError(err?.message || 'Failed to fetch random candidates.');
      } finally {
        setLoading(false);
      }
    };

    fetchRandomCandidates();
  }, []);

  const saveCandidate = () => {
    if (!currentCandidate) return; // Ensure there is a candidate to save
  
    // Retrieve the existing saved candidates from local storage
    const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
  
    // Check if the candidate is already saved
    const isAlreadySaved = savedCandidates.some(
      (candidate: Candidate) => candidate.id === currentCandidate.id
    );
  
    if (isAlreadySaved) {
      alert(`${currentCandidate.login} is already saved!`);
      return;
    }
  
    // Add the current candidate to the array
    savedCandidates.push(currentCandidate);
  
    // Save the updated array back to local storage
    localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
  
    alert(`${currentCandidate.login} has been saved!`);
    nextCandidate(); // Move to the next candidate after saving
  };


  const nextCandidate = () => {
    if (!currentCandidate || candidates.length === 0) return; // Ensure candidates array is not empty
    const currentIndex = candidates.findIndex((candidate) => candidate.id === currentCandidate.id);
    const nextIndex = (currentIndex + 1) % candidates.length; // Loop back to the start
    const nextCandidateLogin = candidates[nextIndex].login;
    searchGithubUser(nextCandidateLogin)
      .then((detailedCandidate) => setCurrentCandidate(detailedCandidate))
      .catch((err) => setError(err?.message || 'Failed to fetch candidate details.'));
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Candidate Search</h1>
      {currentCandidate ? (
        <div className='card-container'>
        <div className="card">
          <img src={currentCandidate.avatar_url} alt={`${currentCandidate.login}'s avatar`} />
          <div className="container">
          <h2>{currentCandidate.login}</h2> 
          <p>{currentCandidate.location}</p>
          <p>email: {currentCandidate.email}</p>
          <p>bio: {currentCandidate.bio}</p>
          <p>
            <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">
              View Profile
            </a>
          </p>
          </div>
        </div>
          
        </div>
      ) : (
        <p>No candidates found.</p>
      )}
      <div className='button-container'>
        <button onClick={nextCandidate}>
        <img src="src\assets\minus-button.png" style={{ width: '60px', height: '60px' }} />
        </button>

        <button onClick={saveCandidate}>
        <img src="src\assets\plus.png" style={{ width: '60px', height: '60px' }} />
        </button>
      </div>
    </div>
  );
};

export default CandidateSearch;
