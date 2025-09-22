// Test file to verify cat button functionality
console.log('Testing cat button functionality...');

// Check if the openCatSecretFolder function exists
if (typeof openCatSecretFolder === 'function') {
    console.log('✓ openCatSecretFolder function exists');
} else {
    console.log('✗ openCatSecretFolder function does not exist');
}

// Check if the fetchCatImages function exists
if (typeof fetchCatImages === 'function') {
    console.log('✓ fetchCatImages function exists');
} else {
    console.log('✗ fetchCatImages function does not exist');
}

// Test API connectivity
fetch('https://api.thecatapi.com/v1/images/search?limit=1&api_key=live_biux4p6QprIZZAKRqv1Z2aqftYCytUpIDCy78qpOXykgYOW41hb09jVYScbo4bFp')
    .then(response => {
        if (response.ok) {
            console.log('✓ Cat API is accessible');
            return response.json();
        } else {
            console.log('✗ Cat API is not accessible');
        }
    })
    .then(data => {
        if (data && data.length > 0) {
            console.log('✓ Cat API returned data:', data[0].url);
        }
    })
    .catch(error => {
        console.log('✗ Error accessing Cat API:', error);
    });