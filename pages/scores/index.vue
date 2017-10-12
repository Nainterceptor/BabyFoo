<template>
    <main>
        <h1>Challengers</h1>
        <div class="flex two">
            <table>
                <thead>
                <tr>
                    <th>Team <i>blue</i></th>
                    <th>Team <i>red</i></th>
                    <th>Score <i>blue</i></th>
                    <th>Score <i>red</i></th>
                    <th>Winner</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="score in scores">
                    <td class="blue">{{ score.blue.join(', ') }}</td>
                    <td class="red">{{ score.red.join(', ') }}</td>
                    <td class="blue">{{ score.score.blue }}</td>
                    <td class="red">{{ score.score.red }}</td>
                    <td :class="score.score.blue > score.score.red ? 'blue' : 'red'">
                        {{ score.score.blue > score.score.red ? 'Blue' : 'Red' }}
                    </td>
                </tr>
                </tbody>
                <tfoot>
                <tr>
                    <th colspan="5"><button @click="flushNewScore()">New</button></th>
                </tr>
                </tfoot>
            </table>
            <form @submit.prevent="create(newScore)">
                <select multiple class="blue" v-model="newScore.blue">
                    <option v-for="user in users" :value="user._id" :key="user._id">
                        {{ user.name }}
                    </option>
                </select>
                <select multiple class="red" v-model="newScore.red">
                    <option v-for="user in users" :value="user._id" :key="user._id">
                        {{ user.name }}
                    </option>
                </select>
                <input required type="number" max="10" min="0" class="stack blue" v-model.number="newScore.score.blue" placeholder="Blue Score" />
                <input required type="number" max="10" min="0" class="stack red" v-model.number="newScore.score.red" placeholder="Red Score" />
                <button class="stack" type="submit">Envoyer</button>
            </form>
        </div>
    </main>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  function generateFreshScore() {
    return {
      blue: [],
      red: [],
      score: {
        red: null,
        blue: null,
      }
    };
  }

  export default {
    async asyncData({ store }) {
      await store.dispatch('score/fetchAll');
      await store.dispatch('user/fetchAll');
      return {
        newScore: generateFreshScore(),
      };
    },
    computed: {
      ...mapGetters({
        scores: 'score/scores',
        users: 'user/users',
      }),
    },
    methods: {
      async create(score) {
        try {
          await this.scoreCreate(score);
          this.$toasted.success('Score saved !');
          this.newScore = generateFreshScore();
        } catch (e) {
          this.$toasted.error(e.response.data);
        }
      },
      ...mapActions({
        scoreCreate: 'score/create',
      }),
      flushNewScore() {
          this.newScore = generateFreshScore();
      },
    },
  };
</script>