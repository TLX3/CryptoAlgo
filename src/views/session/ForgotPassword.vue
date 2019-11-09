<<template>
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
										<h2 class="mb-3">{{$t('message.forgotPassword')}}</h2>
										<p class="fs-14">{{$t('message.enterYourEmailToSendYouAResetLink')}}.</p>
										<v-form v-model="valid" class="mb-4">
											<v-text-field 
												label="E-mail ID" 
												v-model="email" 
												:rules="emailRules" 
												required
											></v-text-field>						
											<v-btn color="primary" block @click="forgotPassword">Send Email</v-btn>
										</v-form>
										<div>
											<router-link to="/login">{{$t('message.backToSignIn')}}</router-link>
										</div>
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
import axios from 'axios'
import AppConfig from "Constants/AppConfig";

export default {
  data() {
    return {
			email: '',
      valid: false,
			emailRules: [
        v => !!v || "E-mail is required",
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid"
      ],
      appLogo: AppConfig.appLogo2
    };
  },
	methods: {
		forgotPassword () {
			let headers = {
				'Content-Type': 'application/json'
			}
			axios.post(process.env.VUE_APP_API_SERVER + 'forget', { 'email': this.email }, {headers: headers})
			.then(res => {
				console.log(res)
			})
			.catch(error => {
				console.log(error)
			});
		}
	}
};
</script>
