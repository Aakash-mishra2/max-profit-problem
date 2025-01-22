function calculateMaxProfit(timeUnit) {
    const buildTime = { T: 5, P: 4, C: 10 };

    const earningsPerUnit = { T: 1500, P: 1000, C: 3000 };

    //memoize earnigns and building combination for each time unit
    let data = new Array(timeUnit + 1).fill(null).map(() => ({
        earnings: 0,
        combinations: {}
    }));

    for (let i = 4; i <= timeUnit; i++) {   //min units to build = 4
        for (let buildType in buildTime) {
            if (i >= buildTime[buildType]) {
                const currentEarning = (timeUnit - i) * earningsPerUnit[buildType]; //profit by current building hereafter

                const temp = i - buildTime[buildType];
                const earnings = data[temp].earnings + currentEarning; //profit by previous buildings till i units

                if (currentEarning && earnings > data[i].earnings) {
                    data[i].earnings = earnings;
                    data[i].combinations = {
                        ...data[temp].combinations,
                        [buildType]: (data[temp].combinations[buildType] || 0) + 1  // increment building units
                    };
                }
            }
        }
    }

    data = data.sort((a, b) => a.earnings - b.earnings).reverse();
    let i = 0;
    const topCombinations = []; // holds max profit ( data[0].earnings ) combinations
    while (i < data.length && data[i].earnings === data[0].earnings) {
        topCombinations.push({
            T: 0,
            P: 0,
            C: 0,
            ...data[i].combinations
        });
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
