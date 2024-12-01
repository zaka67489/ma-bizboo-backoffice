export const formatCurrency = (amount,digit=0) => {
    if (typeof amount !== "number") {
        return "Invalid number";
    }
    // return amount.toLocaleString("en-US");
    return amount.toLocaleString("en-US", {
        minimumFractionDigits: digit,
        maximumFractionDigits: digit
    });
}

export const formatCurrencyFloat=(amount) =>{
    const number = parseFloat(amount);
    
    if (isNaN(number)) {
        return "Invalid number";
    }

    return number.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}