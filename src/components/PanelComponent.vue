<template>
    <div class="panel">
        <div 
          class="cell distance"
        >
          <span 
            class="value"
            :style="{
              'width': `${resultReady ? result[yearSelected][selectedType].totalDistance.toFixed(1).toString().length * 12.6 : 12.6}px`
            }"
          >
            {{ resultReady ? result[yearSelected][selectedType].totalDistance.toFixed(1) : '-' }}
          </span>
          <span class="regular">km</span>
        </div>
        <div class="cell speed">
            <div>
                <span 
                  class="value" 
                  :style="{
                    'width': `${ resultReady ? (
                    result[yearSelected][selectedType].totalDistance /
                    result[yearSelected][selectedType].totalHours
                    ).toFixed(1).toString().length * 12.6 : 12.6}px`
                  }"
                >
                  {{ resultReady ? (
                    result[yearSelected][selectedType].totalDistance /
                    result[yearSelected][selectedType].totalHours
                  ).toFixed(1) : '-'}}
                </span>
                <span class="regular">km/h</span>
            </div>
            <div>
                <span>avg speed</span>
            </div>
        </div>
        <div class="cell sportsSelector">
            <SportsSelectorComponent
              @sports-selected-changed="onChangeSportsType"
            ></SportsSelectorComponent>            
        </div>
        <div class="cell time">
            <span 
              class="value" 
              :style="{
                'width': `${resultReady ? result[yearSelected][selectedType].totalHours.toFixed(1).toString().length * 12.6 : 12.6}px`
              }"
            >
              {{ resultReady ?
                result[yearSelected][selectedType].totalHours.toFixed(1) :
                '-'
              }}
            </span>
            <span class="regular">hours</span>
        </div>
        <div class="cell session-count">
          <span 
            class="value" 
            :style="{
              'width': `${resultReady ? result[yearSelected][selectedType].totalSessions.toString().length * 12.6 : 12.6}px`
            }"
          >
            {{ 
              resultReady ?
              result[yearSelected][selectedType].totalSessions :
              '-'
            }}
          </span>
          <span class="regular" style="margin-left: 8px">records</span>
        </div>
        <div class="cell charts">
          <div v-if="resultReady" class="charts-panel-container">
            <ChartComponent 
              class="chart-block"
              :data="result[yearSelected][selectedType]"
              :yLabel="'speed'"
            ></ChartComponent>
            <ChartComponent 
              class="chart-block"
              :data="result[yearSelected][selectedType]"
              :yLabel="'distance'"
            ></ChartComponent>
          </div>
        </div>
        <div class="cell map">
          <MapComponent
            v-if="resultReady"
            :data="result.all.all.polylineData"
          ></MapComponent>
        </div>
        <div class="cell top-speed">
          <div>
              <span 
                class="value" 
                :style="{
                  'width': `${resultReady ? result[yearSelected][selectedType]
                  .fastestActivity
                  .speed.toFixed(1).toString().length * 12.6 : 12.6}px`
                }"
              >
                {{ 
                  resultReady ?
                  result[yearSelected][selectedType]
                  .fastestActivity
                  .speed.toFixed(1)  :
                  '-'
                }}
              </span>
              <span class="regular">km/h</span>
          </div>
          <p class="small-text">
            for 
            <span 
                class="value" 
                :style="{
                  'width': `${resultReady ? result[yearSelected][selectedType]
                  .fastestActivity
                  .distance.toFixed(1).toString().length * 10 : 10}px`
                }"
              >
                {{ 
                  resultReady ?
                  result[yearSelected][selectedType]
                  .fastestActivity
                  .distance.toFixed(1)  :
                  '-'
                }}
              </span>
            km
          </p>
        </div>
        <div class="cell top-distance">
          <div>
              <span 
                class="value" 
                :style="{
                  'width': `${resultReady ? result[yearSelected][selectedType]
                  .longestActivity
                  .distance.toFixed(1).toString().length * 12.6 : 12.6}px`
                }"
              >
                {{ 
                  resultReady ?
                  result[yearSelected][selectedType]
                  .longestActivity
                  .distance.toFixed(1)  :
                  '-'
                }}
              </span>
              <span class="regular">km</span>
          </div>
          <p class="small-text">
            at 
            <span 
                class="value" 
                :style="{
                  'width': `${resultReady ? result[yearSelected][selectedType]
                  .longestActivity
                  .speed.toFixed(1).toString().length * 10 : 10}px`
                }"
              >
                {{ 
                  resultReady ?
                  result[yearSelected][selectedType]
                  .longestActivity
                  .speed.toFixed(1)  :
                  '-'
                }}
            </span>
            km/h
          </p>
        </div>
        <div 
          class="loader-blankspace"
          :class="{
            disappear: resultReady,
            hide: hideLoader
          }"
        ></div>
        <div 
          class="loader"
          :class="{
            disappear: resultReady,
            hide: hideLoader
          }"
        ></div> 
    </div>
</template>

<script>
  import SportsSelectorComponent from './SportsSelectorComponent.vue'
  import ChartComponent from './ChartComponent.vue'
  import MapComponent from './MapComponent.vue'
  // import { ref, onMounted, reactive, toRaw } from 'vue';
  import { ref, onMounted, reactive } from 'vue';

  export default {
    name: 'PanelComponent',
    components: {
        SportsSelectorComponent,
        ChartComponent,
        MapComponent,
    },
    props: ['yearSelected'],
    setup() {
      const result = reactive({});
      var resultReady = ref(false);
      var hideLoader = ref(false);

      onMounted(() => {
        const client_id = '80748';
        const client_secret = 'dd7bfd8626e77e41d351f7a76a85be61531a5ceb';
        const refresh_token = '33d2cf7c17d96d25428a3190515a237c4e19f84b';

        async function getAndAnalyzeActivities(res) {
          const allActivitiesData = [];
          // const requestSizes = [200, 200, 200];
          const requestSizes = [100]
          const totalPages = requestSizes.length;
          const totalRequests = totalPages;
          let successfulRequests = 0;

          for (let page = 1; page <= totalPages; page++) {
            const activitiesEndpoint = `https://www.strava.com/api/v3/athlete/activities?access_token=${res.access_token}&per_page=${requestSizes[page - 1]}&page=${page}`;

            fetch(activitiesEndpoint)
              .then((response) => response.json())
              .then(async function(data) {
                allActivitiesData.push(data);
                successfulRequests++;

                if (successfulRequests === totalRequests) {
                  const sortedAndUnitedData = allActivitiesData.reduce((accumulator, currentArray) => {
                    return accumulator.concat(currentArray);
                  }, []);

                  const organizedData = {};

                  sortedAndUnitedData.forEach(activity => {
                    const year = new Date(activity.start_date).getFullYear();
                    let sportType = "";

                    if (activity.type === "Run") {
                      sportType = "run";
                    } else if (activity.type === "Ride") {
                      sportType = "ride";
                    } else {
                      return;
                    }

                    if (!organizedData[year]) {
                      organizedData[year] = { run: [], ride: [], swim: [] };
                    }

                    organizedData[year][sportType].push(activity);
                  });

                  await analyze(organizedData);
                }
              });
          }
        }

        async function analyze(all_data) {
          result['all'] = {
            'all': { 
              'polylineData': [],
              fastestActivity: { distance: 0, speed: 0 },
              longestActivity: { distance: 0, speed: 0 },
              totalDistance: 0,
              totalHours: 0,
              totalSessions: 0,
              sessions: []
             }
          }

          for (const year in all_data) {
            result[year] = {};
            const yearData = all_data[year];
            let totalSessions = 0;
            let totalHours = 0;
            let totalDistance = 0;

            result[year]['all'] = {
              totalSessions: 0,
              totalHours: 0,
              totalDistance: 0,
              longestActivity: {distance: 0, speed: 0},
              fastestActivity: {distance: 0, speed: 0},
              sessions: []
            };

            for (const sportType in yearData) {
              result[year][sportType] = {};
              result[year][sportType].totalDistance = 0;
              result[year][sportType].totalHours = 0;
              result[year][sportType].totalSessions = 0;
              result[year][sportType]['sessions'] = [];

              const activities = yearData[sportType];
              let longestActivity = { distance: 0, speed: 0 };
              let fastestActivity = { distance: 0, speed: 0 };

              for (const post of activities) {
                const distance = parseFloat((post.distance / 1000).toFixed(1));
                const speed = parseFloat((post.average_speed * 3.6).toFixed(1));

                const date = new Date(post.start_date_local);
                const year = date.getFullYear();

                result.all.all.polylineData.push(post.map.summary_polyline);

                const formattedDate = date.toLocaleString('en', {
                  month: 'short',
                  day: 'numeric',
                  year: '2-digit'
                });

                result[year][sportType].sessions.push({
                  speed: speed,
                  distance: distance,
                  date: formattedDate,
                })

                result[year]['all'].sessions.push({
                  speed: speed,
                  distance: distance,
                  date: formattedDate
                })

                if (distance > longestActivity.distance) {
                  longestActivity = { distance, speed };
                }

                if (speed > fastestActivity.speed) {
                  fastestActivity = { distance, speed };
                }

                totalSessions++;
                totalHours += post.moving_time / 3600;
                totalDistance += distance;

                result[year][sportType].totalSessions++;
                result[year][sportType].totalHours += post.moving_time / 3600;
                result[year][sportType].totalDistance += distance;
              }

              result[year][sportType].longestActivity = longestActivity;
              result[year][sportType].fastestActivity = fastestActivity;
            }

            result[year].totalSessions = totalSessions;
            result[year].totalHours = totalHours;
            result[year].totalDistance = totalDistance;

            result[year]['all'].totalSessions += totalSessions;
            result[year]['all'].totalHours += totalHours;
            result[year]['all'].totalDistance += totalDistance;


            if (
              result[year].ride.longestActivity.distance >
              result[year].run.longestActivity.distance
            ) {
              result[year]['all'].longestActivity = 
              result[year].ride.longestActivity
            } else {
              result[year].run.longestActivity
            }

            if (
              result[year].ride.fastestActivity.speed >
              result[year].run.fastestActivity.speed
            ) {
              result[year]['all'].fastestActivity = 
              result[year].ride.fastestActivity
            } else {
              result[year].run.fastestActivity
            }
          }

          const activities = ['ride', 'swim', 'run'];

          for (const activity of activities) {
            result['all'][activity] = {
                fastestActivity: { distance: 0, speed: 0 },
                longestActivity: { distance: 0, speed: 0 },
                totalDistance: 0,
                totalHours: 0,
                totalSessions: 0,
                sessions: []
            };
          }

          for (const year in all_data) {
            const activities = all_data[year];

            for (const activity in activities) {
                const currentActivity = result[year][activity];
                const allActivity = result['all'][activity];
                const allAll = result['all']['all'];

                allActivity.totalSessions += currentActivity.totalSessions;
                allActivity.totalHours += currentActivity.totalHours;
                allActivity.totalDistance += currentActivity.totalDistance;
                allActivity.sessions = allActivity.sessions.concat(currentActivity.sessions)

                allAll.totalSessions += currentActivity.totalSessions;
                allAll.totalHours += currentActivity.totalHours;
                allAll.totalDistance += currentActivity.totalDistance;
                allAll.sessions = allAll.sessions.concat(currentActivity.sessions)

                if (currentActivity.longestActivity.distance > allAll.longestActivity.distance) {
                    allAll.longestActivity = currentActivity.longestActivity;
                }

                if (currentActivity.fastestActivity.speed > allAll.fastestActivity.speed) {
                    allAll.fastestActivity = currentActivity.fastestActivity;
                }

                if (currentActivity.longestActivity.distance > allActivity.longestActivity.distance) {
                    allActivity.longestActivity = currentActivity.longestActivity;
                }

                if (currentActivity.fastestActivity.speed > allActivity.fastestActivity.speed) {
                    allActivity.fastestActivity = currentActivity.fastestActivity;
                }
            }
        }


          resultReady.value = true;

          setTimeout(() => {
            hideLoader.value = true;
          }, 600);
          // console.log(toRaw(result));
        }

        // eslint-disable-next-line no-unused-vars
        function reAuthorize(){
          const auth_link = "https://www.strava.com/oauth/token"
          try {
            fetch(auth_link,{
              method: 'post',
              headers: {
                      'Accept': 'application/json, text/plain, */*',
                      'Content-Type': 'application/json'
  
              },
  
              body: JSON.stringify({
  
                      client_id: client_id,
                      client_secret: client_secret,
                      refresh_token: refresh_token,
                      grant_type: 'refresh_token'
                  })
            }).then((res) => res.json())
                .then(res => getAndAnalyzeActivities(res))
          } catch {
            console.log("Strava API request failed.")
          }
        }

        reAuthorize()
      })

      return {
        result,
        resultReady,
        hideLoader,
      }
    },
    data() {
    return {
        selectedType: "ride",
      };
    },
    methods: {
      onChangeSportsType(newType) {
        this.selectedType = newType;
      }
    }
  }
</script>
<style>

.panel {
    padding: 12px;
    height: calc(100vh - 120px);
    gap: 12px;
}

.panel {  
    display: grid;
    grid-template-columns: auto auto auto auto auto 80px;
    grid-template-rows: 80px 80px 80px 1fr 100px 100px;
    grid-auto-columns: 1fr;
    grid-auto-flow: row;
    grid-template-areas:
    "distance distance speed speed speed sportsSelector"
    "time time speed speed speed sportsSelector"
    "session-count session-count session-count map map map"
    "charts charts charts map map map"
    "charts charts charts top-speed top-speed top-speed"
    "charts charts charts top-distance top-distance top-distance";
}

.distance { 
    grid-area: distance;
    grid-area: session-count;
    background: #D34E24 !important;
}

.distance * {
  color: #f6e2dd !important
}

.sportsSelector { 
    grid-area: sportsSelector;
    background: #3D348B  !important;
    padding: 0 !important;
}

.time { 
    grid-area: time;
    background: #31AFD4 !important;
}

.time * {
  color: #def1f7 !important
}

.session-count { 
    grid-area: session-count;
    grid-area: distance;
    background: #EF476F !important;
}

.session-count * {
  color: #f7dde3 !important;
}

.charts { 
    grid-area: charts;
    background: #B8B8AA !important;
    width: calc(50vw - 18px);
  }

  .chart-block:first-child {
    margin-bottom: 32px; /* Override margin for the first element */
  }
  
  .charts-panel-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.map { 
  grid-area: map;
  padding: 0 !important;
  overflow: hidden;
}

.speed { 
    grid-area: speed;
    flex-direction: column;
    background: #E6AF2E !important;
}

.speed * {
  color: #f3ead1 !important;
}

.top-speed {
  flex-direction: column;
  grid-area: top-speed;
  background: #2E86AB !important;
}

.top-speed * {
  color: #d9e3e7 !important;
}

.top-speed .small-header {
  background-color: #1f6a8a !important;
}

.top-distance {
  flex-direction: column;
  grid-Area: top-distance;
  background-color: #A23B72 !important;
}

.top-distance * {
  color: #efd0e0 !important;
}

.top-distance .small-header {
  background-color: #782350 !important;
}

.cell {
    background-color: darkslategrey;
    border-radius: 16px;
    display: flex;
    padding: 12px;
    justify-content: center;
    align-items: center;
    font-size: 1.25em;
    transition-duration: .3s;
}

.value {
    display: inline-block;
    position: relative;
    z-index: 2;
    font-size: 1.25em;
    font-weight: bold;
    transition-duration: 0.3s;
}

.distance .value {
  width: 12.6px;
}

.regular {
    display: inline-block;
    margin-left: 6px;
}

.small-text {
  font-size: 0.75em;
  margin: -5px;
  display: block;
}

.small-header {
  padding: 4px 8px; 
  width: 80%;
  max-width: 160px;
  font-size: 0.85em;
  margin-bottom: 8px;
  border-radius: 8px;
}

.loader-blankspace {
  position: absolute;
  /* width: 60px;
  height: 60px;
  bottom: 10px;
  left: -23px; */
  width: 100vw;
  height: 100vh;
  left: 0;
  bottom: 0;
  z-index: 2;
  background-color: var(--dark-blue);  
  background: rgba(5, 4, 22, .5);
  backdrop-filter: blur(6px);
  transition-duration: 600ms;
}

.loader {
  position: absolute;
  /* width: 33.7px;
  height: 33.7px;
  bottom: 17.2px;
  padding-left: 8px; */
  z-index: 3;
  border-radius: 12px;
  flex: 0 0 auto;
  /* padding: 4px 12px; */
  /* margin: 4px; */
  font-size: 20px;
  cursor: pointer;
  transition: 600ms;
  transition-property: all;
  user-select: none;
	overflow: hidden;
  height: 40px;
  width: 40px;
  left: calc(50vw - 20px);
  bottom: 40vh;
}

.loader::before {
		content: '';
		position: absolute;
		z-index: -2;
		left: -50%;
		top: -95%;
		width: 200%;
		height: 300%;
		background-color: #399953;
		background-repeat: no-repeat;
		background-size: 50% 50%, 50% 50%;
		background-position: 0 0, 100% 0, 100% 100%, 0 100%;
		background-image: linear-gradient(#399953, #399953), linear-gradient(#fbb300, #fbb300), linear-gradient(#d53e33, #d53e33), linear-gradient(#377af5, #377af5);
		animation: rotate 1s linear infinite;
	}
	
	.loader::after {
		content: '';
		position: absolute;
		z-index: -1;
		left: 6px;
		top: 6px;
		width: calc(100% - 12px);
		height: calc(100% - 12px);
    background: var(--dark-blue);
    border-radius: 5px;
	}

  .disappear {
    animation: disappear 600ms forwards;
  }

  .hide {
    display: none;
  }

  @keyframes disappear {
    100% {
      opacity: 0;
    }
  }

  @keyframes rotate {
    100% {
      transform: rotate(1turn);
    }
  }
</style>