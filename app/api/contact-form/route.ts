import { TENANT_EXTERNAL_ID } from "@/app/page";
import { plainClient } from "@/lib/plainClient";
import { inspect } from "util";

export type RequestBody = {
    title: string;
    message: string;
}

// When implementing this for real, take these values from user auth (e.g validate auth token and take values from claims)
const name = "Bob Smith";
const email = "bob.smith@example.com";

export async function POST(request: Request) {
    // In production validation of the request body might be necessary.
  const body = await request.json();

  const upsertCustomerRes = await plainClient.upsertCustomer({
    identifier: {
      emailAddress: email,
    },
    onCreate: {
      fullName: name,
      email: {
        email: email,
        isVerified: true,
      },
      tenantIdentifiers: [{externalId: TENANT_EXTERNAL_ID}]
    },
    onUpdate: {},
  });

  if (upsertCustomerRes.error) {
    console.error(
      inspect(upsertCustomerRes.error, { showHidden: false, depth: null, colors: true })
    );
    return new Response(upsertCustomerRes.error.message, {status: 500});
  }

  console.log(`Customer upserted ${upsertCustomerRes.data.customer.id}`);

  const createThreadRes = await plainClient.createThread({
    customerIdentifier: {
      customerId: upsertCustomerRes.data.customer.id,
    },
    title: body.title,
    tenantIdentifier: {externalId: TENANT_EXTERNAL_ID},
    components: [
      {
        componentText: {
          text: body.message,
        },
      },
    ],
  });

  if (createThreadRes.error) {
    console.error(inspect(createThreadRes.error, { showHidden: false, depth: null, colors: true }));
    return new Response(createThreadRes.error.message, {status: 500});
  }

  console.log(`Thread created ${createThreadRes.data.id}.`);


   
    return new Response('', {status: 200})
  }