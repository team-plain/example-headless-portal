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
- Copy the permissions from below and click 'Paste permissions'
- Fill in the description and save the key

```
attachment:download,company:read,customer:read,customerGroup:read,customerGroupMembership:read,customerTenantMembership:create,customerTenantMembership:read,email:read,label:read,labelType:read,note:read,roles:read,serviceLevelAgreement:read,tenant:read,tenant:search,thread:read,tier:read,tierMembership:read,timeline:read,user:read,workspace:read,threadField:read,threadFieldSchema:read,customer:create,customer:edit,thread:create,thread:edit,thread:reply
```

Once you have your key you can get started:

```bash
npm install
PLAIN_API_KEY=<your_key> npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
