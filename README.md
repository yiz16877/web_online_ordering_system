# Online Order System for restaurant

A server that serves a webpage, its resources, and some data

## How to use

- Click `Remix` to get started this project with Express.js.
- Click `Show` to get started this project with index.ejs.

## Descrptions of using

### Register:

- User create their account with username, email and password.
- Mailboxes that have already been registered cannot be re-registered.
- The password must meet the requirements and the confirmed password must be consistent with the original input password

---

### User Login:

- Login with their username, email and password. When you login, redirect to the homepage of our system.
- Users can modify their information in My profile

---

### Admin Login:

- Login with admin@pitt.edu and password is adminadmin. When you login admin redirect to the homepage of our system.

---

## Front End:

- Edit `views/index.html` to change the content of the webpage
- `routes/user.js` and `routes/index.js` are the javacript that runs when you load the webpage
- `public/style.css` is the styles for `views/index.html`
- Medias used in our system store in `assets`

---

## Back End:

- Our system starts at `app.js`
- Our frameworks and packages are stored in `package.json`
- Our Database key are stored in `.env` (nobody can see this but you and people you invite)
- We use MongoDB database and schema information are stored in `models`
