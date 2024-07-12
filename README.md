# Plain headless portal

This is a minimally styled example [Next.js](https://nextjs.org/) project demonstrating how you can use the Plain API to create a custom support portal. In the portal your customers can log in to:

- Raise new support requests
- View requests raised by anyone in their tenant

## Getting Started

In order to use this example you first need to have a workspace set up with [Plain](https://www.plain.com/) on at least the [Grow plan](https://www.plain.com/pricing).

Now you will need to create an API key for the support portal backend to authenticate with Plain.

- Log in to Plain and go to `Settings -> Machine users`
- Click `Add machine user` and fill in the details
- You should be taken to your machine user, now click `Add API key`
- TODO p-7884: create minimal set of perms and copy mechanism

Once you have your key you can get started:

```bash
npm install
PLAIN_API_KEY=<your_key> npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Screenshots

 ![View the list of requests](/screenshots/thread-list.png)

 ![See the details of a support request](/screenshots/thread-page.png)

 ![Create a new support request](/screenshots/new-request.png)
