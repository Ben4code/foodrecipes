<template>
  <div class="index container">
    <div class="card" v-for="item in items" v-bind:key="item.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteItem(item.id)">delete</i>
        <h2 class="indigo-text">{{item.title}}</h2>
        <ul class="ingredents">
          <li v-for="(ingredent, index) in item.ingredents" v-bind:key="index">
            <span class="chip">{{ingredent}}</span>
          </li>
          
        </ul>
      </div>
      <span class=" btn-floating btn-large halfway-fab pink">
        <router-link :to="{name: 'EditItem', params: {item_slug: item.slug}}">
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init';

export default {
  name: 'Index',
  data () {
    return {
      // items: [
      //   {title: 'Jellof Rice', slug: 'jellof-rice', ingredents: ['rice', 'red oil', 'spice', 'meat'], id: 1},
        
      //   {title: 'Egusi Soup', slug: 'egusi-soup', ingredents: ['melon seed', 'red oil', 'spice', 'meat', 'melon leaves'], id: 2},
      // ],
      items: []
    }
  },
  methods: {
   
    deleteItem(id){
      // this.items = this.items.filter((item)=>{
      //    return item.id != id;
      // });
      
      //Delete doc from firestore
      db.collection('items').doc(id).delete().then(()=>{
          this.items = this.items.filter((item)=>{
            //return true if ....
            return item.id != id;
          })
      });
    },
    editItem(slug){
      this.$router.push({name: 'EditItem', params: {item_slug: slug}})
    }
  },
  created(){
    //fetch data from firestore
    db.collection('items').get().then(snapShot => {
      snapShot.forEach(doc => {
      let item = doc.data()
      item.id = doc.id
      this.items.push(item)
      // console.log(doc.data())  
      });
    }).catch(err=>{
      console.log(err)
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.index{
display: grid;
grid-template-columns: 1fr 1fr 1fr;
grid-gap: 30px;
margin-top: 60px;
}
.index h2{
  font-size: 1.8em;
  text-align: center;
  margin-top: 0px;
}
.ingridents{
  margin: 30px auto;
}
.index .ingredents li{
  display: inline-block;
}
.index .delete{
  position: absolute;
  top: 4px;
  right: 4px; 
  cursor: pointer;
  color: #aaa;
  font-size:1.4em;
}
</style>
