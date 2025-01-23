//data loader for saved itinerary

export async function loader() {
  try {
    const res = await fetch("http://localhost:5000/savedItineraries", {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (res.status === 200) {
      if (!data.searchedUserItinerary || data.searchedUserItinerary.length <= 0)
        return {
          message:
            "User does'nt exsist in the DB, try saving the itineraries first",
          status: 400,
        };
      else {
        alert("Successfully fetched the user itineararies from the Db");
        console.log(
          "Successfully fetched the user itineararies from the Db",
          data
        );
      }
      //   setUseritineraries(data);
    } else {
      alert("Cannot fetch the user itineararies from the Db");
    }

    return data;
  } catch (err) {
    alert("Error in fetching user saved itineraries from the DB");
    console.error(
      "Error in fetching user saved itineraries from the DB",
      err.message
    );

    return null;
  }
}
