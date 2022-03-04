//You can edit ALL of the code here
let rootTag = document.getElementById("root");

const getAllEpisodesHandler = () => {
  const all = getAllShows();
  // const random = Math.floor(Math.random() * all.length - 1) + 1;

  return fetch(`https://api.tvmaze.com/shows/82/episodes`)
    .then(res => res.json())
    .then(allEpisodes => {
      return rendering(allEpisodes, all);
    })
    .catch(er => console.log(er));
}


function rendering(allEpisodes, all) {

  let myEpisodes = allEpisodes;
  //creat a function for Season & Episode number, which is going to be used at level 100
  function creatTwoDigits(n) {
    return n.toString().padStart(2, '0');
  }
  //level 100:=================================================================================================
  let articleTag = document.createElement("article");
  articleTag.className = "episodes_article";
  //Header:
  let headerTag = document.createElement("header");
  headerTag.className = "header_container";
  rootTag.appendChild(headerTag);

  let navTag = document.createElement("nav");
  navTag.className = "nav_bar";
  headerTag.appendChild(navTag);

  let divMenuTag = document.createElement("div");
  divMenuTag.className = "menu";
  navTag.appendChild(divMenuTag);




  let divBurger = document.createElement("div");
  headerTag.appendChild(divBurger);
  divBurger.className = "burger_menu";

  const myMenu = ["Login", "News", "Shopping", "Contact"];

  let divNavBurger = document.createElement("div");
  divNavBurger.className = "burger_container";
  let divTopBurger = document.createElement("div");
  let divMiddleBurger = document.createElement("div");
  let divBottomBurger = document.createElement("div");
  divTopBurger.className = "top";
  divMiddleBurger.className = "middle";
  divBottomBurger.className = "bottom";
  divNavBurger.append(divTopBurger, divMiddleBurger, divBottomBurger);

  let ulBurgur = document.createElement("ul");
  ulBurgur.setAttribute("class", "ul_burger");

  navTag.appendChild(divNavBurger);
  for (let i = 0; i < myMenu.length; i++) {
    let liTag = document.createElement("li");
    liTag.innerHTML = `<a href=#${myMenu[i]}>${myMenu[i]}</a>`
    ulBurgur.appendChild(liTag);
  }
  divBurger.appendChild(ulBurgur.cloneNode(true));
  divMenuTag.appendChild(ulBurgur.cloneNode(true));


  //=============================================================creating a function to show episodes
  let inputTag = document.createElement("input");
  let selectTag = document.createElement("select");

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
      //adding an if statement to make sure that we have replacement for those none-medium objects
      // imgTag.src = obj.image.medium;
      if (obj.image) {
        imgTag.src = obj.image.medium;
      } else {
        imgTag.src = "https://cdn.dribbble.com/users/2226349/screenshots/12050930/media/1656dfed347dd8bcb9df5b15aa46908e.jpg?compress=1&resize=1200x900&vertical=top";
      }

      cardDiv.appendChild(imgTag);

      let h1Tag = document.createElement("h1");
      h1Tag.innerHTML = `${obj.name} - S${creatTwoDigits(obj.season)}E${creatTwoDigits(obj.number)}`;
      cardDiv.appendChild(h1Tag);


      let pTag = document.createElement("p");
      pTag.innerHTML = obj.summary;
      cardDiv.appendChild(pTag);

    })


  }
  episodesHandler(allEpisodes);

  // Search input listener and filtering depending on movie
  inputTag.addEventListener("input", (event) => {

    let myDisplay = myEpisodes.filter(obj =>
      obj.name.includes(event.target.value) || obj.summary.includes(event.target.value)
    );
    spanTag.innerText = `Displaying ${myDisplay.length}/${allEpisodes.length} episodes`;
    //call our new array throght episodeHandler function
    episodesHandler(myDisplay);
  })
  //=================================================================Listener for select Episodes tag
  selectTag.addEventListener("change", () => {
    const myArray = myEpisodes.filter(obj => obj.name === selectTag.value);
    myArray.length === 0 ? episodesHandler(myEpisodes) : episodesHandler(myArray);

  })

  //======================================= Select tag listener and filtering depending on movie
  const createSelectEpisodes = (arr) => {

    selectTag.innerHTML = "";
    arr.forEach(obj => {

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

  }
  createSelectEpisodes(myEpisodes);

  //to create Search Bar. level 200:========================================================================
  let divSearchBar = document.createElement("div");
  navTag.appendChild(divSearchBar);



  let spanTag = document.createElement("span");
  spanTag.className = "input_span";
  spanTag.innerText = `Displaying ${myEpisodes.length}/${allEpisodes.length} episodes`;


  divSearchBar.setAttribute("id", "searchWarpper");
  navTag.appendChild(divSearchBar);
  inputTag.setAttribute("type", "text");
  inputTag.setAttribute("name", "searchBar");
  inputTag.setAttribute("id", "searchBar");
  inputTag.setAttribute("placeholder", "search..");
  inputTag.className = "searchbar_input"
  divSearchBar.appendChild(inputTag);
  rootTag.appendChild(articleTag);

  //add event to input for to show live search

  //level 300:===============================================================================================

  divSearchBar.appendChild(selectTag);
  selectTag.setAttribute("class", "episode");




  //level 400:=====================================================
  let selectFavTag = document.createElement("select");
  selectFavTag.setAttribute("id", "fav_tvshow");
  divSearchBar.appendChild(selectFavTag);



  const sortedArray = all.sort((a, b) => a.name.localeCompare(b.name));
  all.forEach(obj => {

    let optionFavTag = document.createElement("option");
    optionFavTag.innerHTML = obj.name;
    optionFavTag.value = `${obj.id}`;
    selectFavTag.appendChild(optionFavTag);


  })


  selectFavTag.addEventListener("change", (e) => {
    fetch(`https://api.tvmaze.com/shows/${e.target.value}/episodes`)
      .then(res => {
        if (res && res.ok) {
          return res.json()
        }
      })
      .then(data => {
        myEpisodes = data;
        createSelectEpisodes(data);
        return episodesHandler(data)
      })
  })

}


window.onload = getAllEpisodesHandler;