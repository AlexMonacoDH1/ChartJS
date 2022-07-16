const ctx = document.getElementById('myChart').getContext('2d');

let delayed;

let gradient = ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, 'rgba(58, 123, 213, 1)');
gradient.addColorStop(1, 'rgba(0, 210, 255, 0.3)');

const labels = [
    "1900",
    "1910",
    "1920",
    "1930",
    "1940",
    "1950",
    "1960",
    "1970",
    "1980",
    "1990",
    "2000",
    "2010",
    "2020"
];

const data = {
    labels,
    datasets: [
        {
            data: [0.2, 0.3, 0.5, 0.8, 1.3, 2.1, 3.8, 5.9, 8.5, 9.6, 10.4, 11.2, 12.3],
            label: "São Paulo Population",
            fill: true,
            backgroundColor: gradient,
            borderColor: '#fff',
            pointbackgroundColor: '#fff',
            tension: 0.2
        },
    ],
};

const config = {
    type: 'line',
    data: data,
    options: {
        radius: 3,
        hitRadius: 20,
        hoverRadius: 10,
        responsive: true,
        animation: {
            onComplete: () => {
                delayed = true;
            },
            delay: (context) => {
                let delay = 0;
                if(context.type === 'data' && context.mode === 'default' && !delayed) {
                    delay = context.dataIndex * 300 + context.datasetIndex * 100;
                }
                return delay;
            },
        },
        scales: {
            y: {
                ticks: {
                    callback: function(value) {
                        return '$' + value + 'm';
                    },
                },
            },
        },
    },
};

const myChart = new Chart(ctx, config);