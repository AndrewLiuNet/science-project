<template>
  <div id="app">
    <router-view :key="$route.path"></router-view>
  </div>
</template>

<script>


export default {
  name: "app",
  components: {
    // HelloWorld
  },
  mounted() {
   
    let params={
      account:'admin',
      pwd:'admin888'
    }
     this.$axios.post('/api/yb_userinfo/GetToken',params)
     .then(res=>{
        this.$store.commit('SET_TOKEN',res.data.data.token)
        console.log(res.data.data.token);
     }).catch(error=>{
        console.log(error);
     })

  },
};
</script>
<style>
html,
body {
  padding: 0;
  margin: 0;
}
 ::-webkit-scrollbar {
	/* display:none */
} 
/* ::-webkit-scrollbar-track-piece { 

background-color:#f8f8f8;

}

::-webkit-scrollbar

::-webkit-scrollbar-thumb

::-webkit-scrollbar-thumb:hover {

background-color:#bbb;

} */
/* html {
    scrollbar-width: none;
} */
</style>
