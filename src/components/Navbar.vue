<template>
    <div class="navbar">
        <nav class="nav-extended indigo darken-2">
            <div class="nav-wrapper">
                <router-link :to="{name: 'Index'}">
                    <span class="brand-logo">Food Recipes</span>
                </router-link>
                
                <ul class="right lis">
                    <li><router-link :to="{name: 'Index'}"><i class="material-icons">home</i>
                    </router-link></li>
                    
                </ul>
                
                <a href="" class="btn-floating btn-large halfway-fab pink"><router-link :to="{name: 'AddItem'}">
                    <i class="material-icons">add</i>
                    </router-link></a>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'Navbar',
    data(){
        return{
            
        }
    }
}
</script>
<style>
.navbar nav{
    padding: 5px 50px;
    
}
.lis{
    margin-right: 200px;
}

</style>
