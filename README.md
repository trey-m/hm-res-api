# Reservation API

A two-channel reservation system with Providers providing availability and clients booking available timeslots

# Notes

- In support of multiple timezones and locales i10n and l10n should be considered
- Pre-populating rerservation tables is one approach but can exhaust the db with unnecessary data (would require clean up jobs)
- Reads seem like the most common db action here, so we would want to index in support of that
- Auto expiration can be supported by some database engines, but a well timed CRON could support this
- Notification system will assume Email but can support other methods. This will be an async job so members will be notified in the near future
- Multiple providers could have same availability, minimum of 1 is required for the input params
- Clients will call for availability with input ranges
- Can add expiration time for the reservation record to know when to purge
- Providers may want to submit recurring availability. Could extend with another table like provider_recurring_availability { dayOfWeek, startTime, endTime, timezone }

# Database Diagram

![ERD](https://i.imgur.com/kQoEdok.png)

# System Architecture

![architecture](https://i.imgur.com/H4OG7uc.png)

# Productionizing

- Containerizing
- Monitoring
- Logging
- Test coverage
- Error handling
- Authn/Authz
- Req/Res validations
- Roll out strategy
- Documentation
- Consider TypeScript
- Sensible service architecture using established patterns
- Not sqlite, something like Postgres
