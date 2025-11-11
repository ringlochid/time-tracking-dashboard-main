function main(){
    const [daily_botton, weekly_botton, monthly_botton] = document.querySelectorAll(".time-option");
    //const [work_card, play_card, study_card, exercise_card, social_card, care_card] = document.querySelectorAll(".data-card-display");
    const card_list = Array.from(document.querySelectorAll(".data-card-display"));

    async function getuserdata() {
        const r = await fetch('./data.json');
        if (!r.ok) throw new Error(`http${r.status}`);
        return r.json();
    }

    function getByPeriod(data, period) {
        return data.map(({title = 'Untitled', timeframes = {}}) => {
            const { current, previous } = timeframes[period];
            return { title, current, previous };
        });
    }

    function updatedMSG(period){
        let curr_hrs, prev_hrs;
        const time_list = getByPeriod(data, period);
        for (let i = 0; i < card_list.length; i++){
            curr_hrs = card_list[i].querySelector('h1');
            prev_hrs = card_list[i].querySelector('p');
            curr_hrs.textContent = `${time_list[i]["current"]}hrs`;
            prev_hrs.textContent = `Previous - ${time_list[i]["previous"]}hrs`;
        }
        return;
    }

    let data;

    daily_botton.addEventListener('click', (e) => {
        e.preventDefault();
        getuserdata()
            .then((d) => {
                data = d;
            })
            .catch((err) => {
                console.log('updatefailed', err);
            })
            .finally(() => console.log('updated'));
        updatedMSG("daily");
    });

    weekly_botton.addEventListener('click', (e) => {
        e.preventDefault();
        getuserdata()
            .then((d) => {
                data = d;
            })
            .catch((err) => {
                console.log('updatefailed', err);
            })
            .finally(() => console.log('updated'));
        updatedMSG("weekly");
    });

    monthly_botton.addEventListener('click', (e) => {
        e.preventDefault();
        getuserdata()
            .then((d) => {
                data = d;
            })
            .catch((err) => {
                console.log('updatefailed', err);
            })
            .finally(() => console.log('updated'));
        updatedMSG("monthly");
    })

}

document.addEventListener('DOMContentLoaded', main)