export interface IRegisterForm {
    pseudo: string;
    presentation?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    photo?: any,
    email: string;
    password: string;
    confirmPassword: string;
  }

  export interface ILoginForm {
    pseudo: string;
    password: string;
  }