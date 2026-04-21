# Logistics Appointment System

## Project Description
The Logistics Appointment System is a web-based application designed to streamline the management of logistic appointments. It allows businesses to organize, schedule, and track appointments efficiently, improving overall productivity and customer satisfaction.

## Features
- Schedule and manage logistic appointments.
- Real-time updates with WebSocket support.
- User authentication and role-based access control.
- Calendar view for easy scheduling.
- Notifications and reminders for upcoming appointments.
- API integration for external systems.

## Technology Stack
- **Frontend:** React.js, Redux
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **WebSocket:** Socket.IO
- **Styling:** CSS, Bootstrap

## Installation Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/infimumlab/logistics-appointment-system.git
   ```
2. Navigate to the project directory:
   ```bash
   cd logistics-appointment-system
   ```
3. Install dependencies for the backend:
   ```bash
   npm install
   ```
4. Navigate to the client directory and install its dependencies:
   ```bash
   cd client
   npm install
   ```
5. Set up environment variables and configurations as necessary.
6. Start the development servers:
   - For the backend:
     ```bash
     npm run start
     ```
   - For the frontend:
     ```bash
     npm run start
     ```

## Project Structure
```
logistics-appointment-system/
├── client/             # Frontend application
├── server/             # Backend application
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── controllers/    # Business logic
│   ├── middleware/      # Authentication and validation
│   └── config/         # Configuration files
├── package.json        # Project metadata
└── README.md           # Documentation
```

## API Endpoints
| Method | Endpoint                 | Description                       |
|--------|-------------------------|-----------------------------------|
| GET    | /api/appointments        | Get all appointments               |
| POST   | /api/appointments        | Create a new appointment           |
| PUT    | /api/appointments/:id    | Update an existing appointment     |
| DELETE | /api/appointments/:id    | Delete an appointment              |

## WebSocket Events
- `appointmentCreated`: Triggered when a new appointment is created.
- `appointmentUpdated`: Triggered when an existing appointment is updated.
- `appointmentDeleted`: Triggered when an appointment is deleted.
- `connect`: Indicates a user has connected.
- `disconnect`: Indicates a user has disconnected.
