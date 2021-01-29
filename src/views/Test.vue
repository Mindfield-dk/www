<template>
  <b-container>
    <b-row>
      <b-col>
        <h1>Coming</h1>
        <b-button @click="getstuff">Get first</b-button>
        <b-button @click="updateRole">Update</b-button>
        <b-button @click="deleteRole">Delete</b-button>
        <p v-if="!emptyCollection">{{ test[0].role }}</p>

        <p v-if="emptyCollection">Collection is empty</p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { db, cf } from "@/firebase/init";
export default {
  data() {
    return {
      test: [],
      emptyCollection: true,
    };
  },
  methods: {
    getstuff() {
      db.collection("roles")
        .get()
        .then((snapshot) => {
          if (snapshot.size) {
            snapshot.forEach((doc) => {
              let entry = doc.data();
              entry.id = doc.id;
              this.test.push(entry);
            });
            this.emptyCollection = false;
          } else {
            this.emptyCollection = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateRole() {
      let ur = cf.httpsCallable("updateRole");
      ur()
        .then(() => {
          console.log("done");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteRole() {
      let ur = cf.httpsCallable("deleteRole");
      ur()
        .then(() => {
          console.log("done");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped></style>
