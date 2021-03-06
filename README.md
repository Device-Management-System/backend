# Backend

#### Deployed API : https://device-management-system.herokuapp.com/

## Problem Core

Businesses lose track of who is using what IT hardware and devices, purchase costs, and sim tariff details when using existing methods.

## Objectives

1.  Save the company money through less lost hardware.
2.  Save equipment managers time when loaning out and tracking devices
3.  Give Accounting/Finance more insight into IT assets and capital expenses.

## Solution

**Core suggested Features**

- A dashboard of devices in the company and who they are assigned to
- Ability to search for devices by a code number
- Ability to search for a person and find their devices
- A nice aesthetic for each device time, to make a pleasant and intuitive experience
- View History of a person's loaned devices
- View history of a device's loan history
- Allow an employee to submit a request to loan equipment

## API docs

#### Table of Contents

- api
  - server
  - server.spec
- data
  - migrations
  - seeds
  - dbConfig
- middlewares
  - restricted
  - validation
- routes
  - users
    - users-model
    - users.spec
    - users-route
  - devices
    - devices-model
    - devices.spec
    - devices-route
  - requests
    - requests-model
    - requests.spec
    - requests-route
- index
- knexfile
- .env
- .gitignore
- package.json

## Database Schemas

The _Database Schemas_ for the `users`, `devices`, `user_devices`, `device_history`, `requests`, `access_history`, resources are:

#### Users

| field      | data type        | metadata                                            |
| ---------- | ---------------- | --------------------------------------------------- |
| id         | unsigned integer | primary key, auto-increments, generated by database |
| first_name | string           |                                                     |
| last_name  | string           |                                                     |
| email      | string           | required, unique                                    |
| role       | string           |                                                     |
| uuid       | varchar          |                                                     |
| isEmployed | boolean          |                                                     |

#### Devices

| field         | data type        | metadata                                            |
| ------------- | ---------------- | --------------------------------------------------- |
| id            | unsigned integer | primary key, auto-increments, generated by database |
| device_model  | varchar          |                                                     |
| serial_number | varchar          |                                                     |
| os            | varchar          | required, unique                                    |
| brand         | string           |                                                     |
| user_id       | integer          | foreign key                                         |
| last_updated  | date             |                                                     |
| active        | boolean          |                                                     |
| created_at    | date             |                                                     |

#### User Devices

| field        | data type        | metadata                                            |
| ------------ | ---------------- | --------------------------------------------------- |
| id           | unsigned integer | primary key, auto-increments, generated by database |
| user_id      | integer          | foreign key                                         |
| device_id    | integer          | foreign key                                         |
| check_out_at | date             |                                                     |

#### Device History

| field         | data type        | metadata                                            |
| ------------- | ---------------- | --------------------------------------------------- |
| id            | unsigned integer | primary key, auto-increments, generated by database |
| employee_name | string           |                                                     |
| device_id     | integer          | foreign key                                         |

#### Requests

| field     | data type        | metadata                                            |
| --------- | ---------------- | --------------------------------------------------- |
| id        | unsigned integer | primary key, auto-increments, generated by database |
| device_id | integer          | foreign key                                         |
| user_id   | integer          | foreign key                                         |
| note      | varchar          |                                                     |
| status    | string           |                                                     |

#### Access History

| field       | data type        | metadata                                            |
| ----------- | ---------------- | --------------------------------------------------- |
| id          | unsigned integer | primary key, auto-increments, generated by database |
| user_id     | integer          | foreign key                                         |
| device_id   | integer          | foreign key                                         |
| access_time | timestamp        |                                                     |
| note        | varchar          |                                                     |

## Available Scripts

In the project directory you can run:

### `yarn start`

Runs the app in the production environment.

### `yarn server`

Runs the app in the development environment.<br>
Use [http://localhost:5000](http://localhost:5000) in Postman.

### `yarn rollback`

Will rollback the migrations in the development environment.

### `yarn reset`

Will re-run the migrations and seeds in the developement environment.

### `yarn reset:staging`

Will re-run the migrations and seeds in the staging environment.

### `yarn reset:production`

Will re-run the migrations and seeds in the production environment.

## Authors

- Marina Baskova [GitHub](https://github.com/MarinaBaskova)
- Guillaume Savy [GitHub](https://github.com/guillsav)
- Tyler Foreman [GitHub](https://github.com/tjforeman)
