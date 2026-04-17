// Get document elements for reference:
// ________________________________________________________________________________
// ________________________________________________________________________________

let card_container = document.querySelector("#card-container");
let input_container = document.querySelector("#input-container");
let add_btn = document.querySelector("#add-btn");
let cancel_btn = document.querySelector("#cancel-btn");

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
  placeholder.classList += "flex-column-center";
  placeholder.style.padding = "1rem";
  return placeholder;
}

// Make/clear input fields:
// ________________________________________

function makeInputs() {
  input_container.innerHTML = "";
  cancel_btn.style.display = "inline-block";
  // Add inputs and labels:
  // Name:
  let name_container = document.createElement("div");
  let name_input = document.createElement("input");
  name_input.type = "text";
  name_input.placeholder = 'Ex: "Bench Press"';
  name_input.id = "name-input";
  let name_label = document.createElement("label");
  name_label.for = "name-input";
  name_label.textContent = "Name of lift:";
  name_container.appendChild(name_label);
  name_container.appendChild(name_input);
  // Weight:
  let weight_container = document.createElement("div");
  let weight_input = document.createElement("input");
  weight_input.type = "number";
  weight_input.placeholder = "Ex: 125";
  weight_input.id = "weight-input";
  let weight_label = document.createElement("label");
  weight_label.for = "weight-input";
  weight_label.textContent = "Weight (lbs):";
  weight_container.appendChild(weight_label);
  weight_container.appendChild(weight_input);
  // Reps/Sets:
  // let reps_input = document.createElement("");
  // let reps_label = document.createElement("");
  // Append to the inputs container:
  input_container.appendChild(name_container);
  input_container.appendChild(weight_container);
}

function clearInputs() {
  input_container.innerHTML = "";
  cancel_btn.style.display = "none";
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

function addLift() {
  // Show the input fields:
  makeInputs();
}

// On load:
// ________________________________________________________________________________
// ________________________________________________________________________________

// Display lift cards:
displayAll();
makeInputs();
console.log(input_container);
