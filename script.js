const loadClubs = () => {
  document.getElementById('search-btn').classList.add('d-none');
  document.getElementById('spinner').classList.remove('d-none');

  const userInput = document.getElementById('user-input');
  const userClubs = userInput.value;
  userInput.value = '';
  url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${userClubs}
    `
  fetch(url)
    .then(res => res.json())
    .then(data => displayClubs(data))
}

const displayClubs = clubs => {
  document.getElementById('spinner').classList.add('d-none');
  document.getElementById('search-btn').classList.remove('d-none');

  const clubsContainer = document.getElementById('clubs-container');
  clubsContainer.textContent = '';

  if (clubs.teams == null) {
    alert("Club doesn't exist. Please try searching a club that exists.")
  }
  else {
    document.getElementById('search-container').classList.remove('search-center');
    for (club of (clubs.teams)) {
      const div = document.createElement('div');
      div.classList.add('col');
      div.innerHTML = `
    
                    <div class="card h-100 bg-dark text-white">
                      <img src="${club.strTeamBadge}" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">${club.strTeam}</h5>
                        <p class="card-text">${club.strDescriptionEN.slice(0, 250)}...</p>
                      </div>
                      <div class="card-footer">
                        <button data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="readMore('${club.idTeam}')" class="btn btn-danger">Read More</button>
                      </div>
                    </div>
  
      `
      clubsContainer.appendChild(div);
    }
  }

}

const readMore = clubId => {

  const url = `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${clubId}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayReadMore(data))
}

const displayReadMore = club => {
  console.log(club);
  const { strTeam, strLeague, strTeamBadge, strDescriptionEN, strCountry } = club.teams[0];

  document.getElementById('modal-header').innerHTML = `
     <div>
         <h5 class="modal-title" id="staticBackdropLabel">${strTeam}</h5>
         <p>${strLeague}</p>
     </div>
     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  `;

  document.getElementById('modal-footer').innerHTML = `
    <p>Country: ${strCountry}</p>
  `;

  document.getElementById('modal-body').innerHTML = `
     <img class="mx-auto" width="100px" src="${strTeamBadge}" alt="">
     <p>${strDescriptionEN}</p>
  `;

}