/*
You're building a tool to estimate the cost of various airplane tickets based on the airline, distance and seating class. Your tool must take in this information as a series of inputs (one ticket calculation per line of input) and produce a list of output costs.

Each airline contains its own cost requirements. Ultimately, the airline is only interested in two major components: the space you take on the plane, and the distance you fly. You must generate ticket costs using this gathered data:

Airlines: United, Delta, Southwest, LuigiAir



Keep in mind that, while there are only four airlines listed above, your solution should be able to expand to dozens of individual airlines,  whose ticket cost can be based on arbitrary functions of "Operating Costs", miles, and/or seating class.

You can assume that the input will be provided as a list of strings and that there could be millions of lines of input. Each string will provide the Airline, Distance and Seating Class. Please review the examples below:

Example Input:
-------------------------------------------
United 150.0 Premium
Delta 60.0 Business
Southwest 1000.0 Economy
LuigiAir 50.0 Business
-------------------------------------------

Example Output:
-------------------------------------------
152.50
95.00
1000.00
125.00
-------------------------------------------

Explanation of Output:
-------------------------------------------
152.50      (150.0 * (0.75 + 0.10) + 25)
95.00       (60.0 * (0.50 + 0.25) + 50)
1000.00     (1000.0 * 1.00)
125.00      (100 <= 2 * (50 + 50 * 0.25))
-------------------------------------------
*/


/*
Operating Costs:

 - Economy:  No charge
 - Premium:  $25
 - Business: $50 + $0.25/mile

Per-Airline Prices:

 - Delta charges $0.50/mile
   + OperatingCost

 - United charges $0.75/mile
   + OperatingCost
   + $0.10/mile for Premium seats

 - Southwest charges $1.00/mile

 - LuigiAir charges $100 or 2 * OperatingCost, whichever is higher
*/
const testInput = [
    "United 150.0 Premium",
    "Delta 60.0 Business",
    "Southwest 1000.0 Economy",
    "LuigiAir 50.0 Business"
]

/**
 - Economy:  (cost)=>{return cost}
 - Premium:  (cost)=>{return cost+25}
 - Business: (cost, mile) => {return 50 + 0.25* mile}
    */
const operatingCostOnLevel = ({mile,type})=>{
    switch(type){
        case "Economy":
            return  0;
        case "Premium":
            return  25;
        case "Business":
            return 50 + 0.25 * mile;
    }
    return 0;
}

/**
 - Delta charges $0.50/mile
   + OperatingCost
   
 - United charges $0.75/mile
   + OperatingCost
   + $0.10/mile for Premium seats

 - Southwest charges $1.00/mile

 - LuigiAir charges $100 or 2 * OperatingCost, whichever is higher
*/

const costOnCompany = (props)=>{
    const { company, operatingCost, mile, type } = props;
    switch(company){
        case "Delta":
            return 0.5 * mile + operatingCost;
        case "United": 
            return  0.75 * mile + operatingCost + (type === 'Premium' ? 0.1 * mile : 0);
         case "Southwest": 
            return mile;
        case  "LuigiAir": 
            return  2 * operatingCost <= 100 ? 100 : 2 * operatingCost;
    }
    return 0;
}


// Implement your ticket calculator here.
// name : Premium  (mile, Premium)=>{f(mile)}
const calculator = (testInput) => {
    const input = testInput.map(s => {
        return s.split(" ");
        // company: [0] 1: mile 2: type
        // [United, 150, premium]
    })

    input.map(info => {
        const [company, mileStr, type] = info;
        const mile = Number.parseFloat(mileStr);
        const operatingCost = operatingCostOnLevel({type, mile});
        const costBasedonCompany = costOnCompany({ company, operatingCost, mile, type});
        // const costBasedonCompany = costBasedonCompanyFn(operatingCost, mile, type);
        console.log(costBasedonCompany.toFixed(2));

    })



}

calculator(testInput)
