document.getElementById("input-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const timeInput = document.getElementById("time").value;
    const outputDiv = document.getElementById("output");

    if (timeInput.isNaN) {
        outputDiv.innerHTML = "<p>Please enter valid numbers!</p>";
        return;
    }

    allBuildingsCombination = [];
    const output = captializm(timeInput);
    const maxEarnings = output[0];
    const amount = output[1];
    outputDiv.innerHTML = `Optimal buildings for Max Earning: <br> Theatre &nbsp ${maxEarnings.T}, Pub &nbsp ${maxEarnings.P}, Commercial Park &nbsp ${maxEarnings.C} <br><br> Max Earnings Amount: ${amount}`;
});


const build_times = {
    T: 5,
    P: 4,
    C: 10,
};

const per_cycle_earnings = {
    T: 1500,
    P: 1000,
    C: 3000,
};

const buildings = Object.keys(build_times);

can_build = (building, remaining_time) => {
    return build_times[building] <= remaining_time;
};

function profit(remaining_time, building) {
    return (
        (remaining_time - build_times[building]) * per_cycle_earnings[building]
    );
}

function max_profit(remaining_time) {
    let profits = new Map();
    for (let building of buildings) {
        if (!can_build(building, remaining_time)) {
            profits[building] = 0;
            continue;
        }
        profits[building] = profit(remaining_time, building);
    }

    return Object.entries(profits).reduce((a, b) => (a[1] > b[1] ? a : b));
}

function captializm(remaining_time) {
    let max_this_round = max_profit(remaining_time); // [building, profit]

    if (max_this_round[1] === 0) {
        return [
            {
                T: 0,
                P: 0,
                C: 0,
            },
            0,
        ]; // Terminating condition for recursion
    }

    let building = max_this_round[0];
    let profit = max_this_round[1];

    let remaining_remaining_time = remaining_time - build_times[building];

    let next_round = captializm(remaining_remaining_time); // [{[buildings]: count_of_appearance}, profit]

    current_round = next_round[0];
    current_round[building] += 1;

    return [current_round, profit + next_round[1]];
}
