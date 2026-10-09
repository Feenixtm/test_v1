const mockDates = [
    new Date("2023/01/01"),


    new Date("2023/01/04"),
    new Date("2023/01/05"),

    new Date("2023/01/07"),
    new Date("2023/01/08"),
    new Date("2023/01/09"),
    new Date("2023/01/10"),

    new Date("2023/01/12"),
    new Date("2023/01/13"),
    new Date("2023/01/14"),
    new Date("2023/01/15"),
    new Date("2023/01/16"),
    new Date("2023/01/17")
]

const mockCurrentDate = new Date("2023/01/18");

// console.log(mockDates);

// dates = allPreviouslyDatesOfCompletion
const checkForLongestStreak = (dates, currentDate) => {
    let longestStreak = 0;
    let currentStreak = 0;

    let streakStartDateTemp = null;
    let streakStartDate = null;

    for (let i = 0; i < dates.length; i++) {
        const date = dates[i];
        const nextDate = dates[i + 1];

        if (currentStreak === 0) {
            currentStreak = 1;
            streakStartDateTemp = date;
        }

        if (nextDate && nextDate.getTime() - date.getTime() === 86400000) {
            currentStreak++;

            if (currentStreak > longestStreak) {
                longestStreak = currentStreak;
                streakStartDate = streakStartDateTemp;
            }
        } else {
            currentStreak = 0;
        }
    }

    return { longestStreak, streakStartDate };
}

// console.log(checkForLongestStreak(mockDates, mockCurrentDate));

const checkForCurrentStreak = (dates, currentDate) => {
    let currentStreak = 0;
    let currentStreakStartingDate = null;

    // Check if current date is 1 day after the most recent completion date.
        // If not, return currentStreak = 1;

    const currentDateNormalized = new Date(currentDate);
    currentDateNormalized.setHours(0, 0, 0, 0);

    console.log("Normalized Current Date:", currentDateNormalized);
    console.log("Most Recent Completion Date:", dates[dates.length - 1]);

    // Bug occurs if the most recent completion date is the exact same day as the current date.
    // BUG FIX

    if (dates[dates.length - 1].getTime() === currentDateNormalized.getTime()) {
        currentStreak = 1;
        currentStreakStartingDate = dates[dates.length - 1];
    } else if (currentDateNormalized.getTime() - dates[dates.length - 1].getTime() === 86400000) {
        currentStreak = 2;
        currentStreakStartingDate = dates[dates.length - 1];
    }  else {
        currentStreak = 1;
        currentStreakStartingDate = currentDate;
        return { currentStreak, currentStreakStartingDate, message: "Today marks the start of a new streak." };
    }

    // // ------------------------------------------------------------

    // // Loop backwards starting from the most recent completion date.
    //     // Keep looping backwards until the gap between the dates is not 1 day.
    //         // currentStreak++ every time there's no gap between the dates.
    //     // Return the current streak count.

    for (let i = dates.length - 1; i >= 0; i--) {
        const latestDate  = dates[i];
        const previousDate = dates[i - 1];

        if (previousDate && latestDate.getTime() - previousDate.getTime() === 86400000) {
            currentStreak++;
            currentStreakStartingDate = previousDate;
        } else {
            break;
        }
    }

    return { currentStreak, currentStreakStartingDate, message: "Current streak is still ongoing." };
}

// console.log(checkForCurrentStreak(mockDates, mockCurrentDate));

// ------------------------------------------------------------

// New Streak check only involving the completed dates and nothing else.
const checkForLongestStreakv2 = (dates) => {
    let longestStreak = 0;
    let currentStreak = 0;

    let streakStartDateTemp = null;
    let streakStartDate = null;

    for (let i = 0; i < dates.length; i++) {
        const date = dates[i];
        const nextDate = dates[i + 1];

        if (currentStreak === 0) {
            currentStreak = 1;
            streakStartDateTemp = date;
        }

        if (nextDate && nextDate.getTime() - date.getTime() === 86400000) {
            currentStreak++;

            if (currentStreak > longestStreak) {
                longestStreak = currentStreak;
                streakStartDate = streakStartDateTemp;
            }
        } else {
            currentStreak = 0;
        }
    }

    return { longestStreak, streakStartDate };
}

export { checkForLongestStreak, checkForCurrentStreak, checkForLongestStreakv2 };