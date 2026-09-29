# HydroFlow Water Management System

This repository contains the front-end for a university water management and ticketing system. It allows students to report water shortages, technicians to manage and resolve tickets, and administrators to monitor system-wide water usage.

## Project structure

- `hydroflow-frontend/` — React + TypeScript + Vite application

## Features

- Student login using university email or registration number
- Role-based access for student, technician, and admin dashboards
- Ticket creation and status tracking
- Technician work order queue and status updates
- Admin overview of water usage and hostel block analytics
- Demo authentication for quick testing

## Demo accounts

- Student: `sarah.njeri@univ.ac.ke` / `student123`
- Technician: `james.maina@univ.ac.ke` / `tech123`
- Admin: `ann.wambui@univ.ac.ke` / `admin123`

## Run locally

```bash
cd hydroflow-frontend
npm install
npm run dev
```

Then open:

```text
http://localhost:5173/
```

## Build for production

```bash
cd hydroflow-frontend
npm run build
```

## Repository

GitHub: https://github.com/samchonjo/Hyroflow

## Notes

This is the frontend version using mock data for demonstration. It is ready to be connected to a backend API and database for production use.
