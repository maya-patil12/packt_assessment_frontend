<template>
  <Navbar />
  <div style="background-color: #bad7e9;height:100%;min-height: 100vh;" class="container-fluid mt-5 pt-1">
    <div class="row">
      <div
        class="col-md-3 p-4 fixed-sidebar" style="width:300px;"
      >
        <h2>Filter By</h2>
        <br/>
        <label class="fw-bold">Published Date</label>
        <select v-model="searchparams.publishdate" @change="filterChange($event,'published')" class="form-control my-2">
          <option value="">Select</option>
          <option
            v-for="(date,index) in published"
            :key="index"
            :value="date"
          >
            {{ publishYear(date) }}
          </option>
        </select>
        <label class="fw-bold">Author</label>
        <select v-model="searchparams.author" @change="filterChange($event,'author')" class="form-control my-2">
          <option value="">Select</option>
          <option
            v-for="(auth,index) in author"
            :key="index"
            :value="auth"
          >
            {{ auth }}
          </option>
        </select>
        <label class="fw-bold">ISBN</label>
        <select v-model="searchparams.isbn" @change="filterChange($event,'isbn')" class="form-control my-2">
          <option value="">Select</option>
          <option v-for="book in books" :key="book.book_id" :value="book.isbn">
            {{ book.isbn }}
          </option>
        </select>
        <label class="fw-bold">Genre</label>
        <select v-model="searchparams.genre" @change="filterChange($event,'genre')" class="form-control my-2">
          <option value="">Select</option>
          <option v-for="book in books" :key="book.book_id" :value="book.genre">
            {{ book.genre }}
          </option>
        </select>
      </div>
      <div style="position:relative;margin-left:300px" class="col-md-9 py-5">
        <div class="row">
          <div v-for="book in books" :key="book.book_id" class="col-md-4">
            <router-link style="text-decoration:none;color:#000" :to="'productinfo/'+book.book_id"><div class="book-list my-4">
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
                  <hr/>
                  <p>
                    <i class="fa fa-calendar-check-o" aria-hidden="true"></i>
                    {{ book.published }}
                  </p>
                </div>
              </div>
            </div>
          </router-link>
          </div>
        </div>
        <hr/>
        <div class="justify-content-center">
            <Pagination
              class="float-right"
              :maxPage="meta.maxPage"
              :totalPages="meta.lastPage"
              :currentPage="meta.currentPage"
              @pagechanged="onPageChange"
            />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/user/Navbar";
import Pagination from '@/components/user/Pagination'
export default {
  name: "ViewProduct",
  components: {
    Navbar,
    Pagination
  },
  data() {
    return {
      books:[ {
        title: "",
        author: "",
        genre: "",
        description: "",
        isbn: "",
        image: "",
        published: "",
        publisher: "",
      }],
      published:[],
      author:[],
      searchparams: {
        publishdate:'',
        author: "",
        genre: "",
        isbn: "",
      },
      searchtype:'',
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
  computed: {
    publishYear() {
      return (v) => {
        var date=new Date(v);
        var year=date.getFullYear();
        console.log('pp',v);
        return year;
      };
    },
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
    index(filterType) {
      let vm = this;
      var search=this.$route.query.search ? this.$route.query.search : ''
      let uri = `books?search=${search}&published=${vm.searchparams.publishdate}&author=${vm.searchparams.author}&genre=${vm.searchparams.genre}&isbn=${vm.searchparams.isbn}&page=${vm.meta.currentPage}&per_page=${vm.meta.per_page}`;
      console.log('filter',uri);
      vm.$store
        .dispatch("get", { uri: uri })
        .then(function (response) {
          console.log("data", response);
          vm.books = response.data.data;
          vm.meta.totalRows = response.data.meta.total;
          vm.meta.per_page = response.data.meta.per_page;
          vm.meta.lastPage = response.data.meta.last_page;
          vm.meta.from = response.data.meta.from;
          vm.meta.maxPage = vm.meta.lastPage >= 3 ? 3 : vm.meta.lastPage;
          if(filterType=='published'){
            if(vm.searchparams.author==''){
              vm.author=[];
            }
            if(vm.searchparams.isbn==''){
              vm.isbn=[];
            }
            if(vm.searchparams.genre==''){
              vm.genre=[];
            }
            vm.books.forEach((book)=>{
              vm.author.push(book.author);
              vm.isbn.push(book.isbn);
              vm.genre.push(book.genre);
            })
          }
          if(filterType=='author'){
            console.log('public',vm.searchparams.publishdate);
            if(vm.searchparams.publishdate==''){
              vm.published=[];
            }
            if(vm.searchparams.isbn==''){
              vm.isbn=[];
            }
            if(vm.searchparams.genre==''){
              vm.genre=[];
            }
            vm.books.forEach((book)=>{
              vm.published.push(book.published);
              vm.isbn.push(book.isbn);
              vm.genre.push(book.genre);
            })
          }
          if(filterType=='isbn'){
            console.log('public',vm.searchparams.publishdate);
            if(vm.searchparams.publishdate==''){
              vm.published=[];
            }
            if(vm.searchparams.author==''){
              vm.author=[];
            }
            if(vm.searchparams.genre==''){
              vm.genre=[];
            }
            vm.books.forEach((book)=>{
              vm.published.push(book.published);
              vm.author.push(book.author);
              vm.genre.push(book.genre);
            })
          }
          if(filterType=='genre'){
            console.log('public',vm.searchparams.publishdate);
            if(vm.searchparams.publishdate==''){
              vm.published=[];
            }
            if(vm.searchparams.author==''){
              vm.author=[];
            }
            if(vm.searchparams.isnb==''){
              vm.isnb=[];
            }
            vm.books.forEach((book)=>{
              vm.published.push(book.published);
              vm.author.push(book.author);
              vm.isbn.push(book.isbn);
            })
          }
        })
        .catch(function (error) {
          console.log("error:", error);
        });
    },
    filterChange(e,filterType){
      this.index(filterType);
    }
  },
  mounted() {
    this.index('all');
    setTimeout(()=>{
      this.books.forEach((book)=>{
      console.log('b',book);
      this.published.push(book.published);
      this.author.push(book.author);
    }); 
    },1000)
  },
};
</script>
<style>
.fixed-sidebar{
  height: 100vh; 
  background-color: #fcffe7;
  position:fixed;
}
@media screen and (max-width:768px){
  .fixed-sidebar{
    position:static;
  }
}
</style>
