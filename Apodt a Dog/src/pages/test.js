const accordionData = [
  {
    title: "2nd Division Women",
    description:
      "We are a fun team that wants to win games! The women's team consists of 10-15 players...",
    trainingInformation: [
      "Monday kl. 18.30 - 20.00",
      "Onsdag kl. 19.30 - 21.00",
    ],
    coach: "The team work together as coaches",
    fee: ["1,700 kr. / season", "1,200 kr. / season for students"],
    photoSrc:
      "http://agf.nataliasokolowska.dk/wp-content/uploads/2023/05/Team-photo.png",
    trialLink:
      "https://motivu.dk/klubber/1006/agf-basketball/traeninger/3254/2-div-damer",
    joinLink:
      "https://www.conventus.dk/dataudv/www/new_tilmelding.php?foreningsid=2340&gruppe=793128&skjul_allerede_medlem=0&skjul_nyt_medlem=0&sprog=da",
    studentLink:
      "https://www.conventus.dk/dataudv/www/new_tilmelding.php?foreningsid=2340&gruppe=805403&skjul_allerede_medlem=0&skjul_nyt_medlem=0&sprog=da",
  },
  // Add the information for the other teams like this
];

// Access the info for a specific team:
console.log(accordionData[0].title); // '2nd Division Women'
console.log(accordionData[0].description); // Description for 2nd Division Women

// function to generate the HTML structure based on the data in the object

function createAccordionPanel(panelData) {
  const accordion = document.createElement("div");
  accordion.className = "accordion";

  const accordionTitle = document.createElement("div");
  accordionTitle.className = "accordionTitle";
  accordionTitle.innerHTML = `
    <p class="accordionHeading">${panelData.title}</p>
    <p class="arrow">></p>
  `;

  const panel = document.createElement("div");
  panel.className = "panel";
  panel.innerHTML = `
    <div class="panelLeft">
      <p class="description">${panelData.description}</p>
      <div class="trainingInformation">
        <p class="boldTeam">Training information</p>
        ${panelData.trainingInformation
          .map((info) => `<p>${info}</p>`)
          .join("")}
      </div>
      <div>
        <p class="boldTeam">Coach</p>
        <p>${panelData.coach}</p>
        <div class="feeSection">
          <p class="fee boldTeam">Fee:</p>
          ${panelData.fee.map((fee) => `<p>${fee}</p>`).join("")}
        </div>
      </div>
    </div>
    <div class="panelRight">
      <img src="${
        panelData.photoSrc
      }" alt="photo of the team" class="teamPhoto">
      <div class="teamButtons">
        <a href="${
          panelData.trialLink
        }"><button class="blueButton">Sign up for a free trial</button></a>
        <a href="${panelData.joinLink}"><button>Join the team</button></a>
      </div>
      <a href="${
        panelData.studentLink
      }" class="studentLink">Join as a student</a>
    </div>
  `;

  accordion.appendChild(accordionTitle);
  accordion.appendChild(panel);

  return accordion;
}

const accordionContainer = document.getElementById("accordionContainer"); // Get the container where the accordion panels should be added

accordionData.forEach((data) => {
  const panel = createAccordionPanel(data);
  accordionContainer.appendChild(panel);
});
