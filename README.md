# Donation Candidate Management System

A full-stack application for managing blood donation candidates with React frontend and ASP.NET Core Web API backend.

## Features

### Frontend (React)
- **Candidate Management**: Full CRUD operations for donor records
- **Responsive UI**: Mobile-friendly interface with Material-UI components
- **Form Validation**: 
  - Mobile number format validation
  - Email format validation
  - Age range validation (18-65 years)
  - Required field validation
- **User Feedback**: Toast notifications for all actions
- **State Management**: Redux with Thunk middleware

### Backend (ASP.NET Core Web API)
- **RESTful API**: Clean architecture with proper endpoints
- **Database Support**: SQL Server with Entity Framework Core
- **Validation**: Model validation and business rules
- **Scalable**: Built with .NET 6+ for performance

## Technologies Stack

### Frontend
- React 17
- Redux (with Thunk middleware)
- Material-UI (v4/v7)
- Axios for API communication
- React Toast Notifications

### Backend
- ASP.NET Core 6+
- Entity Framework Core
- SQL Server
- Swagger/OpenAPI documentation

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- .NET 6 SDK
- SQL Server (LocalDB or Express works)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/donation-candidate-system.git
   cd donation-candidate-system





 ### API Endpoints:
 - GET : 	/api/candidates	Get all candidates
- GET : 	/api/candidates/{id}	Get single candidate
- POST : 	/api/candidates	Create new candidate
- PUT : 	/api/candidates/{id}	Update candidate
- DELETE : 	/api/candidates/{id}	Delete candidate




