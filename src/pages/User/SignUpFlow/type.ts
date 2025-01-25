export interface SignUpFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
}

export interface ApiResponse {
    message: string; 
    accessToken: string;
    user: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        role: string;
    }
  }
  