//You can edit ALL of the code here
let rootTag = document.getElementById("root");

function setup() {
  const allEpisodes = getAllEpisodes();

  //creat a function for Season & Episode number, which is going to be used at level 100
  function creatTwoDigits(n) {
    return n.toString().padStart(2, '0');
  }
  //level 100:=================================================================================================
  let articleTag = document.createElement("article");
  articleTag.className = "episodes_article";
  //creating a function to show episodes
  const episodesHandler = (myArray) => {
    //this while loop will reset our articleTag when articleTag.hasChildNodes is true, otherwise any input would be added to 73 episodes, otherwise we would get filtered episode plus all the 73 episodes
    while (articleTag.hasChildNodes()) {
      articleTag.removeChild(articleTag.lastChild)
    }

    //define an h1 tag when our input is not in cards
    if (myArray.length === 0) {
      return articleTag.innerHTML = "<h1>Oops! Nothing found...</h1>"
    }
    //creating the episodes on our page
    myArray.forEach(obj => {

      let cardDiv = document.createElement("div");
      cardDiv.setAttribute("class", "card");
      articleTag.appendChild(cardDiv);

      let imgTag = document.createElement("img");
      imgTag.src = obj.image.medium;
      cardDiv.appendChild(imgTag);

      let h1Tag = document.createElement("h1");
      h1Tag.innerHTML = `${obj.name} - S${creatTwoDigits(obj.season)}E${creatTwoDigits(obj.number)}`;
      cardDiv.appendChild(h1Tag);


      let pTag = document.createElement("p");
      pTag.innerHTML = obj.summary;
      cardDiv.appendChild(pTag);

    })
  }
  episodesHandler(allEpisodes)

  //to create Search Bar. level 200:========================================================================
  let divSearchBar = document.createElement("div");
  rootTag.appendChild(divSearchBar);

  let spanTag = document.createElement("span");
  spanTag.className = "input_span";
  divSearchBar.appendChild(spanTag);

  divSearchBar.setAttribute("id", "searchWarpper");
  rootTag.appendChild(divSearchBar);
  let inputTag = document.createElement("input");
  inputTag.setAttribute("type", "text");
  inputTag.setAttribute("name", "searchBar");
  inputTag.setAttribute("id", "searchBar");
  inputTag.setAttribute("placeholder", "search..");
  inputTag.className = "searchbar_input"
  divSearchBar.appendChild(inputTag);
  rootTag.appendChild(articleTag);

  //add event to input for to show live search
  inputTag.addEventListener("input", (event) => {

    let myDisplay = allEpisodes.filter(obj =>
      obj.name.includes(event.target.value) || obj.summary.includes(event.target.value)
    );
    spanTag.innerText = `Displaying ${myDisplay.length}/${allEpisodes.length} episodes`;
    //call our new array throght episodeHandler function
    episodesHandler(myDisplay);
  })
  //level 300:===============================================================================================
  let selectTag = document.createElement("select");
  divSearchBar.appendChild(selectTag);
  selectTag.setAttribute("class", "episode");

  allEpisodes.forEach(obj => {
    let optionTag = document.createElement("option");
    optionTag.setAttribute("value", obj.name);
    optionTag.innerHTML = `S${creatTwoDigits(obj.season)}E${creatTwoDigits(obj.number)} - ${obj.name}`;
    selectTag.appendChild(optionTag);

  })
  let noneValueOption = document.createElement("option");
  noneValueOption.value = "none";
  noneValueOption.innerText = "Not Selected";
  selectTag.appendChild(noneValueOption);
  noneValueOption.selected = true;

  //add change event 
  selectTag.addEventListener("change", () => {
    const filteredEpisodes = allEpisodes.filter(obj =>
      obj.name === selectTag.value
    )
    //if value of selectTag is not selected, allEpisodes should be shown at the beginning
    selectTag.value === "none" ? episodesHandler(allEpisodes) : episodesHandler(filteredEpisodes);
  })
}


window.onload = setup;