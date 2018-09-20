import Mock from "mockjs"

let users = Mock.mock({
  "list|10": [{
    "name": "@name"
  }]
});

export default {
  'GET /mock-sax': {users: [{username: 'admin'}]},
  'GET http://localhost:8888/api/users': {users: [{username: 'admin555'}]},
  "GET /mock-sax/users": users,
}
