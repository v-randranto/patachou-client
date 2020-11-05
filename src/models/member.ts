export interface Profile {
  pseudo: string;
  isAdmin: boolean;
  email: string;
  presentation: string;
  photoUrl: string;
  creationDate: Date; 
}

export class Account {  
  id: string;  
  profile: Profile;
  password: string;
  salt: string;
  constructor(id: string, profile: Profile) {    
    this.id = id;
    this.profile = profile;
    this.password = '';
    this.salt = '';
  }
} 

