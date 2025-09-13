This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Prerequisites
- Docker installed
- Docker Compose installed
- An .env file in the app root directory to match the .env.template file

# Task Tracker Application
- Create a task list
- Add tasks to the list
- Mark tasks as complete or incomplete
- Switch between task lists
- Save task list progress


## Running with Docker Compose

1) If necessary, cd into the project directory simple-task-service
2) In the terminal, run the following command: docker-compose up --build
3) The application will be available at http://localhost:3000/tasks


## bash commands:
### Build and start the application
docker-compose up --build
### To run in detached mode
docker-compose up -d --build
### To stop the application
docker-compose down
### To stop the application and remove volumes
docker-compose down -v

The application will be available at http://localhost:3000/tasks



## Requirements:
Objective
Design and implement a simple Task Tracker web application that allows users to create,
manage, and organize their tasks. The user should be able to manage multiple task lists (like
"Personal", "Work", etc.), with each list storing its own tasks.
Requirements
1. Task Lists Management:
   ○ Users can create multiple task lists (e.g., "Groceries", "Work", "Home Renovation").
   ○ Allow switching between task lists.
   ○ Each list should maintain its own state (tasks, completion status, etc.).
2. Task Management:
   ○ Add, edit, and delete tasks within a list.
   ○ Mark tasks as complete or incomplete.
   ○ Display task statuses clearly.
3. Progress Persistence:
   ○ Task data and list organization must be saved and persist across reloads.
4. User Interface (UI):
   ○ Simple and intuitive UI for:
   ■ Viewing and switching between task lists.
   ■ Adding and managing tasks.
   ■ Viewing task status (complete/incomplete).
   ■ Creating and managing task lists.
   Deliverables
   ● A working Task Tracker application.
   ● Source code (frontend, backend if applicable, or a single full-stack repo).
   ● README with setup and run instructions.

Expectations
● Submit the solution 24 hours before the interview in a GitHub repo or shared drive.
● Use of coding assistants (e.g., ChatGPT, GitHub Copilot) is permitted, but must be
declared.
● Candidate should be ready to explain and modify the code during the interview call
without the use of AI assistance.
