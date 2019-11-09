<template>
  <v-app
	:dark="darkMode"
	id="inspire"
	:class="[{ 
		'box-layout': boxLayout, 
		'collapse-sidebar': collapseSidebar, 
		'rtl-layout': rtlLayout
	}]"
  > 
    <router-view></router-view>
    <notifications 
      group="loggedIn" 
      position="top right"
      animation-type="velocity"
    />
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import axios from 'axios'

export default {
  data() {
    return {
      animation: {
        enter: {
          opacity: [1, 0],
          translateX: [0, -300],
          scale: [1, 0.2]
        },
        leave: {
          opacity: 0,
          height: 0
        }
     }
    };
  },
  mounted() {
    if (
      this.selectedLocale.locale === "he" ||
      this.selectedLocale.locale === "ar"
    ) {
      this.$store.dispatch("rtlLayout");
    }
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token')
      axios.get(process.env.VUE_APP_API_SERVER + 'status' , { headers: {"Authorization" : `Bearer ${token}`} })
      .then(res => {
        console.log(res)
        //if not valid remove token and refresh page
        if (res.data.status === "fail") {
          localStorage.removeItem('token')
        } else {
          this.$store.dispatch('setUserInfo', res.data)
        }
      }).catch((error) => {
        console.log(error)
      });
    }
  },
  computed: {
    ...mapGetters([
      "darkMode",
      "collapseSidebar",
      "boxLayout",
      "rtlLayout",
      "selectedLocale"
    ])
  }
};
</script>
