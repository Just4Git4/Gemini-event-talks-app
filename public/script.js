
const talks = [
    {
        "title": "The Future of JavaScript",
        "speakers": ["John Doe"],
        "category": ["JavaScript", "Web Development"],
        "duration": "1 hour",
        "description": "A deep dive into the next features of JavaScript and how they will shape the future of web development."
    },
    {
        "title": "Building Scalable APIs with Node.js",
        "speakers": ["Jane Smith"],
        "category": ["Node.js", "APIs", "Backend"],
        "duration": "1 hour",
        "description": "Learn how to design and build APIs that can handle millions of requests."
    },
    {
        "title": "CSS Grid and Flexbox: A Love Story",
        "speakers": ["Peter Jones", "Mary Williams"],
        "category": ["CSS", "Frontend"],
        "duration": "1 hour",
        "description": "A practical guide to mastering modern CSS layouts with Grid and Flexbox."
    },
    {
        "title": "Introduction to Machine Learning with Python",
        "speakers": ["David Miller"],
        "category": ["Machine Learning", "Python"],
        "duration": "1 hour",
        "description": "Get started with machine learning using Python and popular libraries like Scikit-learn."
    },
    {
        "title": "The Power of Serverless",
        "speakers": ["Susan Garcia"],
        "category": ["Serverless", "Cloud"],
        "duration": "1 hour",
        "description": "Discover the benefits of serverless architecture and how to build applications with it."
    },
    {
        "title": "Cybersecurity in the Modern Age",
        "speakers": ["Michael Brown"],
        "category": ["Cybersecurity", "Security"],
        "duration": "1 hour",
        "description": "An overview of the latest cybersecurity threats and how to protect your applications."
    }
];

const scheduleContainer = document.getElementById('schedule-container');
const searchInput = document.getElementById('category-search');

function renderSchedule(filteredTalks) {
    scheduleContainer.innerHTML = '';
    let startTime = new Date();
    startTime.setHours(10, 0, 0, 0);

    filteredTalks.forEach((talk, index) => {
        const talkElement = document.createElement('div');
        talkElement.classList.add('talk');

        const time = new Date(startTime);
        const endTime = new Date(time.getTime() + 60 * 60 * 1000);

        talkElement.innerHTML = `
            <div class="details">
                <span class="time">${time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - ${endTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                <span class="categories">${talk.category.join(', ')}</span>
            </div>
            <h2>${talk.title}</h2>
            <p class="speakers">By: ${talk.speakers.join(', ')}</p>
            <p>${talk.description}</p>
        `;
        scheduleContainer.appendChild(talkElement);

        startTime.setTime(endTime.getTime() + 10 * 60 * 1000);

        if (index === 2) {
            const breakElement = document.createElement('div');
            breakElement.classList.add('talk', 'break');
            const breakStartTime = new Date(startTime);
            const breakEndTime = new Date(breakStartTime.getTime() + 60 * 60 * 1000);
            breakElement.innerHTML = `
                <div class="details">
                    <span class="time">${breakStartTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - ${breakEndTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
                <h2>Lunch Break</h2>
            `;
            scheduleContainer.appendChild(breakElement);
            startTime.setTime(breakEndTime.getTime() + 10 * 60 * 1000);
        }
    });
}

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredTalks = talks.filter(talk => {
        return talk.category.some(category => category.toLowerCase().includes(searchTerm));
    });
    renderSchedule(filteredTalks);
});

renderSchedule(talks);
