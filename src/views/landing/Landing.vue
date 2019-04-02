<template>
  <v-app light>
    <v-toolbar class="white">
     <v-toolbar-side-icon><img src="/static/img/site-logo.png" height="100%"></v-toolbar-side-icon>
      <v-toolbar-title class="mx-0" v-text="title"></v-toolbar-title>
      <p>Beta</p>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <router-link to="/login"><v-btn flat class='my-4'>Log In</v-btn></router-link>
        <router-link to='/sign-up'><v-btn flat class="my-4 pink lighten-3">Sign Up</v-btn></router-link>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <section>
        <v-parallax :src="imageLink.sub_main" height="600">
          <v-layout column align-center justify-center class="white--text">
            <h1 class="white--text mb-2 display-1 text-xs-center" style="font-weight: 900; text-shadow: 3px 2px #000000">
              Algorithmic Trading on Cryptocurrencies
            </h1>
            <div class="white--text subheading mb-3 text-xs-center" style="font-weight: 900; text-shadow: 2px 2px #000000">
              Generate profits with trusted algorithms or customize your own
            </div>
            <v-btn class="blue lighten-2 mt-5" dark large href="/">
              Get Started
            </v-btn>
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-layout
          column
          wrap
          align-center
        >
          <v-flex xs12 sm4 class="my-3">
            <div class="text-xs-center">
              <h2 class="headline">The best way trade on all exchanges with higher returns</h2>
              <span class="subheading">
                No more restrictions, no more limits
              </span>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">public</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Reach the world</div>
                    </v-card-title>
                    <v-card-text>
                      No more searching for hot stocks, sectors, commodities, indexes, or reading market opinions. Algotrades does all the searching, timing and trading for you using our algorithmic trading system.
                      AlgoTrades proven strategies can be followed manually by receiving email and SMS text alerts, or it can be 100% hands-free trading, it’s up to you! You can turn on/off automated trading at any time, so you are always in control of your destiny.
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">flash_on</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">Fast feedback</div>
                    </v-card-title>
                    <v-card-text>
                      Time is important, we don't want you to waste it. Here you can get a massive feedback from real users in minutes. And if your stuff is appreciated you won't only get positive feedback but also lovely and sincere fans <3 
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">share</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Create new connections</div>
                    </v-card-title>
                    <v-card-text>
                      Imagine if you can directly speak with the world's population. Don't you think it would be easier to find nice people to interact with? ProfitsData is both local and global and help you to connect without limitations with people from your city, your state and your universe! 
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

      <section>
        <v-parallax :src="imageLink.main" height="380">
          <v-layout column align-center justify-center>
            <div class="headline white--text mb-3 text-xs-center">ProfitsData is a social network that allows everyone to reach a huge audience with a tap </div>
            <em>With the power of ProfitsData you don't need to be famous or post pics of cute cats in order to get visibility</em>
            <v-btn class="blue lighten-2 mt-5" dark large href="/pre-made-themes">
              Get more info
            </v-btn>
          </v-layout>
        </v-parallax>
      </section>

       <section>
        <v-container grid-list-md>

        
          <v-layout row wrap>
          <v-flex xs12 text-xs-center class="mt-5">
           <div class="headline">Are you amazed? Stay tuned!</div>
           <br>
          <div>We are lunching the beta in a few time. If you want to be one of the first ProfitsData users we will email you as soon as we're ready. In the beginning only few people will test before the launch. Let us know how ProfitsData will help you!</div>
          </v-flex>
          <v-flex xs8 offset-xs2>

              <v-card class="elevation-0 transparent">

                <v-card-text>
                  <v-flex xs12 v-if="!subscribed">
                    <v-text-field box label="Email address" :rules="emailRules" v-model="email" hint="Enter your email!" persistent-hint></v-text-field>
                  </v-flex>
                  <v-flex xs12 v-if="!subscribed">
                    <v-text-field box multi-line label="Bio and curiosities"></v-text-field>
                  </v-flex>
                  <v-flex xs12 class="text-xs-center" v-if="!subscribed">
                    <v-btn class="blue lighten-2 mb-5" dark large @click="subscribe">Get in touch</v-btn>
                  </v-flex>
                   <v-flex xs12 class="text-xs-center" v-if="subscribed">
                    <v-btn class="green lighten-2 mb-5" dark large>Welcome on board!</v-btn>
                  </v-flex>
                </v-card-text>

             </v-card>

                </v-flex>
            </v-layout>
          </v-container>
      </section>

       <section>
        <v-parallax :src="imageLink.social_cover" height="380">
          <v-layout column align-center justify-center>
            <div class="headline white--text text-xs-center">We are dropping cool news and opportunities on socials</div>
          </v-layout>
          <v-layout justify-space-around justify-center>
              <v-icon x-large dark>fab fa-facebook-f</v-icon>

              <v-icon x-large dark>fab fa-twitter</v-icon>

              <v-icon x-large dark>fab fa-reddit-alien</v-icon>

              <v-icon x-large dark>fab fa-instagram</v-icon>

              <v-icon x-large dark>fab fa-discord</v-icon>
            </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-container grid-list-xl>
          <v-layout row wrap justify-center class="my-5">
            <v-flex xs12 sm4>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Company info</div>
                </v-card-title>
                <v-card-text>
                  We are not a company. We hate companies. Just imagine us like the guys from the Silicon Valley series. 
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 sm4 offset-sm1>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">We are hiring</div>
                </v-card-title>
                <v-card-text>
                  Are you a creative person? Do you like techy stuff? Complete the email form by writing your skills and interests
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </section>

       <section>
        <v-container>
          <v-layout>
            <v-flex xs12 class="text-xs-center">
            </v-flex>
          </v-layout>
        </v-container>
     </section>

    


      <v-footer class="blue darken-2">
        <v-layout row wrap align-center>
          <v-flex xs12 class="text-xs-center">
            <div class="white--text ml-3">

            </div>
          </v-flex>
        </v-layout>
      </v-footer>

    </v-content>
</v-app>
</template>

<script>
export default {
  name: "App",
  data: function() {
    return {
      title: "ProfitsData",
      imageLink: {
        main:
          "https://coinjournal.net/wp-content/uploads/2017/09/Leverj-Unveils-Ethereum-Based-Decentralized-Crypto-Derivatives-Trading-Platform.jpg",
        sub_main:
          "https://static.wixstatic.com/media/9c4cf3368907463db046286699994311.jpg/v1/fill/w_630,h_473,al_c,q_80,usm_0.66_1.00_0.01/9c4cf3368907463db046286699994311.jpg",
        social_cover:
          "https://cdn-images-1.medium.com/max/1600/1*SfUnSwcp9mVJB4EH2lPtOQ.png"
      },
      email: "",
      emailRules: [
        v => {
          return !!v || "E-mail is required";
        },
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid"
      ],
      subscribed: false
    };
  },
  methods: {
    subscribe: function() {
      this.subscribed = !this.subscribed;
    }
  },

  computed: {
    imgHeight: function() {
      var offset = 320;
      console.log("new image height is " + (this.pageHeight - offset));
      return this.pageHeight - offset;
    }
  },

  mounted: function() {
    this.calculateHeight();
  }
};
</script>

<style scoped>
.finedTitle {
  font-weight: 900;
  text-shadow: 2px 2px #000000;
}

.social-icon {
  font-size: 21px;
  color: white;
}
</style>
