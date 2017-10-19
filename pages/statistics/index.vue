<template>
    <main>
        <h1>Statistics</h1>
        <div class="flex two">
            <table>
                <thead>
                <tr>
                    <th>Team</th>
                    <th>Total score</th>
                    <th>Games won / Games played</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="statistic in statistics" v-bind:key="statistic.team">
                    <td>{{ statistic.team }}</td>
                    <td>{{ statistic.score }}</td>
                    <td>{{ Math.round(statistic.statistics) }}%</td>
                </tr>
                </tbody>
            </table>
        </div>
    </main>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    async asyncData({ store }) {
      await store.dispatch('score/fetchAll');
    },
    methods: {
      sort_by_statistics(a, b) {
        if (a.statistics < b.statistics) {
          return 1;
        }
        if (a.statistics > b.statistics) {
          return -1;
        }
        return 0;
      },
      filterTeams() {
        const teams = [];
        for (const score of this.scores) {
          if (score.score.blue || score.score.red) {
            const teamRed = { team: score.red.join(','), score: score.score.red, playedTimes: 1, winner: 0 };
            const teamBlue = { team: score.blue.join(','), score: score.score.blue, playedTimes: 1, winner: 0 };
            if (teamRed.score > teamBlue.score) {
              teamRed.winner = 1;
            } else {
              teamBlue.winner = 1;
            }
            teams.push(teamRed, teamBlue);
          }
        }
        const filteredTeams = [];
        for (const team of teams) {
          const index = filteredTeams.findIndex(element => element.team === team.team);
          if (index < 0) {
            filteredTeams.push(team);
          } else {
            filteredTeams[index].score += team.score;
            filteredTeams[index].winner += team.winner;
            filteredTeams[index].playedTimes += team.playedTimes;
          }
        }
        for (const team of filteredTeams) {
          team.statistics = 100 * (team.winner / team.playedTimes);
        }
        return filteredTeams;
      },
    },
    computed: {
      statistics() {
        const totalGames = this.scores.length;
        return this.filterTeams().sort(this.sort_by_statistics);
      },
      ...mapGetters({
        scores: 'score/scores',
      }),
    },
  };
</script>

<style scoped>
th,
td {
  text-align: center;
}
</style>