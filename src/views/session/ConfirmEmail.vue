<template>
	<div class="session-wrapper">
		 <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>
									<img 
										:src="appLogo" 
										class="img-responsive mt-2" 
										width="39" 
										height="39" 
									/>
								</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <v-btn
                    icon
                    large
                    target="_blank"
                    slot="activator"
                  >
                    <v-icon large>code</v-icon>
                  </v-btn>
                  <span>Source</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-title v-if='!emailConfirmed'>
                <div class='verify-email'>Verify your email</div>
                <div class='verify-email'>This email address was entered when signing up. To confirm this is your email, please click below.</div>
              </v-card-title>
              <v-card-title v-else>
                <div class='verify-email'>Email sucessfully verified</div>
                <div class='verify-email'>Your email has been confirmed and your account is activated. You can now login to ProfitsData.</div>
              </v-card-title>
        	    <v-card-text>
                <v-btn v-if='!emailConfirmed' large @click="confirmEmail" block color="primary" class="mb-3">Confirm Email</v-btn>
                <v-btn v-else @click="$router.push('/login')" block color="primary">Go to Login</v-btn>           
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
	</div>
</template>

<script>
import AppConfig from "Constants/AppConfig";
import axios from 'axios'

export default {
  data() {
    return {
      appLogo: AppConfig.appLogo2,
      brand: AppConfig.brand,
      token: null,
      emailConfirmed: false
    }
  },
  mounted () {
    let url_string = window.location.href
    let params = this.getQueryParams(url_string)
    let token = params[Object.keys(params)[0]]
    this.token = token
  },
  methods: {
    getQueryParams(qs) {
      qs = qs.split('+').join(' ')
      let params = {}
      let tokens;
      let re = /[?%]?([^=]+)=([^&]*)/g;
      while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2])
      }
      return params
    },
    confirmEmail () {
      // Confirm email
      axios.get(process.env.VUE_APP_API_SERVER + 'confirm_email?token=' + this.token)
      .then((res) => {
        console.log(res)
        this.emailConfirmed = true
      })
    }
  }
};
</script>

<style lang="scss">
  .verify-email {
    font-size: 24px;
    line-height: 32px;
    color: #23283C;
    text-align: center;
    margin: 0 auto;
  }
</style>