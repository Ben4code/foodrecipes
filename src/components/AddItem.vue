<template>
    <div class="add-item container">
        <h2 class="center-align indigo-text">Add New Food Item</h2>
        <form @submit.prevent="addItem">
            <div class="field title">
                <label for="title">Food Title</label>
                <input type="text" name="title" id="title" v-model="title">
            </div>
            <div v-for="(ing, index) in ingredents" v-bind:key="index" class="field">
                <label for="ingredent">Ingredent: {{index + 1}}</label>
                <input type="text" name="ingredent" id="ingredent" v-model="ingredents[index]">
                <i class="material-icons delete" @click="deleteIng(ing)">delete </i>
            </div>
            <div class="field add-ingredent">
                <label for="add-ingredent">Add Ingredent <span class="indigo-text">(Hint: Press Tab key to add another ingredent.)</span></label>
                <input type="text" name="add-ingredent" id="add-ingredent" @keydown.tab.prevent="addIngredent" v-model="another">
            </div>
            <p v-if="feedback" class="red-text center-align">{{feedback}}</p>
            <div class="field center-align">
                <button class="btn pink">Add Item</button>
            </div>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init';
import slugify from 'slugify';

export default {
    name: 'AddItem',
    data(){
        return {
            title: null,
            another: null,
            ingredents: [],
            feedback: null,
            slug: null,

        }
    },
    methods:{
        deleteIng(item){
            this.ingredents = this.ingredents.filter((ingredent)=>{
                return ingredent != item; 
            });
        },
        addItem(){
            if(this.title != null){
                this.feedback = null;
                //Create a slug with slugify packeage
                this.slug = slugify(this.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                });
                
                //Send to firebase
                db.collection('items').add({
                    title: this.title,
                    ingredents: this.ingredents,
                    slug: this.slug
                }).then(()=>{
                    this.$router.push({name: 'Index'})
                }).catch(err=>{
                    console.log(err);
                });

            }else{
                this.feedback = "You must enter a food title";
            }
            //console.log(this.title, this.ingredents);
        },
        addIngredent(){
            if(this.another != null){
                this.ingredents.push(this.another);
                this.another =null;
                this.feedback = null
            }else{
                this.feedback = "You must add an ingredent.";
            }
        }
    }
}
</script>

<style>
.add-item{
    margin-top: 60px;
    padding: 20px;
    max-width: 500px; 
}
.add-item h2{
    font-size: 2em;
    margin: 20px auto;
}
.add-item .field{
    margin: 20px auto;
    position: relative;
}
.add-item .delete{
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 1.4em;
    cursor: pointer;
}
</style>
