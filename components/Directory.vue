
<template>

  <!-- this component acts like its own page -->
  <div class="Directory _section-page _margin-center" >
    <!-- <div v-if="!search" class="Directory-intro _section-content" > -->
    <!-- <div class="Directory-intro _section-content" > -->
    <!-- need Directory-nav-container to position: sticky all the way down the document -->
    <div class="Directory-intro _margin-top-3">
      <h1 v-if="!search" class="Directory-name">{{ viewName }} Directory</h1>
      <h1 v-if="search" class="Directory-name">Search: <span class="DirectoryView-search">{{ search }}</span></h1>
    </div>
    <div class="Directory-nav-container ">
      <div class="Directory-nav _flex-row _flex-wrap-xs ">
        <router-link :class="{'--active': view == 'phages'}" to="/phages" class="_button CTA --short --outline _margin-right _margin-bottom-none --nowrap">Phage Hosts</router-link>
        <router-link :class="{'--active': view == 'labs'}" to="/labs" class="_button CTA Btn-outline --short --outline _margin-right _margin-bottom-none">Labs</router-link>
        <input id="searchbar" ref="pageSearch" v-model.trim="search" class="Directory-search _form-input --width-full --short _inline _margin-top-xs" type="text" name="searchbar" placeholder="Search" >
      </div>
    </div>

    <div v-if="!search" class="Directory-description _section-content" >
      <div v-if="view == 'phages'" class="Directory-desc block" v-html="$md.render(phagesText)" />
      <div v-if="view == 'labs'" class="Directory-desc block" v-html="$md.render(labText)" />
    </div>
    <!-- </div> -->

    <div class="Directory-list">
      <DirectoryView :search="search" :view="view" />

      <!-- 
          <div class="DirectoryView phages" v-if="view == 'phages' ">
            <h4 class="DirectoryView-title">{{ view }}</h4>

            <div class="DirectoryView-list">
              <div class="DirectoryView-head phage">
                <div class="DirectoryView-title">Escherichia coli</div>
                <div class="DirectoryView-main-info">
                  Additional info here
                </div>
              </div>

              <div class="DirectoryView-body">
                <div class="DirectoryView-items">
                  <div class="DirectoryView-item">
                    Org Name {
                      Lab name / PI / # phages
                    } 
                  </div>
                </div>
              </div>
            </div>
          </div>
      -->
      <!-- 
          <div class="DirectoryView" v-if="view == 'labs' ">
            <h2 class="Directory-view">{{ view }}</h2>
            Directory search: {{search}} / view: {{view}}
            LABS VIEW
          </div>
      -->
    </div>

  </div>

</template>


<script>

import { mapState } from 'vuex'
import DirectoryView from '~/components/DirectoryView.vue'

export default {

  components: {
    DirectoryView
  },

  data: function () {
    return {
      phagesText: this.$cytosis.find('Content.directory-phages', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      labText: this.$cytosis.find('Content.directory-labs', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
    }
  },

  computed: {
    ...mapState([
      'searchSource',
      // 'test'
      ]),

    view() {
      if(this.$route.name == 'phages' || this.$route.name == 'labs')
        return this.$route.name
      else
        return 'phages'
    },
    viewName() {
      if(this.$route.name == 'phages')
        return 'Phage'

      if(this.$route.name == 'labs')
        return 'Lab'

      return 'Phage'
    },


    search: {
      get: function () {
        // return this.$store.state.test
        return this.$store.state.searchString
      },
      // setter
      set: function (str) {
        const url = `/search/${this.search}`
        this.$store.dispatch('update', {
          searchSource: 'page',
          searchUrl: url
        })

        this.$store.dispatch('update', {searchString: str})
      }
    }
  },

  mounted: async function () {
    // console.log('mounted')
    this.setFocus()
  },
  
  updated: async function () {
    this.setFocus()
  },


  methods: {
    setFocus() {
      this.$nextTick(() => {
        // this.$refs.search.focus()
        if(this.$refs.search) { // might unfocus and unmount the component before tick
          this.$refs.search.focus()
        }
      }) // required bc dispatch updates this component

    }
  }

}
</script>


