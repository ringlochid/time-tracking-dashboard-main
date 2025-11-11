function main(){
    const [dailyButton, weeklyButton, monthlyButton] = document.querySelectorAll(".time-option");
    const cards = Array.from(document.querySelectorAll(".data-card-display"));
    let dataCache = [];

    async function getUserData() {
        const response = await fetch('./data.json');
        if (!response.ok) throw new Error(`http ${response.status}`);
        return response.json();
    }

    function getByPeriod(data, period) {
        return data.map(({ title = 'Untitled', timeframes = {} }) => {
            const frame = timeframes[period] || { current: 0, previous: 0 };
            const { current, previous } = frame;
            return { title, current, previous };
        });
    }

    function updateMessage(period){
        const timeList = getByPeriod(dataCache, period);
        cards.forEach((card, index) => {
            const currHrs = card.querySelector('h1');
            const prevHrs = card.querySelector('p');
            currHrs.textContent = `${timeList[index].current}hrs`;
            prevHrs.textContent = `Previous - ${timeList[index].previous}hrs`;
        });
    }

    function attachHandlers() {
        dailyButton.addEventListener('click', (event) => {
            event.preventDefault();
            dailyButton.style.color = 'white';
            weeklyButton.style.color = 'var(--clr-text-muted)';
            monthlyButton.style.color = 'var(--clr-text-muted)';
            updateMessage("daily");
        });

        weeklyButton.addEventListener('click', (event) => {
            event.preventDefault();
            dailyButton.style.color = 'var(--clr-text-muted)';
            weeklyButton.style.color = 'white';;
            monthlyButton.style.color = 'var(--clr-text-muted)';
            updateMessage("weekly");
        });

        monthlyButton.addEventListener('click', (event) => {
            event.preventDefault();
            dailyButton.style.color = 'var(--clr-text-muted)';
            weeklyButton.style.color = 'var(--clr-text-muted)';
            monthlyButton.style.color = 'white';
            updateMessage("monthly");
        });
    }

    getUserData()
        .then((data) => {
            dataCache = data;
            attachHandlers();
            updateMessage("weekly");
        })
        .catch((error) => {
            console.error('Failed to load data', error);
        });
}

document.addEventListener('DOMContentLoaded', main);
