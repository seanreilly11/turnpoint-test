# React, Typescript, Node.js, PostgreSQL full stack application

### Running this application

1. Clone this repo
2. Run `npm run install` to install all dependencies needed for both backend and frontend
3. Create a `.env` file with a variable `DB_URL` with the DB url provided in the email as `DB_URL=...`
4. Run `npm run dev` to run both backend and frontend concurrently

You are able to see the list of users, add, update and delete users. After updating a user, you will need to refresh. The data fails to refetch after editing despite it refetching after other operations when required. `Not sure why.`

#### Frontend dependencies

-   @tanstack/react-query
-   react-hook-form
-   tailwindcss
