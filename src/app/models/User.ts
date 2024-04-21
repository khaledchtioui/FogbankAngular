
export interface User {
  id?: string;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  role: string;
  forgetPassword: any; // ou un type approprié si nécessaire
  profile: any; // ou un type approprié si nécessaire
  enabled: boolean;
  username: string;
  authorities: { authority: string }[];
  accountNonLocked: boolean;
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;
}

