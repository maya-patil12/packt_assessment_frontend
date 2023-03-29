<template>
  <div class="home">
    <Navbar />
    <div
      style="background-position: center;background-size: cover;
        height: 70vh;
        background-repeat: no-repeat;
        background-image: url('https://neatplaces.co.nz/cdn-cgi/image/height=630,format=auto,fit=cover,width=1200//media/uploads/places/place/dead_souls_bookshop/Dead_Souls_Bookshop_Dunedin_3.jpg');
      "
      class="container-fluid"
    ></div>
    <div class="container-fluid book-container py-5">
      <div class="row">
        <div v-for="book in books" :key="book.book_id" class="col-md-4">
          <div class="book-list my-4">
            <div class="row">
              <div class="col-md-5 col-5">
                <img
                  :src="book.image && productUrl(book.image)"
                  class="img-fluid"
                />
              </div>
              <div class="col-md-7 col-7">
                <h2>{{ book.title }}</h2>
                <h5>({{ book.author }})</h5>
                <hr />
                <p>
                  <i class="fa fa-calendar-check-o" aria-hidden="true"></i>
                  {{ book.published }}
                </p>
                <router-link :to="'/productinfo/'+book.book_id"><button class="btn btn-success">Read More</button></router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Pagination
        class="float-right"
        :maxPage="meta.maxPage"
        :totalPages="meta.lastPage"
        :currentPage="meta.currentPage"
        @pagechanged="onPageChange"
      />
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import Navbar from "@/components/user/Navbar";
import Pagination from "@/components/user/Pagination";
export default {
  name: "Home",
  components: {
    Navbar,
    Pagination,
  },
  data() {
    return {
      books: {
        title: "",
        author: "",
        genre: "",
        description: "",
        isbn: "",
        image: "",
        published: "",
        publisher: "",
      },
      search: "",
      meta: {
        per_page: 10,
        totalRows: 0,
        currentPage: 1,
        lastPage: 1,
        from: 1,
        maxPage: 1,
      },
    };
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
    onPageChange(page) {
      console.log(page);
      this.meta.currentPage = page;
      this.index();
    },
    dataPerPageChange(value) {
      this.meta.per_page = value;
      this.index();
      console.log(this.meta.per_page);
    },
    index() {
      let vm = this;
      let uri =
        "books?page=" + vm.meta.currentPage + "&per_page=" + vm.meta.per_page;
      this.$store
        .dispatch("get", { uri: uri })
        .then(function (response) {
          vm.books = response.data.data;
          console.log(response.data);
          vm.meta.totalRows = response.data.meta.total;
          vm.meta.per_page = response.data.meta.per_page;
          vm.meta.lastPage = response.data.meta.last_page;
          vm.meta.from = response.data.meta.from;
          vm.meta.maxPage = vm.meta.lastPage >= 3 ? 3 : vm.meta.lastPage;
        })
        .catch(function (error) {
          console.log("Error:", error);
        });
    },
  },
  mounted() {
    this.index();
  },
};
</script>
<style>
.book-container {
  background-color: #e4dccf;
  padding: 20px 100px;
}
.book-list {
  border-radius: 10px;
  padding: 10px;
  background-color: white;
}
.book-list img {
  margin-top: -40px;
  background: #fff;
  border: 1px solid grey;
}
.book-list:hover {
  cursor: pointer;
}
</style>
