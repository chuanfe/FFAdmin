<template>
  <div class="tab-view">
      <ul class="tab-list">
        <router-link @click.native="switchTab(tag)" :to="tag.path" v-for="tag in dynamicTags">
					<el-tag
					:type="isActive(tag.path) ? 'primary':''"
					:key="tag.name"
					:closable="true"
					:close-transition="false"
					@close.stop="closeTabView(tag,$event)"
					>
					{{tag.label}}
					</el-tag>
				</router-link>
        
      </ul>
  </div>
</template>

<script>
import router from '../../router'
export default {
	data () {
		return {
			activeTab:''
		}
	},
  computed: {
      dynamicTags () {
        return this.$store.state.selectedTabs
      }
  },
  methods: {
		  switchTab (tag) {
					this.$store.commit('switchActiveTab',{addr:tag.addr,type:tag.type,label:tag.label,value:tag.name})
			},
      closeTabView (tag, $event) {
				let self = this
				// this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
				this.$store.commit('delVisitedTabs',tag)
				if(self.isActive(tag.path)) {
					let lasttag = self.dynamicTags.slice(-1)[0]
					if(lasttag) {
						self.$store.commit('switchActiveTab',{addr:lasttag.addr,type:lasttag.type,label:lasttag.label})
						
						router.push({ path: lasttag.path })
					} else {
						router.push('/')
					}
				}
				$event.preventDefault()
			},
			isActive(path) {
        return path === this.$route.path
      }
  }
}
</script>

<style lang="less" scoped>
.tab-list {
	margin: 10px;
	padding: 0;
	a {
		margin: 0 5px;
	}
}
</style>


