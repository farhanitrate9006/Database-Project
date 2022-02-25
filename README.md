# Database-Project (Hospital Management System)

How to run at your end

## 0. Prerequisite - Used Softwares

- Oracle 19c Database (WINDOWS.X64_193000)

- node v16.13.0

- npm v8.3.0

## 1. Git Clone

Clone the Git repository locally

```
git clone https://github.com/farhanitrate9006/Database-Project.git
```

## 2. Set Up Database

### Create User/Database

Log in to SQL Plus with sysdba

```
create user tfuser3 identified by 1f6dd65e;
grant dba to tfuser3;
```

### Restore SQL Dump

Using Navicat, import sql dump from `sql/Hospital.sql` to `tfuser3` database

## 3. Dependency

Open Terminal at root folder and run `npm install`

Create `.env` file at root folder

```
PORT=3000
DB_USER=tfuser3
DB_PASS=1f6dd65e
DB_CONNECT_STRING=103.94.135.201:1521/orclcdb.localdomain
ACCESS_TOKEN_SECRET=a86ca40e04e179579fbd0574bfd5e0130fbad1bf61934e7ed333286411eb8080fa93ab94f1c256f6edced6353114b41f4bf6c4ae46ea59507b80787ce92257ae
REFRESH_TOKEN_SECRET=ea8c4c4460034f82ae5513e13e065f3f3ab0a86c6407bfd55dacaf2a342d649efbb01f0be57ec7cc9c2fd8bcc1ef3f9652b91eb69b0941b7eb447c2ea229e8a6
SESSION_SECRET=86ca40e04e179579fbd0574bfd5e0130fbad1bf61934e7ed33328
SESSION_NAME=sid


# defining admin

ADMIN_NAME = admin@dot.com
ADMIN_PASS = helloworld
```

## Running

Open Terminal at root folder and run `nodemon run dev`
