export default interface Member {
  id: string;
  pseudo: string;
  isAdmin: boolean;
  email: string;
  sex: string;
  password: string;
  salt: string;
  presentation: string;
  photoUrl: string;
  creationDate: Date; 
}


