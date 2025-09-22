// Test file for horror styles in About folder

// Function to test if horror styles are applied
function testHorrorStyles() {
    console.log("Testing horror styles...");
    
    // Check if horror container exists
    const horrorContainer = document.querySelector('.horror-container');
    if (horrorContainer) {
        console.log("✓ Horror container found");
    } else {
        console.log("✗ Horror container not found");
    }
    
    // Check if horror title exists
    const horrorTitle = document.querySelector('.horror-title');
    if (horrorTitle) {
        console.log("✓ Horror title found");
    } else {
        console.log("✗ Horror title not found");
    }
    
    // Check if blood drips exist
    const bloodDrips = document.querySelectorAll('.blood-drip');
    if (bloodDrips.length > 0) {
        console.log(`✓ Blood drips found (${bloodDrips.length} elements)`);
    } else {
        console.log("✗ Blood drips not found");
    }
    
    // Check if eyes exist
    const eyes = document.querySelectorAll('.eye');
    if (eyes.length > 0) {
        console.log(`✓ Eyes found (${eyes.length} elements)`);
    } else {
        console.log("✗ Eyes not found");
    }
    
    // Check if horror skills exist
    const horrorSkills = document.querySelectorAll('.horror-skill-item');
    if (horrorSkills.length > 0) {
        console.log(`✓ Horror skills found (${horrorSkills.length} elements)`);
    } else {
        console.log("✗ Horror skills not found");
    }
    
    console.log("Horror styles test completed.");
}

// Run the test when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for everything to load
    setTimeout(testHorrorStyles, 2000);
});