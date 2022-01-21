const events = [{
        id: 1,
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 240000,
        date: "06/01/2017",
    },
    {
        id: 2,
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 250000,
        date: "06/01/2018",
    },
    {
        id: 3,
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 257000,
        date: "06/01/2019",
    },
    {
        id: 4,
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 130000,
        date: "06/01/2017",
    },
    {
        id: 5,
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 140000,
        date: "06/01/2018",
    },
    {
        id: 6,
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 150000,
        date: "06/01/2019",
    },
    {
        id: 7,
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 40000,
        date: "06/01/2017",
    },
    {
        id: 8,
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 45000,
        date: "06/01/2018",
    },
    {
        id: 9,
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 50000,
        date: "06/01/2019",
    },
];

//builds a list of distinct cities for dropdown menu
function buildDropDown() {

    //grab the event drop down we want to add cities to
    let eventDD = document.getElementById("eventDropDown");
    eventDD.innerHTML = "";

    //load out links from a template
    let ddTemplate = document.getElementById("cityDD-template");

    let curEvents = JSON.parse(localStorage.getItem("eventsArray")) || events;


    //map the city property to a new array
    let cities = curEvents.map((event) => event.city);

    //return a list of distinct cities
    let distinctCities = [...new Set(cities)];

    //use the drop down template
    let ddItemTemplate = document.importNode(ddTemplate.content, true);
    let li = ddItemTemplate.querySelector("li");
    let ddItem = li.querySelector("a");
    ddItem.setAttribute("data-city", "All");
    ddItem.textContent = "All";
    eventDD.appendChild(li);

    for (let index = 0; index < distinctCities.length; index++) {
        ddItemTemplate = document.importNode(ddTemplate.content, true);
        li = ddItemTemplate.querySelector("li");
        ddItem = li.querySelector("a");
        ddItem.setAttribute("data-city", distinctCities[index]);
        ddItem.textContent = distinctCities[index];
        eventDD.appendChild(li);

    }
    //display the stats
    displayStats(curEvents);
    displayData();

}

function displayStats(filteredEvents) {
    let total = 0;
    let average = 0;
    let most = 0;
    let least = -1;
    let currentAttendance = 0;

    for (let index = 0; index < filteredEvents.length; index++) {

        currentAttendance = filteredEvents[index].attendance

        total += currentAttendance;

        if (most < currentAttendance) {
            most = currentAttendance
        }

        //least calculation

        if (least == -1 || least > currentAttendance) {
            least = currentAttendance;
        }

    }

    //average calculation
    average = total / filteredEvents.length;





    document.getElementById("total").innerHTML = total.toLocaleString();
    document.getElementById("least").innerHTML = least.toLocaleString();
    document.getElementById("most").innerHTML = most.toLocaleString();
    document.getElementById("average").innerHTML = average.toLocaleString(
        "en-US", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }
    );
}

//show the events for a specific location.
//the user selected a city and this fires
function getEvents(element) {

    let city = element.getAttribute("data-city");
    curEvents = JSON.parse(localStorage.getItem("eventsArray")) || events;



    let filteredEvents = curEvents

    //filter the events based on selected city
    if (city != "All") {
        filteredEvents = curEvents.filter(function (event) {
            if (event.city == city) {
                return event;
            }
        })
    }
    document.getElementById("statsHeader").innerHTML = `Stats For ${city} Events`;

    //display the stats for the selected city
    displayStats(filteredEvents);
}

//display all of the events on the page
function displayData() {
    let template = document.getElementById("eventData-template");
    let eventBody = document.getElementById("eventBody");

    //clear the table first
    eventBody.innerHTML = "";

    let curEvents = JSON.parse(localStorage.getItem("eventsArray")) || [];

    //if nothing is there set local storage with the default data
    if (curEvents.length == 0) {
        curEvents = events;
        localStorage.setItem("eventsArray", JSON.stringify(curEvents));
    }

    for (let index = 0; index < curEvents.length; index++) {
        let eventRow = document.importNode(template.content, true);
        let eventCols = eventRow.querySelectorAll("td");

        eventCols[0].textContent = curEvents[index].event;
        eventCols[1].textContent = curEvents[index].city;
        eventCols[2].textContent = curEvents[index].state;
        eventCols[3].textContent = curEvents[index].attendance;
        eventCols[4].textContent = curEvents[index] = new Date(
            curEvents[index].date).toLocaleDateString();

        eventBody.appendChild(eventRow);
        
    }

}