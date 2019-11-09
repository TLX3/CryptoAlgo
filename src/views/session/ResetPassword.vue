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
                <v-card-text>
									<div class="session-content">
										<img 
											:src="appLogo"
											class="img-responsive mb-3" 
											width="78" 
											height="78" 
										/>
										<h2 class="mb-3">{{$t('message.resetPassword')}}</h2>
										<p class="fs-14">{{$t('message.pleaseEnterYourPasswordToReset')}}.</p>
										<v-form v-model="valid" class="mb-4">
											<v-text-field 
												label="New Password" 
												v-model="newPassword" 
												type="password" 
												:rules="passwordRules" 
												required
											></v-text-field>
											<v-text-field 
												label="Confirm Password" 
												v-model="confirmPassword" 
												type="password" 
												:rules="passwordRules" 
												required
											></v-text-field>
											<v-btn large @click="submit" block color="primary">{{$t('message.resetPassword')}}</v-btn>
										</v-form>
									</div>
              	</v-card-text>
            </v-card>
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
      valid: false,
      newPassword: "",
      confirmPassword: "",
			passwordRules: [v => !!v || "Password is required"],
      appLogo: AppConfig.appLogo2
    };
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
    submit () {
      // reset password
			if (this.confirmPassword !== this.newPassword) {
         this.$notify({
            group: 'loggedIn',
            type: 'error',
            text: 'Passwords must match'
          })			
			} else {
				let headers = {
					'Content-Type': 'application/json'
				}
				axios.post(process.env.VUE_APP_API_SERVER + 'reset', 
				{ 'new_password': this.confirmPassword, 'token': this.token }, 
				{headers: headers})
				.then(res => {
					console.log(res)
				})
				.catch(error => {
					console.log(error)
				});
			}
    }
  }
};
</script>
