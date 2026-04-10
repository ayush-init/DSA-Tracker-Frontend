/**
 * Authentication-related types for student
 */

export interface StudentLoginCredentials {
  email: string;
  password: string;
}

export interface StudentRegisterData {
  username: string;
  email: string;
  password: string;
  batch_id?: number;
}

export interface ResetPasswordData {
  token: string;
  newPassword: string;
}
