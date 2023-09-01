<template>
    <div class="chart-container" style="position: relative;">
        <canvas :id="yLabel"></canvas>
    </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import Chart from 'chart.js/auto';

export default {
    name: 'PanelComponent',
    props: ['data', 'yLabel'],
    setup(props) {
        const sortedSessions = [...props.data.sessions].sort((a, b) => a[props.yLabel] - b[props.yLabel]);

        const dataArray = ref(sortedSessions.map(item => item[props.yLabel]));
        const dateArray = ref(sortedSessions.map(item => new Date(item.date)));
        
        const valueArray = ref(sortedSessions.map(
            item => {
                if (props.yLabel === 'distance') {
                    return `${item.date}, ${item.speed} km/h`;
                } else if (props.yLabel === 'speed') {
                    return `${item.date}, ${item.distance} km`;
                } else {
                    return item[props.yLabel];
                }
            }
        ));

        onMounted(() => {
            const ctx = document.getElementById(props.yLabel);
            const chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: valueArray.value,
                    datasets: [
                        {
                            label: props.yLabel,
                            data: dataArray.value,
                            fill: false,
                            borderColor: '#586F6B',
                            cubicInterpolationMode: 'monotone',
                        },
                    ],
                },
                options: {
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            display: false,
                        },
                        y: {
                            ticks: {
                                color: '#586F6B',
                                fontWeight: 'bold', 
                            },
                        }
                    },
                    elements: {
                        point: {
                            borderWidth: 0,
                            radius: 10,
                            backgroundColor: 'rgba(0,0,0,0)'
                        }
                    },
                }
            });

            watch(() => props.data, () => {
                const sortedSessions = [...props.data.sessions].sort((a, b) => a[props.yLabel] - b[props.yLabel]);

                dataArray.value = sortedSessions.map(item => item[props.yLabel]);
                dateArray.value = sortedSessions.map(item => new Date(item.date));
                const valueArray = ref(sortedSessions.map(
                    item => {
                        if (props.yLabel === 'distance') {
                            return `${item.date}, ${item.speed} km/h`;
                        } else if (props.yLabel === 'speed') {
                            return `${item.date}, ${item.distance} km`;
                        } else {
                            return item[props.yLabel];
                        }
                    }
                ));

                chart.data.labels = valueArray.value;
                chart.data.datasets[0].data = dataArray.value;
                chart.update();
            });
        });
    }
}
</script>

<style>

.chart-container {
    width: 40vw; 
    max-width: 100%;
    margin: 0 auto; 
    height: 40%;
}
</style>