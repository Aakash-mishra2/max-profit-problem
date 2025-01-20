function maxProfit() {

    function maximumProfit(n) {
        let earningsPerUnit = [1500, 1000, 3000];
        let units = [5, 4, 10];

        let minUnit = Math.min(...units)
        let totalEarningArray = [];

        let tempResult = units.map((value, index) => {
            let input = n;
            let earnings = 0;
            let tempArray = [];
            while (input >= minUnit) {
                input -= value;
                if (input >= 0) {
                    earnings += input * earningsPerUnit[index];
                    tempArray.push(earnings);
                }
            }
            totalEarningArray.push(earnings);
            return tempArray;
        });

        let maxEarning = Math.max(...totalEarningArray);

        let totalOutputArray = totalEarningArray.map((value, index) =>
            maxEarning === value ? tempResult[index].length : 0);

        let output = totalOutputArray.map((value, index) =>
            value !== 0 ?
                `${index + 1}. T: ${index === 0 ? value : 0} P: ${index === 1 ? value : 0} C: ${index === 2 ? value : 0} <br />`
                : ""
        ).join("");

        document.getElementById("timeunit").innerHTML = `Time Unit: ${n}`;
        document.getElementById("earnings").innerHTML = `Earnings: $${maxEarning}`;
        document.getElementById("solution").innerHTML = `Solutions: <br />${output}`;
    }

    let unitsInput = Number(document.getElementById("unitInput").value);
    maximumProfit(unitsInput);
}
