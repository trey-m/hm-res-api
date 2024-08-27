# Reservation API

A two-channel reservation system with Providers providing availability and Clients booking available timeslots.

# Requirements

Build an API (e.g. RESTful) with the following endpoints:

- Allows providers to submit times they are available for appointments
- Allows a client to retrieve a list of available appointment slots (Appointment slots are 15 mins long)
- Allows clients to reserve an available appointment slot
- Allows clients to confirm their reservation

Additional Requirements:

- Reservations expire after 30 minutes if not confirmed and are again available for other clients to reserve that appointment slot
- Reservations must be made at least 24 hours in advance

# Database Diagram

![ERD](https://i.imgur.com/RFFHvRs.png)

# System Architecture

![architecture](https://i.imgur.com/6A593cE.png)
