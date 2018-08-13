# Todo Fancy
List of routes:

| Route            | HTTP   | Description                                            |
|------------------|--------|--------------------------------------------------------|
| /api/todos       | GET    | Get all todo list                                      |
| /api/todos/:id   | GET    | Get a single todo                                      |
| /api/todos       | POST   | Create todo list                                       |
| /api/todos/:id   | DELETE | Delete todo list                                       |
| /api/todos/:id   | PUT    | Update todo list with new info                         |
| /api/register    | POST   | Register with new user info                            |
| /api/login       | POST   | Sign in while get an access token based on credentials |
| /api/loginFB     | POST   | Sign in with facebook                                  |


## Usage
With only npm:
```javascript
npm install
npm start
```

Access the API via `http://localhost:3000/api`