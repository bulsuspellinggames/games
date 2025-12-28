const BIN_ID = "6951693a43b1c97be90a711a"; // paste your bin ID here
const API_KEY = "$2a$10$vtFc9uv3beCdsHzHCVNv2eC07iJ0zVdRgvqK71rZzyAoxWloiRAAm";

// Fetch current leaderboard
async function getLeaderboard() {
  const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
    headers: {
      "X-Master-Key": API_KEY
    }
  });
  const data = await res.json();
  return data.record.players || [];
}

// Update leaderboard
async function updateLeaderboard(newPlayer) {
  const players = await getLeaderboard();
  players.push(newPlayer); // Add new player

  await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": API_KEY
    },
    body: JSON.stringify({ players })
  });
}

// Example usage
updateLeaderboard({ name: "Kimberly", score: 120, game: "Lava Rush" });
getLeaderboard().then(players => console.log(players));
