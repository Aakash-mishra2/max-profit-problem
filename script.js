function calculateMaxProfit(timeUnit) {
    const buildTime = { T: 10, P: 4, C: 10 };

    const earningsPerUnit = { T: 3000, P: 1000, C: 3000 };

    //memoize earnigns and building combination for each time unit
    let data = new Array(timeUnit + 1).fill(null).map(() => ({
        earnings: 0,
        combinations: []
    }));

    for (let i = 4; i <= timeUnit; i++) {   //minimum time units to build any property = 4
        for (let buildType in buildTime) {

            if (i >= buildTime[buildType]) {
                const currentEarning = (timeUnit - i) * earningsPerUnit[buildType]; //profit by current building hereafter

                const temp = i - buildTime[buildType]; //0
                const earnings = data[temp].earnings + currentEarning; //profit by previous buildings till i units


                if (currentEarning && earnings >= data[i].earnings) { //add equal earnings edge case
                    if (earnings > data[i].earnings) { // New maximum earnings, replace combinations
                        data[i].earnings = earnings;
                        data[i].combinations = data[temp].combinations.map(comb => ({
                            ...comb,
                            [buildType]: (comb[buildType] || 0) + 1
                        }));

                        // Ensure at least one combination exists for this earning
                        if (data[temp].combinations.length === 0) {
                            data[i].combinations = [{ [buildType]: 1 }];
                        }
                    }

                    else if (earnings === data[i].earnings) {  // Add new combinations for equal earnings
                        const newCombinations = data[temp].combinations.map((comb) => ({
                            ...comb,
                            [buildType]: (comb[buildType] || 0) + 1
                        }));
                        if (newCombinations.length === 0) {
                            newCombinations.push({ [buildType]: 1 });
                        }
                        data[i].combinations.push(...newCombinations);
                    }
                }
            }
        }

        //If no combinations exist, initialize with an empty one
        if (data[i].combinations.length === 0) data[i].combinations.push({});

        // Deduplicate combinations
        data[i].combinations = data[i].combinations.filter(
            (comb, index, self) =>
                index === self.findIndex(other => JSON.stringify(other) === JSON.stringify(comb))   //stringify to compare objects in js
        );

    }


    data = data.sort((a, b) => b.earnings - a.earnings);

    let i = 0;
    let topCombinations = []  // holds all max profit ( data[0].earnings ) combinations
    while (i < data.length && data[i].earnings === data[0].earnings) {
        let tempCombinations = data[i].combinations.map(combination => ({
            T: combination.T || 0,
            P: combination.P || 0,
            C: combination.C || 0
        }))
        topCombinations.push(...tempCombinations);
        i += 1;
    }

    return {
        earnings: data[0].earnings,
        combinations: topCombinations
    };
}

function displayResults() {
    const inputUnits = document.getElementById('unitsInput').value;
    const result = calculateMaxProfit(parseInt(inputUnits, 10));
    const outputContainer = document.getElementById('outputContainer');
    outputContainer.innerHTML = '';

    // Display earnings
    outputContainer.innerHTML += `<h5>Earnings : $ ${result.earnings}</h5>`

    // Display combinations
    if (parseInt(inputUnits, 10) <= 4) {
        outputContainer.innerHTML += ""
    } else {
        result.combinations.forEach((combination, index) => {
            outputContainer.innerHTML += `<h6>Solution ${index + 1}: T: ${combination.T} P: ${combination.P} C: ${combination.C}</h6>`
        });
    }
}
