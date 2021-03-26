// Add event handler for on click event to start searching
document.getElementById("search").onclick = function() {
    /* =======================
     * Search logic
     * ======================= */
    // Fetch interest #1
    var interest_number_one = document.getElementById("interest_one").value;

    // Store the interest #1 in memory
    chrome.storage.local.set({"interest_one": interest_number_one});

    // Fetch interest #2
    var interest_number_two = document.getElementById("interest_two").value;

    // Store the interest #2 in memory
    chrome.storage.local.set({"interest_two": interest_number_two});

    // Fetch interest #3
    var interest_number_three = document.getElementById("interest_three").value;

    // Store the interest #3 in memory
    chrome.storage.local.set({"interest_three": interest_number_three});

    // Fetch interest #4
    var interest_number_four = document.getElementById("interest_four").value;

    // Store the interest #4 in memory
    chrome.storage.local.set({"interest_four": interest_number_four});

    // Fetch interest #5
    var interest_number_five = document.getElementById("interest_five").value;

    // Store the interest #5 in memory
    chrome.storage.local.set({"interest_five": interest_number_five});

    // Fetch interest #6
    var interest_number_six = document.getElementById("interest_six").value;

    // Store the interest #6 in memory
    chrome.storage.local.set({"interest_six": interest_number_six});

    // Fetch interest #7
    var interest_number_seven = document.getElementById("interest_seven").value;

    // Store the interest #7 in memory
    chrome.storage.local.set({"interest_seven": interest_number_seven});

    // Fetch interest #8
    var interest_number_eight = document.getElementById("interest_eight").value;

    // Store the interest #8 in memory
    chrome.storage.local.set({"interest_eight": interest_number_eight});

    // Fetch interest #9
    var interest_number_nine = document.getElementById("interest_nine").value;

    // Store the interest #9 in memory
    chrome.storage.local.set({"interest_nine": interest_number_nine});

    // Fetch interest #10
    var interest_number_ten = document.getElementById("interest_ten").value;

    // Store the interest #10 in memory
    chrome.storage.local.set({"interest_ten": interest_number_ten});

    // Clear profile count
    chrome.storage.local.set({"profile_count": 0});

    // Clear profiles
    chrome.storage.local.set({profiles: []});

    // Fetch progression type
    var element = document.getElementById("pages");
    var selected_pages = element.options[element.selectedIndex].value;

    // Store the game type in memory
    chrome.storage.local.set({"pages": selected_pages});

    // Store start searching variable
    chrome.storage.local.set({"fishing": 1});
}

// Add event handler for on click event to reset search
document.getElementById("reset").onclick = function() {
    // Reset locally stored variables
    chrome.storage.local.set({fishing: 0});
    chrome.storage.local.set({profile_count: 0});
    chrome.storage.local.set({profiles: ""});
    chrome.storage.local.set({profile_index: 0});
}