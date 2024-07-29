# Example Plain Headless Support Portal

This is a minimally styled example [Next.js](https://nextjs.org/) project demonstrating how you can use the Plain API to create a custom support portal. 

To view the headless portal, go to: https://example-headless-portal.vercel.app/

⚠️ This example may be hard to follow before reading the [high level overview in our docs](https://www.plain.com/docs/headless-support-portal).

🆘 Headless portal implementations vary depending on your stack and requirements. If you are interested in some face-to-face advice on how to best make use of headless portals, reach out to us via the Plain app or on help@plain.com. 

## Set up 

To run this example you need to have a workspace set up with [Plain](https://www.plain.com/) on at least the [Grow plan](https://www.plain.com/pricing).

### Step 1: Create a workspace and get an API key

Go to Plain and [create a machine user and API key](https://www.plain.com/docs/api-reference/graphql/authentication). The API key will need the following permissions which you can paste on the create API key page: 

```
attachment:download,company:read,customer:read,customerGroup:read,customerGroupMembership:read,customerTenantMembership:read,email:read,label:read,labelType:read,note:read,roles:read,serviceLevelAgreement:read,tenant:read,tenant:search,thread:read,tier:read,tierMembership:read,timeline:read,user:read,workspace:read,threadField:read,threadFieldSchema:read,customer:create,customer:edit,thread:create,thread:edit
```

### Step 2: Create demo data

In a real implementation this headless portal would typically be built directly in your app and you would query for support threads for a customer's tenant. 

In this fictional example the app is not behind any authentication and is showing the same support requests for all viewers. This means you have to set up all the demo data required for this example to run locally agains your workspace.

Specifically this means doing two things:

- [Creating a tenant](https://www.plain.com/docs/api-reference/graphql/tenants/upsert) with the external id `abcd1234`
- [Adding a customer to the tenant you just created](https://www.plain.com/docs/api-reference/graphql/tenants/add-customers)

This is hardcoded in `api/contact-form/routes.ts` if you'd like to use a different tenant id.


### Step 3: Run the example

```bash
npm install
PLAIN_API_KEY=<your_key> npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to check it out!
