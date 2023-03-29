<template>
  <nav style="background-color:#0B2447;color:white" class="navbar navbar-expand-lg fixed-top">
    <div class="container">
      <div>
        <a class="navbar-brand text-white" href="#">Bookstore</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      </div>
      
      <div class="w-50 mx-auto">
        <div class="input-group">
          <input type="text" v-model="search" class="form-control" placeholder="Search" />
          
          <!-- <Autocomplete
            @input="getItems"
            :results="items"
        ></Autocomplete> -->
          <!-- <router-link :to="{ name: 'ViewProduct', params: { search: search } }"> -->
            <button @click="searchData()" class="btn bg-white" type="submit">
            <i class="fa fa-search" aria-hidden="true"></i>
            </button>
          <!-- </router-link> -->
        </div>
      </div>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link text-white active" aria-current="page" href="#">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/" class="nav-link text-white" href="#">About Us</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/viewproduct" class="nav-link text-white" href="#">Products</router-link>
          </li>
          <li class="nav-item">
            <router-link  to="/login" class="nav-link text-white" href="#">Login</router-link>
          </li>
          <!-- <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Dropdown link
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li> -->
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
// import ViewProduct from '../../views/user/ViewProduct.vue';

export default {
  name: "Navbar",
  
  data(){
    return {
      search:this.$route.query.search,
    }
  },
  methods:{
    searchData(){
        console.log(this.search);
        this.$router.push({
    name: "ViewProduct",
    query: {
      search: this.search
    }
  });
    }
  }
};
</script>
<style>
.navbar-brand{
  font-size:30px !important;
  font-weight:bold;
}
</style>