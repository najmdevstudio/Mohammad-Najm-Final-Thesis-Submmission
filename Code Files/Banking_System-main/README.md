### README

This guide explains the step-by-step setup process for building and running the **Banking System** project. Follow these instructions carefully.

---

## Prerequisites

1. **Java Development Kit (JDK)** - Ensure JDK 21 or later is installed.
2. **Maven** - Confirm Maven is installed and configured.
3. **Docker and Docker Compose** - Ensure both Docker and Docker Compose are installed and operational.
4. **Node.js and NPM** - Ensure Node.js and npm are installed.
5. **SQL Server** - Ensure an SQL Server instance is running on the host system.

---

## Step 1: Build the projects

1. Navigate to the **Banking_System** directory:

    ```bash
    cd Banking_System
    ```

2. Traverse into each project directory and run Maven commands to build the project. Repeat this for all services in all banks (NWBank, OWBank, PWBank) and the clearing house.

    #### Example Bash Command:
    ```bash
    cd NWBank/NWB-Accounts-develop
    mvn clean compile install package
    ```

    #### UI Alternative:
    1. Open each project in an IDE (e.g., IntelliJ IDEA or Eclipse).
    2. Build the project using the IDE’s build tools.

---

## Step 2: Set up SQL Server

1. Locate the provided SQL scripts (ensure they are available).
2. Execute the scripts in your SQL Server management tool to:
    - Create necessary schemas.
    - Create three users with the following credentials:

        | Username    | Password  |
        |-------------|-----------|
        | NWB_USER    | P@SS123   |
        | OWB_USER    | P@SS123   |
        | PWB_USER    | P@SS123   |

    #### Example Bash Command:
    ```bash
    sqlcmd -S <server_name> -U <admin_user> -P <admin_password> -i setup_schema.sql
    ```

    #### UI Alternative:
    1. Use a GUI tool (e.g., SQL Server Management Studio).
    2. Open the SQL files and execute them.

---

## Step 3: Build and run Docker containers

1. Navigate to the directory containing the `docker-compose.yml` file:

    ```bash
    cd Banking_System
    ```

2. Run the following command to start the Docker containers:

    ```bash
    docker-compose up -d
    ```

    #### UI Alternative:
    1. Open Docker Desktop.
    2. Load the `docker-compose.yml` file.
    3. Start the containers.

---

## Step 4: Test scripts setup and execution

1. Unzip the test scripts archive (if zipped):

    ```bash
    unzip test_scripts.zip -d test_scripts
    ```

2. Navigate to the test scripts folder:

    ```bash
    cd test_scripts
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Run the test script:

    ```bash
    node finalTest.js
    ```

    #### UI Alternative:
    1. Use a code editor (e.g., Visual Studio Code).
    2. Open the test scripts folder.
    3. Run the commands in an integrated terminal.

---

## Summary Checklist

- [ ] Navigate to each project directory and build using Maven.
- [ ] Execute SQL scripts to set up the database schemas and users.
    - [ ] Ensure the following users are created:
        - NWB_USER / P@SS123
        - OWB_USER / P@SS123
        - PWB_USER / P@SS123
- [ ] Start Docker containers using `docker-compose`.
- [ ] Unzip, set up, and run the test scripts.

Following these steps ensures that the **Banking System** is correctly set up and operational.

