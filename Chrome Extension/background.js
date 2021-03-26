/*
 * POF (Plenty of Fish) Personality Spear Fisher - the only script where you can find a partner based on interests.
 * 17/03/21
 * Written by The_Blode
 * Version 1.0
 */

/* ================================
 *Set up local storage variables
 * ================================ */
chrome.storage.local.set({fishing: 0});
chrome.storage.local.set({pages: 0});
var profile_index = 0;
var profile_array = [];
var interests = [];
var pages = 0;
var profile_array_temp = [];

// Get passed interests
chrome.storage.local.get("interest_one", function(data) {
    interest_one = data.interest_one;

    // Assign to the script
    assignChromeStorageLocally("2", interest_one);
});

chrome.storage.local.get("interest_two", function(data) {
    interest_two = data.interest_three;

    // Assign to the script
    assignChromeStorageLocally("2", interest_two);
});

chrome.storage.local.get("interest_three", function(data) {
    interest_three = data.interest_three;

    // Assign to the script
    assignChromeStorageLocally("2", interest_three);
});

chrome.storage.local.get("interest_four", function(data) {
    interest_four = data.interest_four;

    // Assign to the script
    assignChromeStorageLocally("2", interest_four);
});

chrome.storage.local.get("interest_five", function(data) {
    interest_five = data.interest_five;

    // Assign to the script
    assignChromeStorageLocally("2", interest_five);
});

chrome.storage.local.get("interest_six", function(data) {
    interest_six = data.interest_six;

    // Assign to the script
    assignChromeStorageLocally("2", interest_six);
});

chrome.storage.local.get("interest_seven", function(data) {
    interest_seven = data.interest_seven;

    // Assign to the script
    assignChromeStorageLocally("2", interest_seven);
});

chrome.storage.local.get("interest_eight", function(data) {
    interest_eight = data.interest_eight;

    // Assign to the script
    assignChromeStorageLocally("2", interest_eight);
});

chrome.storage.local.get("interest_nine", function(data) {
    interest_nine = data.interest_nine;

    // Assign to the script
    assignChromeStorageLocally("2", interest_nine);
});

chrome.storage.local.get("interest_ten", function(data) {
    interest_ten = data.interest_ten;

    // Assign to the script
    assignChromeStorageLocally("2", interest_ten);
});

// Grab profile index
chrome.storage.local.get("profile_index", function(data) {
    profile_index = parseInt(data.profile_index);
});

// Grab profiles array
chrome.storage.local.get("profiles", function(data) {
    var profile_array = data.profiles;

    // Assign to the script
    assignChromeStorageLocally("1", profile_array);
});

// Loop through profiles
chrome.storage.local.get("profile_count", function(data) {
    var profile_count = parseInt(data.profile_count);
    if (profile_count > 0) {
        setTimeout(function() {
            // Search profile
            searchProfile();
        }, 3000);
    }
});

/* ================================
 * Poll the Extension popup every second to check if the user wants to search for a partner
 * ================================ */
setInterval(function() {
    // Get fishing variable
    chrome.storage.local.get("fishing", function(data) {
        // If fishing is true
        if (data.fishing == 1) {
            // Start searching (fishing!)
            goFishing();
        }
    });
}, 1000);

/* ================================
 * Function name: goFishing
 * Function description: this function will start searching for matches based on the given keywords.
 * ================================ */
function goFishing() {
    // Reset search flag
    chrome.storage.local.set({ fishing: 0 });

    // Get passed interests
    chrome.storage.local.get("pages", function(data) {
        pages = data.pages;

        // Assign to the script
        assignChromeStorageLocally("3", pages);
    });

    // Inform user the search is about to start
    window.alert("Thanks for using POF Personality Search! We're just going to gather the profiles, so please wait until that is done. You'll see another popup like this when it's ready to move on to the next stage.");

    // Intialise variables
    var counter = 1;
    const interval = setInterval(function() {
        // Get profile HTML from page
        var profiles = $("#profilelist-container").html();

        // Define regular expression to parse profile links
        var regular_expression = /viewprofile\?profileId=.+?(")/g;

        // Initialise matches variable
        var matches;

        // Parse results and push to profile array
        while ((matches = regular_expression.exec(profiles)) != null) {
            // Store match locally
            var new_profile_link = matches[0];

            // Format match
            new_profile_link = new_profile_link.replace("\"", "");
            new_profile_link = "https://m.pof.com/" + new_profile_link;

            // Push profile link to profiles array
            profile_array_temp.push(new_profile_link); 
        }

        // Get next set of profiles
        $(".css-hesic0").click();

        // Increment counter
        counter++;
        if (counter > pages) {
            // Parse profiles
            parseProfiles(profile_array_temp);
        }
    }, 10000);

    function parseProfiles(profile_array_temp) {
        // Clear interval
        clearInterval(interval);

        var count = 0;
        for(var i = 0; i < profile_array_temp.length; i++) {
            count++;
        }

        // Save profile count
        chrome.storage.local.set({
            profile_count: count
        });

        // Save profile array
        chrome.storage.local.set({
            profiles: profile_array_temp
        });

        // Save profile current index
        chrome.storage.local.set({
            profile_index: 0
        });

        // Inform user that profiles have been stored
        window.alert("That's finished! Now I will check the profiles for matches for you!");

        // Go to next page
        window.location.href = profile_array_temp[0];
    }
}

/* ================================
 * Function name: searchProfile
 * Function description: this function will search a profile for given keywords.
 * ================================ */
function searchProfile() {
    setTimeout(function() {
        // Set match flag
        var match_found = false;

        // Grab HTML
        var profile_text = $("#profile-about-copy").html();
        var profile_interests = $(".css-yv11yr").html();
        var profile_profession = $("#attributelist-item-occupation").html();

        if (profile_text != undefined) {
            // Process data
            console.log("User profile: " + profile_text);

            // Check for interests in their profile
            for (var i = 0; i < interests.length; i++) {
                var keyword = interests[i];

                if (profile_text.includes(keyword)) {
                    // Toggle match flag
                    match_found = true;

                    // Keep searching or stop?
                    if (confirm("Would you like to continue searching?") {
                        // Inform the user and stop the search!
                        stopSearching(keyword);
                    }
                }

                if (profile_interests != undefined) {
                    if (profile_interests.includes(keyword)) {
                        // Toggle match flag
                        match_found = true;

                        // Keep searching or stop?
                        var confirm = confirm("Would you like to continue searching?");

                        if (confirm == true) {
                            // Inform the user and stop the search!
                            stopSearching(keyword);
                        }
                    }
                }

                if (profile_profession != undefined) {
                    if (profile_profession.includes(keyword)) {
                        // Toggle match flag
                        match_found = true;

                        // Keep searching or stop?
                        var confirm = confirm("Would you like to continue searching?");

                        if (confirm == true) {
                            // Inform the user and stop the search!
                            stopSearching(keyword);
                        }
                    }
                }
            }
        }

        // Increment index
        profile_index++;

        // Store new index
        chrome.storage.local.set({profile_index: profile_index});

        if (match_found == false) {
            // Go to next profile
            window.location.href = profile_array[profile_index];
        }
    }, 1000);
}

/* =====================
 * Function name: assignChromeStorageLocally
 * Function description: this function will assign Chrome storage variables locally
 * Date: 22/02/21
 * =====================
 */
function assignChromeStorageLocally(variable, value) {
    if (variable == "1") {
        profile_array = value;
    }

    if (variable == "2") {
        if (value != "") {
            interests.push(value);
        }
    }

    if (variable == "3") {
        pages = value;
    }
}

/* =====================
 * Function name: assignChromeStorageLocally
 * Function description: this function will assign Chrome storage variables locally
 * Date: 22/02/21
 * =====================
 */
function stopSearching(keyword) {
    // Reset locally stored variables
    chrome.storage.local.set({fishing: 0});
    chrome.storage.local.set({profile_count: 0});
    chrome.storage.local.set({profiles: ""});
    chrome.storage.local.set({profile_index: 0});
    chrome.storage.local.set({interest_one: ""});
    chrome.storage.local.set({interest_two: ""});
    chrome.storage.local.set({interest_three: ""});
    chrome.storage.local.set({interest_four: ""});
    chrome.storage.local.set({interest_five: ""});

    alert("A match has been found with the following keyword: " + keyword + "\n\nTime to make your move!");
}