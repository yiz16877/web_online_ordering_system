# Online Order System for restaurant

A server that serves a webpage, its resources, and some data
### Descrptions of using

#### Register:

- User create their account with username, email and password.
- Mailboxes that have already been registered cannot be re-registered.
- The password must meet the requirements and the confirmed password must be consistent with the original input password

---

#### User Login:

- Sign-up: Create account with username, email, password. If success, redirect to the Find Page.
- Log-in: Log-in with username or email. If success, redirect to the Find Page, else show error.
- Profile: Show users historical comments. Modify their users' name or password.
- Content: Show restaurants details like OpenHour, Pictures, etc.

---

On the front-end,

- Edit `views/index.html` to change the content of the webpage
- `public/client.js` is the javacript that runs when you load the webpage
- `public/style.css` is the styles for `views/index.html`
- Drag in `assets`, like images or music, to add them to your project

---

On the back-end,

- your app starts at `server.js`
- add frameworks and packages in `package.json`
- safely store app secrets in `.env` (nobody can see this but you and people you invite)
- store database information

---

On the Database,

- using MongoDB through 
- models 

Click `Show` in the header to see your app live. Updates to your code will instantly deploy.