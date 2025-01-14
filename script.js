document.getElementById("input-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const timeInput = document.getElementById("time").value;
    const outputDiv = document.getElementById("output");

    if (timeInput.isNaN) {
        outputDiv.innerHTML = "<p>Please enter valid numbers!</p>";
        return;
    }

    const output = maximizeEarnings(timeInput);
    const maxEarnings = output.result;
    const amount = output.totalEarnings;

    outputDiv.innerHTML = `Optimal buildings for Max Earning: <br> Theatre &nbsp ${maxEarnings.T}, Pub &nbsp ${maxEarnings.P}, Commercial Park &nbsp ${maxEarnings.C} <br><br> Max Earnings Amount: ${amount}`;
});


function maximizeEarnings(n) {
    // Property details: [time, earnings, label]
    const properties = [
        [5, 1500, "T"], // Theatre
        [4, 1000, "P"], // Pub
        [10, 3000, "C"] // Commercial Park
    ];

    // Sort by earning per unit time (descending), then by time (ascending)
    properties.sort((a, b) => {
        const earningPerTimeA = a[1] / a[0];
        const earningPerTimeB = b[1] / b[0];
        if (earningPerTimeA === earningPerTimeB) {
            return a[0] - b[0]; // Sort by time (ascending) if equal earning per time
        }
        return earningPerTimeB - earningPerTimeA; // Sort by earning per time (descending)
    });

    // Initialize counters for each property
    const result = { T: 0, P: 0, C: 0 };
    let totalEarnings = 0;

    // Fill the time with the best mix
    while (n > 0) {
        let built = false;
        for (const [time, earnings, label] of properties) {
            if (n >= time) { // If we can build this property
                n -= time;
                result[label]++;
                totalEarnings += earnings * n;
                built = true;
                break;
            }
        }
        if (!built) break; // No more time left to build anything
    }
    return { result, totalEarnings };
}

