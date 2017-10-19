<template>
    <main>
        <h1>Challengers</h1>
        <div class="flex two">
            <table class="primary">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="user in users" v-bind:key="user._id">
                    <td>{{ user.name }}</td>
                    <td><button @click="changeCurrentUser(user)">Edit</button></td>
                </tr>
                </tbody>
                <tfoot>
                <tr>
                    <th colspan="2"><button @click="changeCurrentUser(undefined)">New</button></th>
                </tr>
                </tfoot>
            </table>
            <form @submit.prevent="save(userToEdit)">
                <input type="text" class="stack" v-model="userToEdit._id" placeholder="ID" />
                <input type="text" class="stack" v-model="userToEdit.name" placeholder="Name" />
                <button class="stack" type="submit">Envoyer</button>
            </form>
        </div>
    </main>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    function generateFreshUserToEdit() {
      return {
        name: '',
        _id: undefined,
      };
    }
    export default {
      async asyncData({ store }) {
        await store.dispatch('user/fetchAll');
        return {
          userToEdit: generateFreshUserToEdit(),
        };
      },
      computed: {
        ...mapGetters({
          getUser: 'user/getUser',
          users: 'user/users',
        }),
      },
      methods: {
        async save(user) {
          try {
            await this.userSave(user);
            this.$toasted.success('User saved !');
            this.userToEdit = generateFreshUserToEdit();
          } catch (e) {
            this.$toasted.error(e.response.data);
          }
        },
        ...mapActions({
          userSave: 'user/save',
        }),
        changeCurrentUser(user = undefined) {
          if (user === undefined) {
            this.userToEdit = generateFreshUserToEdit();
          } else {
            const real_user = this.getUser(user._id);
            this.userToEdit = { ...real_user };
          }
        },
      },
    };
</script>
