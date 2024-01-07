## CMedia Scoial Web App

### Social Media Web Application with Django

This is a social media web application built using Django, featuring various functionalities for users to connect and share their thoughts and experiences.

### Features

- **Sign Up and Login**
- **OAuth 2.0 Integration**
- **Logout**
- **Forgot Password**
- **Public Profile View**
- **Create, Edit, Delete Posts**
- **Like and Comment/Reply**
- **Save and Search Posts**
- **Follow and Unfollow Users**
- **Friend Request**
- **Notifications**
- **Chats using Websockets**

<div align="start">
<img width="80%" align="start" src="./image.png"/>
</div>

## Project Setup

This script provides a set of commands for managing a Django project. It includes commands for running the development server, applying migrations, making migrations, installing packages, and running tests. This README will guide you on how to set up and use the script.

## Prerequisites

Before using this script, ensure you have the following prerequisites installed on your system:

- Python 3.9 or greater
- Virtualenv (recommended for creating virtual environments)
- Django (installed in your project)

## Getting Started

1. Clone the project repository.

2. Create a virtual environment (recommended) for your Django project. You can create one using `virtualenv` or any other virtual environment management tool.

3. Create a `.env` file in your project directory and configure your environment variables. You can use `tests.env` as a template for your `.env` file. Replace the placeholder values with your actual settings.

4. Ensure you have Django and other project dependencies installed. You can install the required packages using the `install` command:

   ```bash
   ./build.sh install
   ```

## Usage

<p>
You can use the provided script setup file to perform various tasks related to your project.</p>

## Starting the Django Server

## To start the Django server, run the following command:

```bash
./build.sh runserver
```

<p>This command will check if the Django server is already running on port 8000 and kill the process if necessary
# Usage
<p>
You can use the provided script setup file to perform various tasks related to your project.</p>

## Starting the Django Server

## To start the Django server, run the following command:

```bash
./build.sh runserver
```

<p>This command will check if the Django server is already running on port 8000 and kill the process if necessary. Then, it will activate the virtual environment, load environment variables from the .env file, and start the server using the command python manage.py runserver.</p>

## Starting the React Development Server

<p>To start the React development server, run the following command:</p>

```bash
./build.sh start
```

<p>This command will check if the React development server is already running on port 3000 and kill the process if necessary. Then, it will change the directory to the web folder, load environment variables from the .env file, and start the server using the command yarn run dev.</p>

## Running Database Migrations

<p>To run database migrations, use the following command:</p>

```bash
./build.sh migrate
```

<p>This command will change the directory to the backend folder, load environment variables from the .env file, activate the virtual environment, and run the Django migration command using python manage.py migrate.</p>

## Creating Database Migrations

<p>To create new database migrations, run the following command:<p>

```bash
./build.sh makemigrations
```

<p>This command will change the directory to the backend folder, load environment variables from the .env file, activate the virtual environment, and create new migrations using python manage.py makemigrations.</p>

<p>This command will check if the React development server is already running on port 3000 and kill the process if necessary. Then, it will change the directory to the web folder, load environment variables from the .env file, and start the server using the command yarn run dev.</p>

## Running Database Migrations

<p>To run database migrations, use the following command:</p>

```bash
./build.sh migrate
```

<p>This command will change the directory to the backend folder, load environment variables from the .env file, activate the virtual environment, and run the Django migration command using python manage.py migrate.</p>

# Creating Database Migrations

<p>To create new database migrations, run the following command:<p>

```bash
./build.sh makemigrations
```

<p>This command will change the directory to the backend folder, load environment variables from the .env file, activate the virtual environment, and create new migrations using python manage.py makemigrations.</p>

<p><b>Note:</b> Make sure you have made the necessary changes to your Django models before running this command.</p>
