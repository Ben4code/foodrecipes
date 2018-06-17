<template>
    <div v-if="item" class="edit-item container">
        <h2>Edit {{item.title}}</h2>
        
        <form @submit.prevent="EditItem">
            <div class="field title">
                <label for="title">Food Title</label>
                <input type="text" name="title" id="title" v-model="item.title">
            </div>
            <div v-for="(ing, index) in item.ingredents" v-bind:key="index" class="field">
                <label for="ingredent">Ingredent: {{index + 1}}</label>
                <input type="text" name="ingredent" id="ingredent" v-model="item.ingredents[index]">
                <i class="material-icons delete" @click="deleteIng(ing)">delete </i>
            </div>
            <div class="field add-ingredent">
                <label for="add-ingredent">Edit Ingredent <span class="indigo-text"> (Hint: Press Tab key to add another ingredent.)</span></label>
                <input type="text" name="add-ingredent" id="add-ingredent" @keydown.tab.prevent="addIngredent" v-model="another">
            </div>
            <p v-if="feedback" class="red-text center-align">{{feedback}}</p>
            <div class="field center-align">
                <button class="btn pink">Update Recipe</button>
            </div>
        </form>

    </div>
</template>

<script>
import db from '@/firebase/init';
import slugify from 'slugify';

export default {
    name: 'EditItem',
    data(){
        return{
            item: null,
            another: null,
            feedback: null
        }
    },
    created(){
        let ref = db.collection('items').where( 'slug', '==', this.$route.params.item_slug );
        ref.get().then(snapShot=>{
            snapShot.forEach(doc => {
                //console.log(doc.data());
                this.item = doc.data();
                this.item.id = doc.id;
            });
        })
    },
    methods:{
        deleteIng(item){
            this.item.ingredents = this.item.ingredents.filter((ingredent)=>{
                return ingredent != item; 
            });
        },
        EditItem(){
            if(this.item.title != null){
                this.feedback = null;
                //Create a slug with slugify packeage
                this.item.slug = slugify(this.item.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                });
                
                //Send to firebase
                db.collection('items').doc(this.item.id).update({
                    title: this.item.title,
                    ingredents: this.item.ingredents,
                    slug: this.item.slug
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
                this.item.ingredents.push(this.another);
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
.edit-item{
    margin-top: 60px;
    padding: 20px;
    max-width: 500px; 
}
.edit-item h2{
    font-size: 2em;
    margin: 20px auto;
}
.edit-item .field{
    margin: 20px auto;
    position: relative;
}
.edit-item .delete{
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 1.4em;
    cursor: pointer;
}
</style>
