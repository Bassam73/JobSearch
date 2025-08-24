# 🚀 Job Portal Backend API

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge)
![Joi](https://img.shields.io/badge/Joi-validation-orange?style=for-the-badge)

A fully-featured **Job Portal backend** built with **Node.js, Express.js, MongoDB**, and **Joi validation**.  
This API allows companies to manage their profiles and job postings, and users to search, apply, and manage accounts securely.

---

## ✨ Features

### 👤 User Features
- Sign Up / Sign In (email or mobile number)
- Update profile, change password, delete account
- Password recovery via OTP
- Apply to jobs with resume and skills
- View jobs with pagination, filtering, search, and sorting

### 🏢 Company Features
- Add / Update / Delete company profiles (HR only)
- Search companies by name
- View company details including all posted jobs
- Manage job postings: Add, update, delete jobs
- View applications for specific jobs

### 🔒 Admin / HR Features
- HR users manage only their company and job postings
- Role-based access control

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB with Mongoose  
- **Authentication:** JWT, bcrypt for password hashing  
- **Validation:** Joi for request validation  
- **File Uploads:** Multer for resumes  
- **Error Handling:** Custom middleware with AppError  
- **API Features:** Filtering, sorting, pagination, field selection

---

## 🔗 API Endpoints

### User Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/users/signUp` | Register a new user |
| POST | `/users/signIn` | Login |
| PATCH | `/users/account` | Update profile |
| PATCH | `/users/updatePassword` | Change password |
| PATCH | `/users/forgetPassword` | Request OTP |
| PATCH | `/users/resetPassword` | Reset password via OTP |
| DELETE | `/users/account` | Delete account |
| GET | `/users/account` | Get logged-in user details |
| GET | `/users/account/:id` | Get another user’s profile |

### Company Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/company/` | Add a company (HR only) |
| PATCH | `/company/` | Update company info (HR only) |
| DELETE | `/company/` | Delete company (HR only) |
| GET | `/company/:id` | Get company details |
| GET | `/company/` | Search company by name |
| GET | `/company/applicationsForJob/:id` | Get applications for a job |

### Job Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/jobs/` | Add a job (HR only) |
| PATCH | `/jobs/:id` | Update job (HR only) |
| DELETE | `/jobs/:id` | Delete job (HR only) |
| GET | `/jobs/` | Get all jobs (with filters, pagination) |
| GET | `/jobs/getSpecificCompanyJobs` | Get jobs for a specific company |
| POST | `/jobs/applyJob/:id` | Apply to a job (User only) |

---

## ⚡ Validation Rules

- **User:** Strong password, valid email & Egyptian mobile number, DOB restrictions  
- **Company:** Name, description, industry, email validation  
- **Job:** Title, description, location, working time, seniority level, skills  
- **Apply Job:** Resume upload and skill arrays validation  

---

## 🛠 Environment Variables

Create a `.env` file in the root of your project and add the following variables:


```
env
# Server port
PORT=5000

# MongoDB connection string
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority

# Secret key for JWT authentication
JWT_KEY=your_jwt_secret_here

# Optional: add any additional environment variables if needed
```
---

## Installation🛠
```
git clone <repo-url>
cd JobSearch
npm install
npm run dev
```

---

## 🔒 Security & Access Control

- Email notifications for job applications
- Admin dashboard & analytics
- Multi-file uploads for resumes and portfolio
- Integration with external job boards

---

## 🎯 Demo
- Test API using Postman
- Ready to integrate with React, Angular, or Vue frontend
