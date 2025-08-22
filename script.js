// Global variables
let currentQuizQuestion = 1;
let currentCCQuestion = 1;
let currentCheckQuestion = 1;

// Navigation functions
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    
    // Update breadcrumb
    updateBreadcrumb(pageId);
}

function updateBreadcrumb(pageId) {
    const breadcrumb = document.getElementById('breadcrumb');
    const breadcrumbText = document.getElementById('breadcrumbText');
    
    let text = '';
    
    switch(pageId) {
        case 'welcome':
            breadcrumb.style.display = 'none';
            return;
        case 'office-selection':
            text = 'Select Office';
            break;
        case 'department-selection':
            text = 'White Plains Office > Select Department';
            break;
        case 'position-selection':
            text = 'White Plains Office > Accounts Receivable > Select Position';
            break;
        case 'training-overview':
            text = 'White Plains Office > Accounts Receivable > Cash Application Specialist';
            break;
        case 'credit-card-training':
            text = 'Training > Credit Card Processing';
            break;
        case 'check-training':
            text = 'Training > Check Processing';
            break;
        case 'overview-quiz':
            text = 'Quiz > Position Overview';
            break;
        case 'credit-card-quiz':
            text = 'Quiz > Credit Card Processing';
            break;
        case 'check-quiz':
            text = 'Quiz > Check Processing';
            break;
    }
    
    breadcrumbText.textContent = text;
    breadcrumb.style.display = 'block';
}

// Page navigation functions
function goToOfficeSelection() {
    showPage('office-selection');
}

function goToDepartmentSelection() {
    showPage('department-selection');
}

function goToPositionSelection() {
    showPage('position-selection');
}

function goToTrainingOverview() {
    showPage('training-overview');
}

function goToCreditCardTraining() {
    showPage('credit-card-training');
}

function goToCheckTraining() {
    showPage('check-training');
}

function goToOverviewQuiz() {
    resetOverviewQuiz();
    showPage('overview-quiz');
}

function goToCreditCardQuiz() {
    resetCreditCardQuiz();
    showPage('credit-card-quiz');
}

function goToCheckQuiz() {
    resetCheckQuiz();
    showPage('check-quiz');
}

// Overview Quiz Functions
function resetOverviewQuiz() {
    currentQuizQuestion = 1;
    const questions = document.querySelectorAll('#overview-quiz .question');
    questions.forEach((q, index) => {
        q.classList.toggle('active', index === 0);
    });
    
    // Reset all radio buttons
    const radios = document.querySelectorAll('#overview-quiz input[type="radio"]');
    radios.forEach(radio => radio.checked = false);
    
    // Reset navigation buttons
    document.getElementById('prevBtn').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'inline-block';
    document.getElementById('submitBtn').style.display = 'none';
    document.getElementById('quizResults').style.display = 'none';
}

function nextQuestion() {
    if (currentQuizQuestion < 3) {
        document.querySelector(`#overview-quiz .question[data-question="${currentQuizQuestion}"]`).classList.remove('active');
        currentQuizQuestion++;
        document.querySelector(`#overview-quiz .question[data-question="${currentQuizQuestion}"]`).classList.add('active');
        
        // Update navigation buttons
        document.getElementById('prevBtn').style.display = 'inline-block';
        
        if (currentQuizQuestion === 3) {
            document.getElementById('nextBtn').style.display = 'none';
            document.getElementById('submitBtn').style.display = 'inline-block';
        }
    }
}

function previousQuestion() {
    if (currentQuizQuestion > 1) {
        document.querySelector(`#overview-quiz .question[data-question="${currentQuizQuestion}"]`).classList.remove('active');
        currentQuizQuestion--;
        document.querySelector(`#overview-quiz .question[data-question="${currentQuizQuestion}"]`).classList.add('active');
        
        // Update navigation buttons
        if (currentQuizQuestion === 1) {
            document.getElementById('prevBtn').style.display = 'none';
        }
        
        document.getElementById('nextBtn').style.display = 'inline-block';
        document.getElementById('submitBtn').style.display = 'none';
    }
}

function submitQuiz(quizType) {
    let score = 0;
    const totalQuestions = 3;
    
    // Correct answers: q1=b, q2=b, q3=b
    const answers = {
        q1: document.querySelector('input[name="q1"]:checked')?.value,
        q2: document.querySelector('input[name="q2"]:checked')?.value,
        q3: document.querySelector('input[name="q3"]:checked')?.value
    };
    
    const correctAnswers = { q1: 'b', q2: 'b', q3: 'b' };
    
    Object.keys(answers).forEach(question => {
        if (answers[question] === correctAnswers[question]) {
            score++;
        }
    });
    
    const percentage = Math.round((score / totalQuestions) * 100);
    let message = '';
    
    if (percentage >= 80) {
        message = `Excellent! You scored ${score}/${totalQuestions} (${percentage}%). You're ready to move forward.`;
    } else if (percentage >= 60) {
        message = `Good job! You scored ${score}/${totalQuestions} (${percentage}%). Consider reviewing the material once more.`;
    } else {
        message = `You scored ${score}/${totalQuestions} (${percentage}%). Please review the training material and try again.`;
    }
    
    document.getElementById('scoreText').textContent = message;
    document.querySelector('.question-container').style.display = 'none';
    document.querySelector('.quiz-navigation').style.display = 'none';
    document.getElementById('quizResults').style.display = 'block';
}

// Credit Card Quiz Functions
function resetCreditCardQuiz() {
    currentCCQuestion = 1;
    const questions = document.querySelectorAll('#credit-card-quiz .question');
    questions.forEach((q, index) => {
        q.classList.toggle('active', index === 0);
    });
    
    // Reset all radio buttons
    const radios = document.querySelectorAll('#credit-card-quiz input[type="radio"]');
    radios.forEach(radio => radio.checked = false);
    
    // Reset navigation buttons
    document.getElementById('ccPrevBtn').style.display = 'none';
    document.getElementById('ccNextBtn').style.display = 'inline-block';
    document.getElementById('ccSubmitBtn').style.display = 'none';
    document.getElementById('ccQuizResults').style.display = 'none';
}

function nextCCQuestion() {
    if (currentCCQuestion < 3) {
        document.querySelector(`#credit-card-quiz .question[data-question="${currentCCQuestion}"]`).classList.remove('active');
        currentCCQuestion++;
        document.querySelector(`#credit-card-quiz .question[data-question="${currentCCQuestion}"]`).classList.add('active');
        
        // Update navigation buttons
        document.getElementById('ccPrevBtn').style.display = 'inline-block';
        
        if (currentCCQuestion === 3) {
            document.getElementById('ccNextBtn').style.display = 'none';
            document.getElementById('ccSubmitBtn').style.display = 'inline-block';
        }
    }
}

function previousCCQuestion() {
    if (currentCCQuestion > 1) {
        document.querySelector(`#credit-card-quiz .question[data-question="${currentCCQuestion}"]`).classList.remove('active');
        currentCCQuestion--;
        document.querySelector(`#credit-card-quiz .question[data-question="${currentCCQuestion}"]`).classList.add('active');
        
        // Update navigation buttons
        if (currentCCQuestion === 1) {
            document.getElementById('ccPrevBtn').style.display = 'none';
        }
        
        document.getElementById('ccNextBtn').style.display = 'inline-block';
        document.getElementById('ccSubmitBtn').style.display = 'none';
    }
}

function submitCCQuiz() {
    let score = 0;
    const totalQuestions = 3;
    
    // Correct answers: cc1=a, cc2=b, cc3=b
    const answers = {
        cc1: document.querySelector('input[name="cc1"]:checked')?.value,
        cc2: document.querySelector('input[name="cc2"]:checked')?.value,
        cc3: document.querySelector('input[name="cc3"]:checked')?.value
    };
    
    const correctAnswers = { cc1: 'a', cc2: 'b', cc3: 'b' };
    
    Object.keys(answers).forEach(question => {
        if (answers[question] === correctAnswers[question]) {
            score++;
        }
    });
    
    const percentage = Math.round((score / totalQuestions) * 100);
    let message = '';
    
    if (percentage >= 80) {
        message = `Excellent! You scored ${score}/${totalQuestions} (${percentage}%). You've mastered credit card processing.`;
    } else if (percentage >= 60) {
        message = `Good job! You scored ${score}/${totalQuestions} (${percentage}%). Consider reviewing the credit card steps once more.`;
    } else {
        message = `You scored ${score}/${totalQuestions} (${percentage}%). Please review the credit card training material and try again.`;
    }
    
    document.getElementById('ccScoreText').textContent = message;
    document.querySelector('#credit-card-quiz .question-container').style.display = 'none';
    document.querySelector('#credit-card-quiz .quiz-navigation').style.display = 'none';
    document.getElementById('ccQuizResults').style.display = 'block';
}

// Check Quiz Functions
function resetCheckQuiz() {
    currentCheckQuestion = 1;
    const questions = document.querySelectorAll('#check-quiz .question');
    questions.forEach((q, index) => {
        q.classList.toggle('active', index === 0);
    });
    
    // Reset all radio buttons
    const radios = document.querySelectorAll('#check-quiz input[type="radio"]');
    radios.forEach(radio => radio.checked = false);
    
    // Reset navigation buttons
    document.getElementById('checkPrevBtn').style.display = 'none';
    document.getElementById('checkNextBtn').style.display = 'inline-block';
    document.getElementById('checkSubmitBtn').style.display = 'none';
    document.getElementById('checkQuizResults').style.display = 'none';
}

function nextCheckQuestion() {
    if (currentCheckQuestion < 3) {
        document.querySelector(`#check-quiz .question[data-question="${currentCheckQuestion}"]`).classList.remove('active');
        currentCheckQuestion++;
        document.querySelector(`#check-quiz .question[data-question="${currentCheckQuestion}"]`).classList.add('active');
        
        // Update navigation buttons
        document.getElementById('checkPrevBtn').style.display = 'inline-block';
        
        if (currentCheckQuestion === 3) {
            document.getElementById('checkNextBtn').style.display = 'none';
            document.getElementById('checkSubmitBtn').style.display = 'inline-block';
        }
    }
}

function previousCheckQuestion() {
    if (currentCheckQuestion > 1) {
        document.querySelector(`#check-quiz .question[data-question="${currentCheckQuestion}"]`).classList.remove('active');
        currentCheckQuestion--;
        document.querySelector(`#check-quiz .question[data-question="${currentCheckQuestion}"]`).classList.add('active');
        
        // Update navigation buttons
        if (currentCheckQuestion === 1) {
            document.getElementById('checkPrevBtn').style.display = 'none';
        }
        
        document.getElementById('checkNextBtn').style.display = 'inline-block';
        document.getElementById('checkSubmitBtn').style.display = 'none';
    }
}

function submitCheckQuiz() {
    let score = 0;
    const totalQuestions = 3;
    
    // Correct answers: ch1=b, ch2=b, ch3=b
    const answers = {
        ch1: document.querySelector('input[name="ch1"]:checked')?.value,
        ch2: document.querySelector('input[name="ch2"]:checked')?.value,
        ch3: document.querySelector('input[name="ch3"]:checked')?.value
    };
    
    const correctAnswers = { ch1: 'b', ch2: 'b', ch3: 'b' };
    
    Object.keys(answers).forEach(question => {
        if (answers[question] === correctAnswers[question]) {
            score++;
        }
    });
    
    const percentage = Math.round((score / totalQuestions) * 100);
    let message = '';
    
    if (percentage >= 80) {
        message = `Excellent! You scored ${score}/${totalQuestions} (${percentage}%). You've mastered check processing.`;
    } else if (percentage >= 60) {
        message = `Good job! You scored ${score}/${totalQuestions} (${percentage}%). Consider reviewing the check processing steps once more.`;
    } else {
        message = `You scored ${score}/${totalQuestions} (${percentage}%). Please review the check training material and try again.`;
    }
    
    document.getElementById('checkScoreText').textContent = message;
    document.querySelector('#check-quiz .question-container').style.display = 'none';
    document.querySelector('#check-quiz .quiz-navigation').style.display = 'none';
    document.getElementById('checkQuizResults').style.display = 'block';
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Show welcome page by default
    showPage('welcome');
    
    // Add smooth scrolling to all quiz navigation
    const quizButtons = document.querySelectorAll('.quiz-button');
    quizButtons.forEach(button => {
        button.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
    
    // Add click handlers for disabled cards to show coming soon message
    const disabledCards = document.querySelectorAll('.selection-card.disabled');
    disabledCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const comingSoonText = card.querySelector('.coming-soon');
            if (comingSoonText) {
                comingSoonText.style.animation = 'pulse 0.5s';
                setTimeout(() => {
                    comingSoonText.style.animation = '';
                }, 500);
            }
        });
    });
});

// Add pulse animation for coming soon text
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);