<template>
  <div class="container-fluid bg-light py-5">
    <Navbar />
    <div class="container py-5">
      <div class="row">
        <div class="col-md-4">
          <img style="height:100%;" :src="book.image && productUrl(book.image)" class="img-fluid img-thumbnail" />
        </div>
        <div class="col-md-8">
          <h1>{{ book.title }}</h1>
          <p>{{ book.title }}</p>
          <hr />
          <h4>ISBN : {{ book.isbn }}</h4>
          <h4>Genre : {{ book.genre }}</h4>
          <p>{{ book.description }}</p>
          <div class="d-flex justify-content-between">
            <p><i class="fa fa-calendar-check-o" aria-hidden="true"></i>
                  {{ book.published }}</p>
            <p><i class="fa fa-user" aria-hidden="true"></i>
                  {{ book.publisher }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/user/Navbar";
export default {
  name: "Product",
  components: {
    Navbar,
  },
  data(){
    return {
        book:{}
    }
  },
  methods: {
    productUrl(prd) {
      console.log('prd',prd);
        let result = prd.startsWith("http");
        if(result){
          return prd;
        }else{
          return this.$store.state.assetUrl + prd;
        }
    },
    index() {
      let vm = this;
      let uri = `books/${vm.$route.params.id}`;
      vm.$store
        .dispatch("get", { uri: uri })
        .then(function (response) {
          console.log("data", response);
          vm.book = response.data.data;
        })
        .catch(function (error) {
          console.log("error:", error);
        });
    },
  },
  mounted() {
    this.index();
  },
};
</script>
