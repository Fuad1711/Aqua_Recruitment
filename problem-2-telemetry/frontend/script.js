const API_URL = '/api/telemetry/latest';
const POLL_INTERVAL = 5000;

const ui = {
    depth: document.getElementById('depth'),
    pressure: document.getElementById('pressure'),
    temp: document.getElementById('temp'),
    direction: document.getElementById('direction'),
    timestamp: document.getElementById('timestamp'),
    statusPanel: document.getElementById('status-panel'),
    statusText: document.getElementById('status-text')
};

const ctx = document.getElementById('depthChart').getContext('2d');
const depthChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Depth (meters)',
            data: [],
            borderColor: '#38bdf8',     
            backgroundColor: 'rgba(56, 189, 248, 0.1)', 
            borderWidth: 2,
            tension: 0.4,      
            fill: true,
            pointRadius: 3
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: { 
                grid: { color: '#334155' },
                ticks: { color: '#94a3b8' }
            },
            y: { 
                reverse: true,
                grid: { color: '#334155' },
                ticks: { color: '#94a3b8' }
            }
        },
        plugins: {
            legend: { display: false }
        }
    }
});


function updateSystemStatus(pressure) {
    ui.statusPanel.classList.remove('status-normal', 'status-warning', 'status-critical');

    if (pressure < 1.8) {
        ui.statusPanel.classList.add('status-normal');
        ui.statusText.textContent = "NORMAL";
    } else if (pressure >= 1.8 && pressure <= 2.0) {
        ui.statusPanel.classList.add('status-warning');
        ui.statusText.textContent = "WARNING";
    } else {
        ui.statusPanel.classList.add('status-critical');
        ui.statusText.textContent = "CRITICAL ALERT";
    }
}

function updateChart(timeLabel, depthValue) {
    const labels = depthChart.data.labels;
    const data = depthChart.data.datasets[0].data;

    labels.push(timeLabel);
    data.push(depthValue);

    if (labels.length > 20) {
        labels.shift();
        data.shift();
    }
    depthChart.update();
}

async function fetchData() {
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`Server Error: ${response.status}`);
        }

        const data = await response.json();

        ui.depth.textContent = data.depth.toFixed(2);
        ui.pressure.textContent = data.pressure.toFixed(2);
        ui.temp.textContent = data.temperature.toFixed(1);
        ui.direction.textContent = data.direction.toFixed(0);

        const date = new Date(data.timestamp);
        const timeStr = date.toLocaleTimeString();
        ui.timestamp.textContent = timeStr;

        updateSystemStatus(data.pressure);
        updateChart(timeStr, data.depth);

    } catch (error) {
        console.error("Telemetry Error:", error);
        ui.statusText.textContent = "DISCONNECTED";
        ui.statusPanel.classList.remove('status-normal', 'status-warning');
        ui.statusPanel.classList.add('status-critical');
    }
}

setInterval(fetchData, POLL_INTERVAL);
fetchData();