async function fetchCoordinates(postcodes) {
  const chunkSize = 100; // Postcodes.io limit is 100 postcodes per request
  let allCoordinates = [];

  for (let i = 0; i < postcodes.length; i += chunkSize) {
    const chunk = postcodes.slice(i, i + chunkSize);

    try {
      const response = await fetch("https://api.postcodes.io/postcodes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postcodes: chunk }),
      });

      const data = await response.json();

      if (response.ok) {
        const chunkCoordinates = data.result.map((item) => ({
          postcode: item.query,
          latitude: item.result ? item.result.latitude : null,
          longitude: item.result ? item.result.longitude : null,
        }));
        allCoordinates = allCoordinates.concat(chunkCoordinates);
      } else {
        console.error("Error fetching coordinates:", data);
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  }

  return allCoordinates;
}

const map = L.map("map").setView([54.5, -3], 6); // Centred over the UK

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const postcodes = [
  "ME17 2LL",
  "W7 1JJ",
  "BA21 3EP",
  "DN14 6AN",
  "RG45 7HZ",
  "NG10 4WT",
  "GL1 3JN",
  "WD25 7HW",
  "MK12 5BT",
  "NE27 2AA",
  "WS4 1BW",
  "S9 3TY",
  "CF14 3XG",
  "RG31 5TY",
  "KT3 6NU",
  "SM2 6TQ",
  "DE15 0BA",
  "E17 9RZ",
  "HX2 9TZ",
  "DN11 8EF",
  "NE3 3RU",
  "RG9 4BW",
  "SL3 7EF",
  "E17 3PY",
  "B97 5LX",
  "DE73 5UB",
  "LU3 3TL",
  "SL3 7EF",
  "WS4 1BW",
  "DE11 0QA",
  "NR5 0PX",
  "DA11 7LS",
  "B16 9GD",
  "DA6 7AB",
  "BS6 5RD",
  "DA6 7NJ",
  "CM12 0RT",
  "DA15 9NU",
  "OL12 0PZ",
  "B71 2BX",
  "NE33 4UG",
  "PR9",
  "CV32 6NB",
  "ST4 8PQ",
  "BD20 7RL",
  "NN4 8QS",
  "BS7 9NL",
  "LU1 3GF",
  "HP18 0WS",
  "TR1 1TN",
  "LU3 1HE",
  "NG8 4HY",
  "NP19 7XU",
  "NE33 0PJ",
  "LL11 4HB",
  "KT22 7NZ",
  "BB10 2AT",
  "NR1 1RY",
  "LU3 3TL",
  "NE46 3JB",
  "PR9 8PA",
  "M41 5DR",
  "NE12 8ER",
  "M16 8PR",
  "IG11 9UW",
  "NE3 3RU",
  "NG7 6ND",
  "MK10 7HE",
  "CR9 2EE",
  "CT8 8LX",
  "GL10 2HY",
  "TW17 9EE",
  "WF10 4JQ",
  "MK10 7HE",
  "AL1 4PR",
  "B28 0AA",
  "RM16 3JL",
  "EN1 1YQ",
  "PE28 5TQ",
  "BA2 3LA",
  "MK7 7WH",
  "SL6 2QB",
  "RM8 1JT",
  "TN4 9XB",
  "SN10 3AG",
  "SO15 2WZ",
  "MK7 7WH",
  "FK10 1TA",
  "PE30 4QG",
  "CT2 8QA",
  "RM16 3NJ",
  "BS13 7DQ",
  "CH48 5DH",
  "BH19 2PH",
  "TW8 0PG",
  "M14 6PL",
  "PE25 2QH",
  "N15 3QR",
  "LL22 7HE",
  "HD6 3XB",
  "BB2 2JR",
  "SM1 3QU",
  "NE46 3JB",
  "NW1 2BU",
  "SE9 5EE",
  "ST14 8DU",
  "WS4 1BW",
  "NG19 8QA",
  "SN2 7SH",
  "BA15 1DZ",
  "SL6 7NQ",
  "BR2 8HP",
  "NN18 9NS",
  "LE11 1NH",
  "CO4 9PU",
  "SL6 7NQ",
];

fetchCoordinates(postcodes).then((locations) => {
  locations.forEach((location) => {
    if (location.latitude && location.longitude) {
      L.marker([location.latitude, location.longitude])
        .addTo(map)
        .bindPopup(location.postcode);
    } else {
      console.log(`No coordinates found for ${location.postcode}`);
    }
  });
});
