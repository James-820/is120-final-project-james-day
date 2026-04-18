// Get document elements for reference:
// ________________________________________________________________________________
// ________________________________________________________________________________

let card_container = document.querySelector("#card-container");
let input_container = document.querySelector("#input-container");
let add_btn = document.querySelector("#add-btn");
let cancel_btn = document.querySelector("#cancel-btn");

if (localStorage.getItem("lift-list") === null) {
  localStorage.setItem("lift-list", []);
}

let lift_list = [];
// Add each to the list:
for (const obj of JSON.parse(localStorage.getItem("lift-list"))) {
  lift_list.push(obj);
}
let currently_adding = false;
let name_id = "name-input";
let weight_id = "weight-input";
let reps_id = "reps-input";

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
  add_btn.textContent = "Save Changes";
  // Add inputs and labels:
  // Name:
  let name_container = document.createElement("div");
  let name_input = document.createElement("input");
  name_input.type = "text";
  name_input.placeholder = 'Ex: "Bench Press"';
  name_input.id = name_id;
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
  weight_input.id = weight_id;
  let weight_label = document.createElement("label");
  weight_label.for = "weight-input";
  weight_label.textContent = "Weight (lbs):";
  weight_container.appendChild(weight_label);
  weight_container.appendChild(weight_input);
  // Reps/Sets:
  let reps_container = document.createElement("div");
  let reps_input = document.createElement("input");
  reps_input.id = "reps-input";
  reps_input.placeholder = "Ex: 8, 7, 7";
  let reps_label = document.createElement("label");
  reps_label.for = reps_id;
  reps_label.textContent = "Reps per Set:";
  reps_container.appendChild(reps_label);
  reps_container.appendChild(reps_input);
  // Append to the inputs container:
  input_container.appendChild(name_container);
  input_container.appendChild(weight_container);
  input_container.appendChild(reps_container);
  input_container.style.padding = "1rem";
}

function clearInputs() {
  input_container.innerHTML = "";
  input_container.style.padding = "0";
  cancel_btn.style.display = "none";
  add_btn.textContent = "Add Lift";
  currently_adding = false;
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
  console.log(lift_list);
}

// Add new lift object to localstorage array:
// ________________________________________

function addLift() {
  // Check if currently adding lift:
  if (currently_adding) {
    // Add a lift with the inputs:
    // Make the lift object:
    // Append to the list:
    lift_list.push;
    // Remove input fields:
    clearInputs();
    // Refresh the list display for user:
    displayAll();
  } else {
    // Set adding variable to true:
    currently_adding = true;
    // Show inputs:
    makeInputs();
  }
}

// On load:
// ________________________________________________________________________________
// ________________________________________________________________________________

// Display lift cards:
displayAll();
add_btn.addEventListener("click", addLift);
cancel_btn.addEventListener("click", clearInputs);
// cancel_btn.addEventListener("click", () => {
//   currently_adding = false;
//   addLift();
// });
// makeInputs();
// console.log(input_container);
