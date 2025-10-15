# Gemini Interaction Guide for Denno Meishi

This document provides guidelines for interacting with the Denno Meishi project using Gemini.

## About This Project

Denno Meishi is a portfolio website for "Mouchan," built with Next.js, TypeScript, Prisma, and Tailwind CSS. It showcases Mouchan's skills and projects, and includes a contact form for inquiries.

## Getting Started

To get started with the project, you can use the following commands:

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Set up the database:**
    ```bash
    npx prisma generate
    npx prisma db push
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

The website will be available at `http://localhost:3123`.

## Running Tests

To run the project's tests, use the following command:

```bash
npm run test
```

*Note: This project does not currently have any tests. You can help by adding some!*

## Useful Commands

Here are some useful commands for development:

*   `npm run dev`: Starts the development server.
*   `npm run build`: Builds the project for production.
*   `npm run start`: Starts the production server.
*   `npm run lint`: Lints the project's code.
*   `npx prisma studio`: Opens the Prisma Studio GUI.
*   `npx prisma db push`: Pushes the database schema to the database.
*   `npx prisma generate`: Generates the Prisma client.

## Project Architecture

The project is a full-stack application built with Next.js. The front-end is built with React and Tailwind CSS, and the back-end is built with Next.js API Routes and Prisma. The database is PostgreSQL.

The project's code is organized as follows:

*   `src/app`: Contains the front-end code, including pages, components, and styles.
*   `src/app/api`: Contains the back-end code, including API routes.
*   `prisma`: Contains the database schema.

## Contributing

Contributions to the project are welcome. To contribute, please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature.
3.  Make your changes.
4.  Submit a pull request.
