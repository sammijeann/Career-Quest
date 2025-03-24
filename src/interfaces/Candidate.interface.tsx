// TODO: Create an interface for the Candidate objects returned by the API
interface Candidate {
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
    email: string;
    bio: string;
    location: string;
    company: string;
  }

  export default Candidate;