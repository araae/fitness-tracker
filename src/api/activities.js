const API = import.meta.env.VITE_API;

/** Fetches an array of activities from the API. */
export async function getActivities() {
  try {
    const response = await fetch(API + "/activities");
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}

/**
 * Sends a new activity to the API to be created.
 * A valid token is required.
 */
export async function createActivity(token, activity) {
  if (!token) {
    throw Error("You must be signed in to create an activity.");
  }

  const response = await fetch(API + "/activities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(activity),
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}

//define the asynchronous deleteActivity utility function exported to components
//perform an HTTP DELETE request targeting the matching activity id endpoint
//attach the provided authorization bearer token value into the request headers dictionary
//check if the server response flag is not okay and throw the response error message
//return the parsed confirmation payload json dictionary back to the caller

export async function deleteActivity(activityId, token) {
  const response = await fetch(API + "/activities/" + activityId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(
      result.message || "You are not authorized to delete this activity.",
    );
  }
}
