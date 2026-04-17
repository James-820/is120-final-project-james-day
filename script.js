// Get document elements for reference:
// ________________________________________________________________________________
// ________________________________________________________________________________

let card_container = document.querySelector("#card-container");
let input_container = document.querySelector("#add-input");
let add_btn = document.querySelector("#add-btn");
let lift_list = localStorage.lift_list;

// Function declarations:
// ________________________________________________________________________________
// ________________________________________________________________________________

// Make an empty placeholder:
// ________________________________________

function makeEmpty() {
  let placeholder = document.createElement("div");
  let h3 = document.createElement("h3");
  h3.textContent = "No Lifts To Track";
  let p = document.createElement("p");
  p.textContent = 'To start, click the "Add Lift" button above.';
  placeholder.appendChild(h3);
  placeholder.appendChild(p);
  return placeholder;
}

// Make a lift card:
// ________________________________________

function makeCard() {}

// Display all lifts from localstorage:
// ________________________________________

function displayAll() {
  card_container.innerHTML = "";
  if (!lift_list) {
    // Early return for empty list:
    card_container.appendChild(makeEmpty());
    return;
  }
}

// Add new lift object to localstorage array:
// ________________________________________

function addLift() {}

// On load:
// ________________________________________________________________________________
// ________________________________________________________________________________

// Display lift cards:
displayAll();
