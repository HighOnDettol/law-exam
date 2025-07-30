// Global state for visited sections
let visitedSections = new Set();
const totalUnits = 4; // Number of units in your study guide

// Function to show/hide tab content within a unit
function showTab(tabId, button) {
    // Hide all tab contents within the current unit
    const unitContent = button.closest('.content-section');
    const tabContents = unitContent.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.add('hidden');
    });
    
    // Show the selected tab content
    document.getElementById(tabId).classList.remove('hidden');
    
    // Update active tab button styling
    const tabButtons = unitContent.querySelectorAll('.tab-button');
    tabButtons.forEach(btn => {
        btn.classList.remove('active-tab');
    });
    button.classList.add('active-tab');
    
    // Add the current tab to visited sections for progress tracking
    visitedSections.add(tabId);
    
    updateProgress();
}

// Function to show a specific unit's content
function showUnit(unitNumber) {
    // Hide all content sections first
    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Display the selected unit's content
    const selectedUnitContent = document.getElementById(`unit${unitNumber}-content`);
    selectedUnitContent.style.display = 'block';
    
    // Automatically click the first tab button of the newly shown unit
    const firstTabButton = selectedUnitContent.querySelector('.tab-button');
    if (firstTabButton) {
        firstTabButton.click(); // This will also call showTab and updateProgress
    } else {
        // If there are no tabs in a unit (unlikely for your current structure)
        updateProgress();
    }
}

// Function to show the welcome screen
function showWelcome() {
    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById('welcome-content').style.display = 'block';
    updateProgress();
}

// Function to show the quiz section
function showQuiz() {
    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById('quiz-content').style.display = 'block';
    // Reset quiz state to intro when navigating to quiz section
    document.getElementById('quiz-results').classList.add('hidden');
    document.getElementById('quiz-questions').classList.add('hidden');
    document.getElementById('quiz-intro').classList.remove('hidden');
    // Also reset score display if needed
    document.getElementById('score').textContent = 0;
    updateProgress();
}

// Function to update the overall progress bar
function updateProgress() {
    let viewedSectionsCount = 0;
    const allTabContents = document.querySelectorAll('.tab-content');
    
    // Count how many unique tabs have been visited
    allTabContents.forEach(tab => {
        if (visitedSections.has(tab.id)) {
            viewedSectionsCount++;
        }
    });

    const totalViewableTabs = allTabContents.length;
    let progressPercentage = 0;

    if (totalViewableTabs > 0) {
        progressPercentage = (viewedSectionsCount / totalViewableTabs) * 100;
    }
    
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    
    progressBar.style.width = `${progressPercentage}%`;
    progressText.textContent = `${Math.round(progressPercentage)}% of content reviewed`;
}

// Initialize the study guide on page load
document.addEventListener('DOMContentLoaded', () => {
    showWelcome();
    updateProgress(); // Initial progress calculation
});
