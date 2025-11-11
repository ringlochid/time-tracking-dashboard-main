function main(){
    const [dailyButton, weeklyButton, monthlyButton] = document.querySelectorAll(".time-option");
    const cards = Array.from(document.querySelectorAll(".data-card-display"));
    const timeButtons = [dailyButton, weeklyButton, monthlyButton];
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
        if (!dataCache.length) return;
        const timeList = getByPeriod(dataCache, period);
        cards.forEach((card, index) => {
            const timeframe = timeList[index];
            if (!timeframe) return;
            const currHrs = card.querySelector('h1');
            const prevHrs = card.querySelector('p');
            currHrs.textContent = `${timeframe.current}hrs`;
            prevHrs.textContent = `Previous - ${timeframe.previous}hrs`;
        });
    }

    function setActiveButton(activeButton) {
        timeButtons.forEach((button) => {
            button.classList.toggle('time-option--active', button === activeButton);
        });
    }

    function attachHandlers() {
        dailyButton.addEventListener('click', (event) => {
            event.preventDefault();
            setActiveButton(dailyButton);
            updateMessage("daily");
        });

        weeklyButton.addEventListener('click', (event) => {
            event.preventDefault();
            setActiveButton(weeklyButton);
            updateMessage("weekly");
        });

        monthlyButton.addEventListener('click', (event) => {
            event.preventDefault();
            setActiveButton(monthlyButton);
            updateMessage("monthly");
        });
    }

    getUserData()
        .then((data) => {
            dataCache = data;
            attachHandlers();
            setActiveButton(weeklyButton);
            updateMessage("weekly");
        })
        .catch((error) => {
            console.error('Failed to load data', error);
        });
}

document.addEventListener('DOMContentLoaded', main);
