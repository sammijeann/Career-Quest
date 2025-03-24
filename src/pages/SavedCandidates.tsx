import { useState, useEffect } from 'react';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<any[]>([]);

  // Load saved candidates from local storage when the component mounts
  useEffect(() => {
    const candidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(candidates);
  }, []);

  // Function to remove a candidate
  const removeCandidate = (id: number) => {
    // Filter out the candidate with the matching id
    const updatedCandidates = savedCandidates.filter((candidate) => candidate.id !== id);

    // Update the state and local storage
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
  };

  return (
    <>
      <h1>Potential Candidates</h1>
      <table className="table">
        <thead>
          <tr>
            <th className="th" scope="col">Image</th>
            <th className="th" scope="col">Name</th>
            <th className="th" scope="col">Location</th>
            <th className="th" scope="col">Email</th>
            <th className="th" scope="col">Company</th>
            <th className="th" scope="col">Bio</th>
            <th className="th" scope="col">Reject</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through the saved candidates and display their details */}
          {savedCandidates.map((candidate) => (
            <tr key={candidate.id}>
              <td><img src={candidate.avatar_url} alt={candidate.login} style={{ width: '50px', height: '50px' }} /></td>
              <td>{candidate.login}</td>
              <td>{candidate.location}</td>
              <td>{candidate.email}</td>
              <td>{candidate.company}</td>
              <td>{candidate.bio}</td>
              <td>
                <button onClick={() => removeCandidate(candidate.id)}>
                  <img src="src/assets/minus-button.png" alt="Reject" style={{ width: '30px', height: '30px' }} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default SavedCandidates;
