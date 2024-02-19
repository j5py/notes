# Asynchronous JavaScript
> Based on Mau Fournier's course on Coursera (AJAX for Web Developers)
## Reminder
Most of the code is synchronous
- Meaning that it's a synchronized sequence of operations
    - Each line runs only once the previous line is finished

With Promises
- There can be parts of the code running while we wait for other parts
### AJAX
Asynchronous JavaScript And XML
> JSON is easier to work with than XML
### JSON
JavaScript Object Notation
##### Supported
- `string`, `number`, `object`, `array`, `boolean`, `null`
##### Unsupported
- `undefined`, `function`
##### Encode and decode JSON for requests
- `JSON.stringify(thatJson)`
- `JSON.parse(thatString)`
### API
Application Programming Interface
- Intermediary between client and server
- Usually provide different URLS which correspond to each operation that is available
    - These URLs are called endpoints
### HTTP
| Main methods  | Usage         |
| ------------- | ------------- |
| GET           | Read (fetch)  |
| POST          | Create (send) |
| PUT           | Update        |
| PATCH         | Update        |
| DELETE        | Delete        |
#### Request and response components
- Headers, Body, Payload
## Request
### The original method (XHR)
> Many years ago
```JavaScript
function getUsers() {

    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://api.example.false/users', true); // async

    xhr.onload = function() {
        if (xhr.status === 200) {
            const js = JSON.parse(xhr.responseText);
            console.log(js)
        } else {
            console.log(xhr.statusText)
        }
    };

    xhr.onerror = function(error) {
        console.log('XHR error:', error)
    };

    xhr.send()

}
```
### Traditional Promises (then / catch)
##### States
- Pending, Resolved, Rejected
##### Methods
- `.then()`, `.catch()`, `.finally()`
##### Fetch API
- JavaScript operation for issuing requests to servers
- Implementing `.then()` and `.catch()` methods to handle responses and errors
    - A failed HTTP status code doesn't reject the Promise
        - Seem like you got a successful result
###### GET
```JavaScript
fetch('https://api.example.false/users')
    .then(response => response.json())
    .then(js => console.log(js))
    .catch(error => console.log('Promise error:', error));
```
###### POST
```JavaScript
fetch(
    'https://api.example.false/user',
    {
        method: 'POST',
        body: '{"email": "john@example.false"}'
    }
).then(response => response.json()).then(js => console.log(js));
```
###### PUT
```JavaScript
fetch(
    'https://api.example.false/user/123',
    {
        method: 'PUT',
        body: '{"email": "johndoe@example.false"}'
    }
).then(response => response.json()).then(js => console.log(js));
```
###### DELETE
```JavaScript
fetch(
    'https://api.example.false/user/123',
    {
        method: 'DELETE'
    }
).then(response => response.json()).then(js => console.log(js));
```
### Modern Promises (async / await)
"Syntactic sugar" over Traditional Promises
- It works exactly the same way internally
- Makes your code easier to read

Binding
- `async function` declaration
- `await` Keyword whithin the function body
    - Pauses the execution of our function until the promise is resolved
    - But while this function is paused, the rest of your code keeps running
```JavaScript
async function getUsers() {
    try {
        const response = await fetch('https://api.example.false/users');
        const js = await response.json();
        console.log(js)
    } catch (error) {
        console.log('async error:', error)
    } finally {
        // Do something useful...
    }
}
```
### Axios (external library)
- Reject the Promise when the HTTP response comes back with a failed status code
- Allow to set up global headers that apply to all your requests
- Automatically includes the JSON Content-Type header
- Automatically converts JS to JSON and JSON to JS
- Isomorphic
    - NPM package `npm install axios`
    - Script tag `<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>`

```JavaScript
axios.defaults.headers.common['Authorization'] = 'Bearer your-access-token-here'; 
axios.defaults.headers.common['CSRF-Token'] = 'your-unique-token-here';

async function getUsers() {
    try {
        const response = await axios.get('https://api.example.false/users');
        console.log(response.data)
    } catch (error) {
        console.log('Axios error:', error)
    }
}

async function addUser() {
    try {
        const response = await axios.post(
            'https://api.example.false/users',
            { name: 'John' }
        );
        console.log(response.data)
    } catch (error) {
        console.log('Axios error:', error)
    }
}
```
## Error handling
### Traditional Promises (then / catch)
```JavaScript
fetch('https://api.example.false/users')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not OK')
        }
        return response.json()
    })
    .then(js => console.log(js))
    .catch(error => console.log('Promise error:', error));
```
### Modern Promises (async / await)
```JavaScript
async function getUsers() {
    try {
        const response = await fetch('https://api.example.false/users');
        if (!response.ok) {
            throw new Error('Network response was not OK')
        }
        const js = await response.json();
        console.log(js)
    } catch (error) {
        console.log('async error:', error)
    }
}
```
### Axios (external library)
```JavaScript
axios.get('https://api.example.false/users')
    .then(response => console.log(response.data))
    .catch(error => console.log('Axios error:', error));
```
## Security
#### Authentication
Proving that the user is who they claim they are
- Authorization header
    - A bearer token or acces token
#### CORS
Cross-Origin Resource Sharing
- Control which domains are allowed to make requests from a given server
- CORS policies only allow requests from certain origins or domains
    - Implemented at the server level
        - The server will still receive the request and process it
        - But the browser won't allow you to access the response
#### CSRF
Cross-Site Request Forgery
- When an attacker tricks the victim into performing actions they didn't intend to perform
- A unique and random token called a CSRF token must be sent with each request to verify that it's legitimate
### Fetch API

```JavaScript
fetch('https://api.example.false/users', {
    headers: {
        'Authorization': 'Bearer your-access-token-here',
        'CSRF-Token': 'your-unique-token-here'
    }
});
```
### Modern Promises (async / await)
```JavaScript
async function getUsers() {
    const response = await fetch('https://api.example.false/users', {
        headers: {
            'Authorization': 'Bearer your-access-token-here',
            'CSRF-Token': 'your-unique-token-here'
        }
    })
}
```
### Axios (external library)
```JavaScript
axios.get('https://api.example.false/users', {
    headers: {
        'Authorization': 'Bearer your-access-token-here',
        'CSRF-Token': 'your-unique-token-here'
    }
});
```