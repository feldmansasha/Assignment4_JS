//constants for diffrent html tags
const userInput=document.querySelector('.userInput');
const submitButton=document.querySelector('#submitButton');
const tableBody=document.querySelector('#tableBody');
const studentNumber=document.querySelector('#studentNumber');
const studentName=document.querySelector('#studentName');

// fetch request to connect to the API
// Resuls depends on the user input
function spotifyData(event){
    event.preventDefault();
    // url with user request
    const url = `https://spotify23.p.rapidapi.com/search/?q=${userInput.value}&type=albums&offset=0&limit=10&numberOfTopResults=5`;
    // parameters to use the api
    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '8d0cb52820mshd314d68a69c6e89p1f9b41jsn71392be644aa',
		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
	    }
    };
    // fetch request
    fetch(url, options)
    .then(response=>response.json())
    .then(json=>displayTopSongs(json));

}

function displayTopSongs(json){
    // delete previous results to allow multiple request without refreshing the page
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    };
    // display student info if user entered the value 
    // else: alert message to the user
    if(userInput.value===""){
        alert("Enter artist name");
    } else{
    studentName.textContent="Created by Alex Feldman";
    studentNumber.textContent="Student ID: 200544551";
    }

    // saving array with information about albums of the requested artist
    let tenAlbums = json.albums.items;

    for (let i = 0; i < tenAlbums.length; i++) {
        // creating elements for the info from api
        let tableTr = document.createElement("tr"); // <tr></tr>
        let albumNameTd= document.createElement("td"); // <td></td>
        let linkTd = document.createElement("td"); // <td></td>
        let yearTd = document.createElement("td"); // <td></td>
        let posterTd = document.createElement("td"); // <td></td>
        let a = document.createElement("a");
        a.textContent = "Listen to the album";

        // add info from the array
        albumNameTd.textContent = tenAlbums[i].data.name;    
        yearTd.textContent = tenAlbums[i].data.date.year;
        linkTd = tenAlbums[i].data.uri;
        a.setAttribute("href", linkTd);

        // displaying the cover photo and adjusting the size of it
        let image = document.createElement("img"); // <img>
        image.setAttribute("src", tenAlbums[i].data.coverArt.sources[0].url);
        image.setAttribute("height", "100px");
        posterTd.appendChild(image);

        // adding info into one row
        tableTr.appendChild(yearTd);
        tableTr.appendChild(albumNameTd);
        tableTr.appendChild(posterTd);
        tableTr.appendChild(a);

        // adding row to the existing table
        tableBody.appendChild(tableTr);
}
}
//Event Listener waiting for the press of the submit button by the user
submitButton.addEventListener("click", spotifyData);