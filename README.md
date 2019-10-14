# MERN stack app using Next.js

The problem statement was to develop a web app using React and MongoDB that can perform user registration and user list action. I took this opportunity to try [Next.js](https://nextjs.org/) which is a React Framework with SSR and code splitting by default. It was also my first time working with MongoDB.

## [Demo](https://node-next.herokuapp.com/) 🥳🎉

## Directory structure

```
.
├── Dockerfile
├── README.md
├── __tests__
├── api
├── components
├── docker-compose.yml
├── heroku.yml
├── jest.config.js
├── jest.setup.js
├── less
├── next.config.js
├── package.json
├── pages
├── public
├── server.js
├── services
├── tree.txt
└── yarn.lock
```

## Tech stack

- Frontend: React (Next.js)
- Backend: Express.js
- Database: MongoDB
- Platform: Node.js
- Deployment: Docker

## Steps to run

### Clone the repo

```bash
git clone git@github.com:afzalsayed96/next-app.git
cd next-app
```

### Start server

Go to project directory and run

```bash
docker-compose up --build web
```

App will start running at `localhost:3000`

### Running tests

```
docker-compose build test
docker-compose run test
```

## Starter boilerplate

- Create Next App
- https://github.com/mui-org/material-ui/tree/master/examples/nextjs

## References

- https://codingthesmartway.com/the-mern-stack-tutorial-building-a-react-crud-application-from-start-to-finish-part-2/

## Assests

- https://undraw.co
