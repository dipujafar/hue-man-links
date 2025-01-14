export type TError = {
  success: string;
  message: string;
  error: {
    path: string;
    message: string;
  };
};

export type TUser = {
  email: string;
  exp: number;
  iat: number;
  id: string;
  role: string;
};

type TChild = {
  id: string;
  name: string;
  age: string;
  characteristics: string[];
  createdAt: string;
  updatedAt: string;
  jobPostId: string;
};

export type TSingleJobPost = {
  id: string;
  userId: string;
  startTime: string;
  endTime: string;
  date: string;
  fullName: string;
  country: string;
  state: string;
  city: string;
  area: string;
  houseNo: string;
  zipCode: string;
  description: string;
  aboutFamily: string;
  numberOfPets: number;
  isActive: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  children: TChild[];
};

// Define the user information
export type TUserDataFamily = {
  id: string;
  profilePicture: string;
  address: string;
  country: string;
  city: string;
  state: string;
  zipCode: string;
  houseNo: string;
};

// Define the main job post structure
export type TJobPost = {
  id: string;
  userId: string;
  startTime: string; // Consider using a more specific type for time
  endTime: string; // Consider using a more specific type for time
  date: string; // ISO date string
  fullName: string;
  country: string;
  state: string;
  city: string;
  area: string;
  houseNo: string;
  zipCode: string;
  description: string;
  aboutFamily: string;
  numberOfPets: number; // Using number instead of string for count
  isActive: boolean;
  status: string; // Could be an enum if there are predefined statuses
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  children: TChild[];
  user: TUserDataFamily;
};

export type TBabysittingRequest = {
  id: string;
  jobId: string;
  babysitterId: string;
  status: string;
  rejectReason: string | null;
  createdAt: string; // Consider using `Date` if you parse the date
  updatedAt: string; // Consider using `Date` if you parse the date
  jobPost: TJobPost;
};

type TBabysitter = {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  gender: string;
  age: string;
  mobileNumber: string;
  isAdult: boolean;
  skills: string[];
  languages: string;
  education: string;
  unrestrictedHours: string;
  occupation: string;
  experience: string;
  bio: string;
  resume: string;
  backgroundDescription: string;
  sunday: string[];
  monday: string[];
  tuesday: string[];
  wednesday: string[];
  thursday: string[];
  friday: string[];
  saturday: string[];
  avgRating: number;
  reviewCount: number;
  paymentStatus: string;
  subscriptionRenewDate: string;
  bookings: number;
  isActive: boolean;
  isDelete: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    profilePicture: string;
  };
};

export type TJobApplication = {
  id: string;
  jobId: string;
  babysitterId: string;
  status: string;
  rejectReason: string;
  createdAt: string;
  updatedAt: string;
  babysitter: TBabysitter;
  jobPost: TJobPost;
};

export type TBabysitterUser = {
  id: string;
  email: string;
  role: string;
  profilePicture: string;
  address?: string;
  area: string;
  country: string;
  city: string;
  state: string;
  zipCode: string;
  houseNo: string;
  hearFrom: string;
  isDelete: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  babysitter: TBabysitter;
  familyUser: null;
};

export type TFamilyUserData = {
  id: string;
  email: string;
  role: string;
  profilePicture: string;
  area: string;
  country: string;
  city: string;
  state: string;
  zipCode: string;
  houseNo: string;
  hearFrom: string;
  isDelete: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  familyUser: TFamilyUser;
};

type TFamilyUser = {
  id: string;
  petCount: number;
  userId: string;
  personName: string;
  personPhoneNumber: string;
  household: string;
  petDetails: string;
  isActive: boolean;
  isDelete: boolean;
  createdAt: string;
  updatedAt: string;
  paymentStatus: string;
  subscriptionRenewDate: string | null;
  primaryCareGiver: any[];
  secondaryCareGiver: any[];
  clients: Client[];
};

type Client = {
  id: string;
  name: string;
  dob: string; // Date of birth (ISO date string)
  information: string;
  familyId: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};

type Reviewer = {
  id: string;
  profilePicture: string;
  babysitter?: {
    firstName: string;
    lastName: string;
  };
  familyUser?: {
    personName: string;
  };
};

export type TReview = {
  id: string;
  reviewerId: string;
  reviewedId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  reviewer: Reviewer;
};

export type TMessage = {
  id: string;
  senderId: string;
  chatId: string;
  content: string;
  files: string[];
  notification: any | null;
  createdAt: string;
  updatedAt: string;
};

// type Review = {
//   id: string;
//   reviewerId: string;
//   reviewedId: string;
//   rating: number;
//   comment: string;
//   createdAt: string; // ISO 8601 date format
//   updatedAt: string; // ISO 8601 date format
//   reviewer: {
//       id: string;
//       email: string;
//       profilePicture: string;
//       name: string;
//       avgRating: number;
//       area: string;
//       country: string;
//       city: string;
//       state: string;
//       houseNo: string;
//       zipCode: string;
//       password: string; // consider hashing this
//       hearFrom: string;
//       role: string;
//       fcmToken: string;
//       stripeId: string | null;
//       isDelete: boolean;
//       isActive: boolean;
//       createdAt: string; // ISO 8601 date format
//       updatedAt: string; // ISO 8601 date format
//   };
// };
