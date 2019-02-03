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
                  <v-form v-model="valid" class="mb-4">
                  <v-text-field 
                    label="E-mail ID" 
                    v-model="email" 
                    :rules="emailRules" 
                    autocomplete="email"
                    required
                  ></v-text-field>
                  <v-text-field 
                    label="Password" 
                    v-model="password" 
                    type="password" 
                    :rules="passwordRules" 
                    autocomplete="password"
                    required
                  ></v-text-field>
                  <v-checkbox 
                    color="primary" 
                    label="Remember me" 
                    v-model="checkbox"
                  ></v-checkbox>
                  <div>
                    <v-btn large @click="submit" block color="primary">{{$t('message.loginNow')}}</v-btn>
                    <v-btn large @click="onCreateAccount" block color="warning">{{$t('message.createAccount')}}</v-btn>
                  </div>
                  <p>{{$t('message.bySigningUpYouAgreeTo')}} {{brand}}</p>
                  <router-link class="mb-1" to="/forgot-password">{{$t('message.forgotPassword')}}?</router-link>
                  <v-spacer />
                  <router-link to="">{{$t('message.termsOfService')}}</router-link>
                </v-form>
                <div class="session-social-links d-inline-block">
                  <ul class="list-inline">
                    <li @click="signInWithFacebook">
                      <span class="facebook-bg session-icon">
                        <i class="ti-facebook"></i>
                      </span>
                    </li>
                    <li @click="signInWithGoogle">
                      <span class="google-bg session-icon">
                        <i class="ti-google"></i>
                      </span>
                    </li>
                    <li @click="signInWithTwitter">
                      <span class="twitter-bg session-icon">
                        <i class="ti-twitter-alt"></i>
                      </span>
                    </li>
                    <li @click="signInWithGithub">
                      <span class="github-bg session-icon">
                        <i class="ti-github"></i>
                      </span>
                    </li>
                  </ul>
                </div>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import AppConfig from "Constants/AppConfig";


export default {
  data() {
    return {
      checkbox: false,
      valid: false,
      email: "demo@example.com",
      emailRules: [
        v => !!v || "E-mail is required",
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid"
      ],
      password: "test#123",
      passwordRules: [v => !!v || "Password is required"],
      appLogo: AppConfig.appLogo2,
      brand: AppConfig.brand
    };
  },
  methods: {
    submit() {
      const user = {
        email: this.email,
        password: this.password
      };
      this.$store.dispatch("signIn", {
        user
      });
    },
    signInWithFacebook() {
      this.$store.dispatch("signinUserWithFacebook");
    },
    signInWithGoogle() {
      this.$store.dispatch("signinUserWithGoogle");
    },
    signInWithTwitter() {
      this.$store.dispatch("signinUserWithTwitter");
    },
    signInWithGithub() {
      this.$store.dispatch("signinUserWithGithub");
    },
    onCreateAccount() {
      this.$router.push("/sign-up");
    }
  }
};
</script>
