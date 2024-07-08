export default async function ThreadPage({
  params,
}: {
  params: { threadId: string };
}) {
  const data = await fetch("https://core-api.uk.plain.com/graphql/v1", {
    method: "POST",
    body: JSON.stringify({
      query: `{ 
      
        thread(threadId: "th_01J299WQGA3VNQ4FDECV7JK6MC") {
            timelineEntries {
                edges {
                    node {
                        id
                        timestamp {
                            iso8601
                        }
                        actor {
                            __typename
                            ... on UserActor {
                                user {
                                    fullName
                                }
                            }
                            ... on CustomerActor {
                                customer {
                                    fullName
                                }
                            }
                            ... on MachineUserActor {
                                machineUser {
                                    fullName
                                }
                            }
                        }
                        entry {
                            __typename
                            ... on CustomEntry {
                                title
                                components {
                                    __typename
                                    ... on ComponentText {
                                    text
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } 
      
      
      }`,
    }),
    headers: {
      "Content-Type": "application/json",
      "Plain-Workspace-Id": "w_01J28VHKDK5PV3DJSZAA01XGAN",
      Authorization:
        "Bearer GIT_HISTORY_OVERWRITTEN",
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
  return (
    <div>
      {params.threadId}
      {JSON.stringify({ data })}
    </div>
  );
}
