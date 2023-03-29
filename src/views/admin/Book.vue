<template>
  <div class="wrapper">
    <Sidebar />
    <!-- Page Content  -->
    <div id="content">
      <Topbar />
      <div class="card">
        <div class="card-header d-flex justify-content-between">
          <h2 class="float-left">Book Details</h2>
          <button @click="addBookModal = true" class="mb-2 btn btn-primary">
            Add Product
          </button>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Sl</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>ISBN</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(book, index) in books" :key="book.book_id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ book.title }}</td>
                  <td>{{ book.author }}</td>
                  <td>{{ book.isbn }} </td>
                  <td>
                    <img
                      style="width: 200px; height: 200px"
                      :src="book.image && productUrl(book.image)"
                      class="img-fluid img-thumbnail"
                    />
                  </td>
                  <td>
                    <a
                      @click="
                        editBookModal = true;
                        setBook(book);
                      "
                      class="btn btn-info action-btn edit-btn m-1"
                      ><i class="fa fa-edit"></i
                    ></a>
                    <a
                      @click="
                        viewBookModal = true;
                        setBook(book);
                      "
                      class="btn btn-warning action-btn edit-btn m-1"
                      ><i class="fa fa-eye"></i
                    ></a>
                    <a
                      @click="
                        deleteBookModal = true;
                        setBook(book);
                      "
                      class="btn action-btn btn-danger delete-btn m-1"
                      ><i class="fa fa-trash"></i
                    ></a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Pagination
              class="float-right"
              :maxPage="meta.maxPage"
              :totalPages="meta.lastPage"
              :currentPage="meta.currentPage"
              @pagechanged="onPageChange"
            />

          <!---------------- Add Modal --------------->
          <div id="overlay" v-if="addBookModal">
            <div class="modal-dialog">
              <div class="modal-content">
                <form
                  method="post"
                  @submit.prevent="addBook"
                  enctype="multipart/form-data"
                >
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Add Book</h5>
                    <button
                      type="button"
                      class="btn-close btn-primary p-2"
                      @click="addBookModal = false"
                      aria-label="Close"
                    ></button>
                  </div>
                  <hr/>
                  <div class="modal-body">
                    <div class="row mb-3">
                      <div class="col-sm-12">
                        <label for="inputPname3" class="col-form-label"
                          ><b>Title :</b></label
                        >
                        <input
                          type="text"
                          class="form-control"
                          v-model="books.title"
                          placeholder="Title"
                          required
                        />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-sm-12">
                        <label for="inputPname3" class="col-form-label"
                          ><b>Product Image :</b></label
                        >
                        <input
                          type="file"
                          class="form-control"
                          @change="upload_product_img"
                          required
                        />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-sm-12">
                        <label for="inputPname3" class="col-form-label"
                          ><b>Author :</b></label
                        >
                        <input
                          type="text"
                          class="form-control"
                          v-model="books.author"
                          placeholder="Author"
                          required
                        />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-sm-12">
                        <label for="inputPname3" class="col-form-label"
                          ><b>ISBN :</b></label
                        >
                        <input
                          type="text"
                          class="form-control"
                          step="any"
                          v-model="books.isbn"
                          placeholder="ISBN"
                          required
                        />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-sm-12">
                        <label for="inputPname3" class="col-form-label"
                          ><b>Genre :</b></label
                        >
                        <input
                          type="text"
                          class="form-control"
                          v-model="books.genre"
                          placeholder="Genre"
                          required
                        />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-sm-12">
                        <label for="inputPname3" class="col-form-label"
                          ><b>Published Date :</b></label
                        >
                        <input
                          type="date"
                          class="form-control"
                          v-model="books.published"
                          placeholder="Published Date"
                          required
                        />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-sm-12">
                        <label for="inputPname3" class="col-form-label"
                          ><b>Publisher :</b></label
                        >
                        <input
                          type="text"
                          class="form-control"
                          v-model="books.publisher"
                          placeholder="Publisher"
                          required
                        />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-sm-12">
                        <label for="inputPname3" class="col-form-label"
                          ><b>Description :</b></label
                        >
                        <textarea
                          class="form-control"
                          v-model="books.description"
                          required
                        >
                        </textarea>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary m-1"
                      @click="addBookModal = false"
                    >
                      Cancel
                    </button>
                    <button type="submit" class="btn btn-primary m-1">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <!---------------- Edit Modal --------------->
          <div id="overlay" v-if="editBookModal">
            <div class="modal-dialog">
              <div class="modal-content">
                <form
                  method="post"
                  @submit.prevent="updateBook"
                  enctype="multipart/form-data"
                >
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Update Book
                    </h5>
                    <button
                      type="button"
                      class="btn-close btn-primary p-2"
                      @click="editBookModal = false"
                      aria-label="Close"
                    ></button>
                  </div>
                  <hr />
                  <div class="modal-body">
                    <div class="row mb-3">
                      <div class="col-sm-12">
                        <label for="inputPname3" class="col-form-label"
                          ><b>Title :</b></label
                        >
                        <input
                          type="text"
                          class="form-control"
                          v-model="current_book.title"
                          placeholder="Title"
                          required
                        />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-sm-12">
                        <label for="inputPname3" class="col-form-label"
                          ><b>Product Image :</b></label
                        >
                        <input
                          type="file"
                          class="form-control"
                          @change="updateImage"
                          ref="file"
                          required
                        />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-sm-12">
                        <label for="inputPname3" class="col-form-label"
                          ><b>Author :</b></label
                        >
                        <input
                          type="text"
                          class="form-control"
                          v-model="current_book.author"
                          placeholder="Author"
                          required
                        />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-sm-12">
                        <label for="inputPname3" class="col-form-label"
                          ><b>ISBN :</b></label
                        >
                        <input
                          type="text"
                          class="form-control"
                          step="any"
                          v-model="current_book.isbn"
                          placeholder="ISBN"
                          required
                        />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-sm-12">
                        <label for="inputPname3" class="col-form-label"
                          ><b>Genre :</b></label
                        >
                        <input
                          type="text"
                          class="form-control"
                          v-model="current_book.genre"
                          placeholder="Genre"
                          required
                        />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-sm-12">
                        <label for="inputPname3" class="col-form-label"
                          ><b>Published Date :</b></label
                        >
                        <input
                          type="date"
                          class="form-control"
                          v-model="current_book.published"
                          placeholder="Published Date"
                          required
                        />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-sm-12">
                        <label for="inputPname3" class="col-form-label"
                          ><b>Publisher :</b></label
                        >
                        <input
                          type="text"
                          class="form-control"
                          v-model="current_book.publisher"
                          placeholder="Publisher"
                          required
                        />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-sm-12">
                        <label for="inputPname3" class="col-form-label"
                          ><b>Description :</b></label
                        >
                        <textarea
                          class="form-control"
                          v-model="current_book.description"
                          placeholder="Description"
                          required
                        >
                        </textarea>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary m-1"
                      @click="editBookModal = false"
                    >
                      Cancel
                    </button>
                    <button type="submit" class="btn btn-primary m-1">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <!--------------------- Delete Product Model ----------------------->
          <div id="overlay" v-if="deleteBookModal">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Delete Book</h5>
                  <button
                    type="button"
                    @click="deleteBookModal = false"
                    class="close btn btn-danger"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body p-4">
                  <h4>Are you sure you want to delete this Book ?</h4>
                  <h5></h5>
                  <hr />
                  <button
                    @click="
                      deleteBookModal = false;
                      deleteBook();
                    "
                    class="btn btn-danger btn-lg m-1"
                  >
                    Yes
                  </button>
                  <button
                    @click="deleteBookModal = false"
                    class="btn btn-success btn-lg m-1"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!----------- End Delete Model ------------->
          <!----------- View Product Model ------------>
          <div id="overlay" v-if="viewBookModal">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">View Book</h5>
                  <button
                    type="button"
                    @click="viewBookModal = false"
                    class="close btn btn-info"
                  ><span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <hr/>
                <div class="modal-body p-4">
                  <div class="row mb-3">
                    <div class="col-sm-12">
                      
                        <p><b>Title :</b> {{current_book.title}}</p>
                    </div>
                  </div>
                  
                  <div class="row mb-3">
                    <div class="col-sm-12">
                      <p><b>Author : </b> {{current_book.author}}</p>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-sm-12">
                      <p><b>ISBN : </b> {{current_book.isbn}}</p>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-sm-12">
                      <p><b>Genre :</b>{{ current_book.genre }}</p>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-sm-12">
                      <p><b>Published Date :</b>{{ current_book.published }}</p>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-sm-12">
                      <p><b>Publisher : </b> {{current_book.publisher}}</p>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-sm-12">
                      <p><b>Description :</b> {{current_book.description}} </p>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-sm-12">
                        <p>Image</p>
                        <img :src="this.$store.state.assetUrl + current_book.image" class="img-fluid"/>
                    </div>
                  </div>
                  <button
                    @click="viewBookModal = false"
                    class="btn btn-success btn-lg m-1"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!--------------- End View Model ----------------->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";
import Pagination from '@/components/user/Pagination'
export default {
  name: "Product",
  components: {
    Sidebar,
    Topbar,
    Pagination
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
      addBookModal: false,
      editBookModal: false,
      deleteBookModal: false,
      viewBookModal:false,
      current_book: {},
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
    upload_product_img(ee) {
      const file = ee.target.files[0];
      if (!file) {
        return false;
      }
      if (!file.type.match("image.*")) {
        return false;
      }
      const reader = new FileReader();
      reader.onload = function () {};
      reader.readAsDataURL(file);
      this.books.image = ee.target.files[0];
      console.log(this.books.image);
    },
    updateImage() {
      let vm = this;
      let reader = new FileReader();
      reader.readAsDataURL(this.$refs.file.files[0]);
      reader.onload = function (e) {
        vm.current_book.image = e.target.result;
      };
    },
    addBook() {
      let vm = this;
      let formData = new FormData();
      formData.append("title", vm.books.title);
      formData.append("author", vm.books.author);
      formData.append("image", vm.books.image);
      formData.append("genre", vm.books.genre);
      formData.append("description", vm.books.description);
      formData.append("isbn", vm.books.isbn);
      formData.append("published", vm.books.published);
      formData.append("publisher", vm.books.publisher);
      let uri = { uri: "books", data: formData };
      vm.$store
        .dispatch("post", uri)
        .then(function (response) {
            vm.books.title = "",
            vm.books.author = "",
            vm.books.image = "",
            vm.books.genre = "",
            vm.books.description = "",
            vm.books.isbn = "",
            vm.books.published = "",
            vm.books.publisher = "",
            console.log(response);
            vm.addBookModal = false;
            vm.addBookModal = false;
            vm.index();
        })
        .catch(function (error){
          console.log(error);
        });
    },
    index() {
      let vm = this;
      let uri = `books?page=${vm.meta.currentPage}&per_page=${vm.meta.per_page}`;
      vm.$store
        .dispatch("get", { uri: uri })
        .then(function (response) {
          console.log("data", response.data.data);
          vm.books = response.data.data;
          vm.meta.totalRows = response.data.meta.total;
          vm.meta.per_page = response.data.meta.per_page;
          vm.meta.lastPage = response.data.meta.last_page;
          vm.meta.from = response.data.meta.from;
          vm.meta.maxPage = vm.meta.lastPage >= 3 ? 3 : vm.meta.lastPage;
        })
        .catch(function (error) {
          console.log("error:", error);
        });
    },
    setBook(book) {
      this.current_book = book;
    },
    updateBook() {
      let vm = this;
      let uri = {
        uri: "books/" + vm.current_book.book_id,
        data: vm.current_book,
      };
      vm.$store
        .dispatch("patch", uri)
        .then(function (response) {
          vm.editBookModal = false;
          console.log("updated", response);
          vm.index();
        })
        .catch((error) => {
          console.log("ERROR", error);
        });
    },
    deleteBook() {
      let vm = this;
      let uri = "books/" + this.current_book.book_id;
      vm.$store
        .dispatch("delete", { uri: uri })
        .then(function (response) {
          console.log(response.data);
          vm.index();
        })
        .catch(function (error) {
          console.log("Error", error);
        });
    },
  },
  mounted() {
    if(!localStorage.getItem('admin_id')){
          this.$router.push({ name: 'Login' })
    }else{
          this.index();
    }
    this.index();
  },
};
</script>
<style>
#content {
  width: 100%;
  padding: 20px;
  min-height: 100vh;
  transition: all 0.3s;
}
/* =============== My Style Sheet ================= */
#overlay {
  z-index: 99999;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
}
.modal-dialog {
  overflow-y: initial !important;
  width: 50% !important;
  background: white;
  padding: 20px;
  color:black;
}
.modal-body {
  max-height: calc(100vh - 200px);
  overflow-y: auto;
}
.modal-dialog1 {
  max-width: 50%;
}
@media screen and (max-width: 780px) {
  .modal-dialog1 {
    max-width: 90%;
  }
}
</style>
