//You can edit ALL of the code here
let rootTag = document.getElementById("root");
const mainTag = document.createElement("main");
const articleTag = document.createElement("article");
mainTag.appendChild(articleTag);
articleTag.className = "render_article";
mainTag.className = "main";
const searchCounterTag = document.createElement("h1");
searchCounterTag.className = "counter";
mainTag.append(searchCounterTag, articleTag);

//=================================================================================================================
function creatTwoDigits(n) {
  return n.toString().padStart(2, '0');
}
const getAllEpisodesHandler = () => {
  const all = getAllShows();
  fisrtPageRender(all);

}
//=================================================================================================================

//all means all TV Shows
function episodesRender(allEpisodes) {
  searchCounterTag.innerHTML = `found ${allEpisodes.length}`
  let myArray = allEpisodes;
  articleTag.innerHTML = "";

  //define an h1 tag when our input that user types is not in cards
  if (myArray.length === 0) {
    return articleTag.innerHTML = "<h1>Oops! Nothing found...</h1>"
  }

  //creating the episodes on our page
  myArray.forEach(obj => {

    let cardDiv = document.createElement("div");
    cardDiv.setAttribute("class", "card");
    articleTag.appendChild(cardDiv);
    //===============================

    let h1Tag = document.createElement("h1");
    h1Tag.innerHTML = `${obj.name} - S${creatTwoDigits(obj.season)}E${creatTwoDigits(obj.number)}`;
    cardDiv.appendChild(h1Tag);

    let imgTag = document.createElement("img");
    //adding an if statement to make sure that we have replacement for those none-medium objects
    if (obj.image) {
      imgTag.src = obj.image.medium;
    } else {
      imgTag.src = "https://cdn.dribbble.com/users/2226349/screenshots/12050930/media/1656dfed347dd8bcb9df5b15aa46908e.jpg?compress=1&resize=1200x900&vertical=top";
    }

    cardDiv.appendChild(imgTag);
    //description of each Episode:
    let pTag = document.createElement("p");
    pTag.innerHTML = obj.summary ? obj.summary : "Summary not found...!";

    pTag.className = "episode_paragraph";
    cardDiv.appendChild(pTag);

  })
}
const tvShowsRender = (allShows) => {
  searchCounterTag.innerHTML = `found ${allShows.length}`
  articleTag.innerHTML = "";
  let myArray = allShows;

  //================================Rendering shows on website=========================
  myArray.forEach(obj => {
    const {
      name,
      image,
      summary
    } = obj
    let tvshowCard = document.createElement("div");
    tvshowCard.className = "tvshow_card";
    //img TV SHOW
    let imgDiv = document.createElement("div");
    imgDiv.className = "tvshow_image_div";
    let tvshowImg = document.createElement("img");
    if (image) {
      tvshowImg.src = obj.image.medium;
    } else {
      tvshowImg.src = "https://cdn.dribbble.com/users/2226349/screenshots/12050930/media/1656dfed347dd8bcb9df5b15aa46908e.jpg?compress=1&resize=1200x900&vertical=top";
    }

    //div for h1, p and list: TV SHOW
    let divCardInfo = document.createElement("div");
    divCardInfo.className = "card_info";

    //name: TV SHOW
    let h1TvShow = document.createElement("h1");
    h1TvShow.className = "tvshow_title";
    h1TvShow.innerHTML = name ? name : "name not found";

    //creating div for p and ul: TV SHOW
    let divTvshowText = document.createElement("div");
    divTvshowText.className = "tvshow_texts";
    //Paragraph:TV SHOW


    divTvshowText.innerHTML = summary ? summary : "summary not found";
    imgDiv.append(tvshowImg, divCardInfo);
    //Ul list: TV SHOW
    let ulTvShowsTag = document.createElement("ul");
    ulTvShowsTag.className = "ul_tvshows";
    ulTvShowsTag.innerHTML = `<li>Genres: ${obj.genres.join(" | ")}</li><li>Status: ${obj.status}</li><li>Rating: ${obj.rating.average}</li>Time: ${obj.runtime} Minute(s)<li></li>`;


    divCardInfo.appendChild(ulTvShowsTag)
    tvshowCard.append(h1TvShow, imgDiv, divTvshowText);
    articleTag.appendChild(tvshowCard);
  })
}


function fisrtPageRender(arr) {
  let myArray = arr;
  //Header:
  let headerTag = document.createElement("header");
  headerTag.className = "header";
  rootTag.appendChild(headerTag);
  rootTag.appendChild(mainTag);
  //Nav Bar for desktop:
  let navTag = document.createElement("nav");
  navTag.className = "header_nav";
  headerTag.appendChild(navTag);

  let desktopMenuContainer = document.createElement("div");
  desktopMenuContainer.className = "header_menu_div";
  navTag.appendChild(desktopMenuContainer);
  //Hamberger Menu:
  let burgerMenuDiv = document.createElement("div");
  headerTag.appendChild(burgerMenuDiv);
  burgerMenuDiv.className = "burger_menu";

  const myMenu = ["Login", "News", "Shopping", "Contact"];

  const burgerButton = document.createElement("div");
  burgerButton.className = "burger_button";
  let divTopBurger = document.createElement("div");
  let divMiddleBurger = document.createElement("div");
  let divBottomBurger = document.createElement("div");
  divTopBurger.className = "top";
  divMiddleBurger.className = "middle";
  divBottomBurger.className = "bottom";
  burgerButton.append(divTopBurger, divMiddleBurger, divBottomBurger);

  let ulBurgur = document.createElement("ul");
  ulBurgur.setAttribute("class", "ul_burger");

  navTag.appendChild(burgerButton);
  for (let i = 0; i < myMenu.length; i++) {
    let liTag = document.createElement("li");
    liTag.innerHTML = `<a href=#${myMenu[i]}>${myMenu[i]}</a>`
    ulBurgur.appendChild(liTag);
  }
  //append one element twice:
  burgerMenuDiv.appendChild(ulBurgur.cloneNode(true));
  desktopMenuContainer.appendChild(ulBurgur.cloneNode(true));

  burgerButton.addEventListener("click", () => {
    burgerMenuDiv.classList.toggle("moving_menu");
  })
  //===========================Search input===================================
  let divSearchBar = document.createElement("div");
  const searchInput = document.createElement("input");

  searchInput.setAttribute("placeholder", "search..");
  searchInput.className = "search_bar";
  searchInput.value = "";

  searchInput.addEventListener("input", (event) => {
    let myDisplay = myArray.filter(obj => {
      //here the erorrs are being handled, not all tv shows have summary
      if (obj.genres || obj.status || obj.rating) {
        if (obj.summary && obj.summary.length > 1) {
          return obj.summary.includes(event.target.value) || obj.name.includes(event.target.value)
        }
      } else if (obj.summary && obj.name) {
        return obj.summary.includes(event.target.value) || obj.name.includes(event.target.value)
        //for episodes
      } else {
        obj.name.includes(event.target.value)
      }
    });

    selectFavTag.value === "allShows" ? tvShowsRender(myDisplay) : episodesRender(myDisplay);
  })
  //level 400:=====================================================
  let selectFavTag = document.createElement("select");
  divSearchBar.append(searchInput, selectFavTag);
  selectFavTag.setAttribute("id", "fav_tvshow");

  // creating and then sorting our dropdown menu of TV shows in an alphabetical order:
  const sortedArray = myArray.sort((a, b) => a.name.localeCompare(b.name));
  const allShowsOption = document.createElement("option");
  //value of selectfavTaf will always be all tv shows when the page loads
  allShowsOption.value = "allShows";
  allShowsOption.innerText = "All TV Shows";
  selectFavTag.appendChild(allShowsOption);
  sortedArray.forEach(obj => {
    let optionFavTag = document.createElement("option");
    optionFavTag.innerHTML = obj.name;
    optionFavTag.value = `${obj.id}`;
    selectFavTag.appendChild(optionFavTag);

  })

  //fetching data for TV shows drop down menu
  selectFavTag.addEventListener("change", (e) => {
    if (selectFavTag.value !== "allShows") {
      fetch(`https://api.tvmaze.com/shows/${e.target.value}/episodes`)
        .then(res => {
          if (res && res.ok) {
            return res.json()
          }
        })
        .then(data => {
          myArray = data;
          createSelectEpisodes(data);
          return episodesRender(data);
        })
    } else {
      myArray = arr;
      createSelectEpisodes();
      tvShowsRender(myArray);
    }
  })

  //to create Search Bar. level 200:========================================================================

  divSearchBar.setAttribute("id", "searchWarpper");

  navTag.appendChild(divSearchBar);

  // select for Episode:
  let selectEpisodeTag = document.createElement("select");
  selectEpisodeTag.className = "select_episode_tag";

  const createSelectEpisodes = (arr) => {
    if (divSearchBar.childNodes.length === 3) {
      divSearchBar.removeChild(divSearchBar.lastChild);
    }

    if (arr) {
      selectEpisodeTag.innerHTML = "";
      arr.forEach(obj => {

        let optionTag = document.createElement("option");
        optionTag.setAttribute("value", obj.name);
        optionTag.innerHTML = `S${creatTwoDigits(obj.season)}E${creatTwoDigits(obj.number)} - ${obj.name}`;
        selectEpisodeTag.appendChild(optionTag);
      })
      let noneValueOption = document.createElement("option");
      noneValueOption.value = "none";
      noneValueOption.innerText = "Not Selected";
      selectEpisodeTag.appendChild(noneValueOption);
      noneValueOption.selected = true;
      selectEpisodeTag.addEventListener("change", () => {
        const filteredEpisodes = myArray.filter(obj => obj.name === selectEpisodeTag.value);
        filteredEpisodes.length === 0 ? episodesRender(myArray) : episodesRender(filteredEpisodes);
      })
      divSearchBar.appendChild(selectEpisodeTag)
    }


  }


  tvShowsRender(arr);
}


window.onload = getAllEpisodesHandler;