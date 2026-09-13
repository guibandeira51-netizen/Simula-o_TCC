import Chart from 'chart.js/auto';

export class ChartsManager {
    chart: Chart;
    maxDataPts = 100;
    
    constructor() {
        const ctx = document.getElementById('energyChart') as HTMLCanvasElement;
        
        // Estilo Gráfico Científico HUD
        Chart.defaults.color = '#8a9bb2';
        Chart.defaults.font.family = 'JetBrains Mono';
        
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [
                    { label: 'Energia Cinética (Ek)', data: [], borderColor: '#00e5ff', borderWidth: 1.5, pointRadius: 0, tension: 0.2 },
                    { label: 'Energia Potencial (Ep)', data: [], borderColor: '#ff3366', borderWidth: 1.5, pointRadius: 0, tension: 0.2 }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { display: false }, // Oculta o tempo embaixo para ficar clean
                    y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { maxTicksLimit: 5 } }
                }
            }
        });
    }

    updateData(time: number, ek: number, ep: number) {
        const data = this.chart.data;
        data.labels?.push(time.toFixed(2));
        data.datasets[0].data.push(ek);
        data.datasets[1].data.push(ep);

        if ((data.labels?.length || 0) > this.maxDataPts) {
            data.labels?.shift();
            data.datasets[0].data.shift();
            data.datasets[1].data.shift();
        }
        this.chart.update();
    }

    clear() {
        this.chart.data.labels = [];
        this.chart.data.datasets[0].data = [];
        this.chart.data.datasets[1].data = [];
        this.chart.update();
    }
}
