function isValid(url) {
    try {
        new URL(url);
        return true;
    }catch (error){
        return false;
    }
}

let shortUrlCounter = 1;
function generateShortCode() {
    return shortUrlCounter++;
}

module.exports = { isValid, generateShortCode };
