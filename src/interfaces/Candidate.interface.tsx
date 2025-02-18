// TODO: Create an interface for the Candidate objects returned by the API
interface CandObj {
    id: string;
    avatar_url?: string;
    login: string;
    html_url?: string;
    email?: string;
    company?: string;
    location?: string;
    bio?: string;
}

export interface BasicUser {
    login: string;
    id: string;
  }
export default CandObj;