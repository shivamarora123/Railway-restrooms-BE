# Railway Restrooms

## Introduction
>This is a backend for Railway Restrooms website similar to Trivago. Where a user can book railway rest-rooms online without any paperwork.
## Installation and Running

> npm install

> npm start

## Routes

### Welcome Route

Method | Route Address | Input Parameters | Output JSON Expectation
--- | --- | --- | ---
GET | / | None | Welcome Message

### Authentication Routes

Method | Route Address | Input Parameters | Output JSON Expectation
--- | --- | --- | ---
POST | /auth/register | fullName, userName, email, phone, passEnter, passConfirm | Success/Error Message
GET | /auth/verify/:username/:code | None | Success/Error Message
POST | /auth/verify/phone/:username | otp | Success/Error Message
POST | /auth/login | username, password | Success Message -> Token or Error Message
GET | /auth/logout | token (Header: x-access-token) or Params | Success/Error Message
POST | /auth/change-password | token, oldPassword, newPassword | Success/Error Message
GET | /auth/status | token | Success/Error Message


## Application URL

>https://railway-restrooms.herokuapp.com
