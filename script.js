const form = document.getElementById('userForm');
const input = document.getElementById('usernameInput');
const output = document.getElementById('output');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userName = input.value.trim();

  if (!userName) return;

  output.innerHTML = '<p>Loading...</p>';

  try {
    const res = await fetch(`https://api.github.com/users/${userName}`);

    if (!res.ok) {
      output.innerHTML = '<p style="color:red;font-weight:bold;">❌ User not found.</p>';
      return;
    }

    const data = await res.json();

    output.innerHTML = `
      <div class="profile-card">
        <img src="${data.avatar_url}" class="profile-img" alt="Profile Picture" />
        <div class="profile-details">
          <h2>${data.name || "No Name Provided"}</h2>
          <p class="username">@${data.login}</p>
          <p class="bio">${data.bio || "No bio available."}</p>
          <div class="info-grid">
            <div>
              <p class="label">Followers</p>
              <p class="value">${data.followers}</p>
            </div>
            <div>
              <p class="label">Public Repos</p>
              <p class="value">${data.public_repos}</p>
            </div>
            <div>
              <p class="label">Private Repos</p>
              <p class="value">🔒 Not Available</p>
            </div>
            <div>
              <p class="label">Joined GitHub</p>
              <p class="value">${new Date(data.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  } catch (error) {
    output.innerHTML = '<p style="color:red;font-weight:bold;">⚠️ Error fetching data.</p>';
  }
});
