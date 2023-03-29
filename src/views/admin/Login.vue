<template>
  <div class="home">
    <Navbar />
    <section className="login-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center mb-5">
            <h2 className="heading-section" style="color: #fbceb5">
              BookStore
            </h2>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="login-wrap p-0">
              <h3 className="mb-4 text-center text-white">Login Now</h3>
              <form method="post" @submit.prevent="login()" className="signin-form">
                <div className="form-group">
                  <label style="color: #fbceb5">USER NAME</label>
                  <input
                    type="text"
                    v-model="user.username"
                    name="username"
                    className="form-control"
                    placeholder="username"
                    required
                  />
                </div>

                <div className="form-group my-3">
                  <label style="color: #fbceb5">PASSWORD</label>
                  <input
                    v-model="user.password"
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="password"
                    required
                    autoComplete="off"
                  />
                </div>

                <div className="form-group my-3">
                  <button
                    type="submit"
                    className="form-control btn btn-primary submit px-3"
                  >
                    login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import Navbar from "@/components/user/Navbar";
export default {
  name: "Login",
  components: {
    Navbar,
  },
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("admin_login", {
          username: this.user.username,
          password: this.user.password,
        })
        .then(() => {
          this.$router.push({ name: "Book" });
        })
        .catch((err) => {
          alert("Please Enter correct username & Password");
          console.log(err);
        });
    },
  },
};
</script>
<style>
.login-section {
  padding-top: 10%;
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(
      to right,
      rgba(19, 16, 16, 0.6),
      rgba(26, 24, 24, 0.6)
    ),
    url("https://f.hubspotusercontent10.net/hub/491011/hubfs/bookstore-background-books.jpg?length=2000&name=bookstore-background-books.jpg");
  background-size: cover;
}
.btn-add {
  border: 2px solid white;
  background: linear-gradient(to right, rgb(242, 146, 29), rgb(242, 205, 92));
  background-color: rgb(183, 140, 51);
  border: none;
}
.btn-add:hover {
  background: linear-gradient(to right, rgb(242, 205, 92), rgb(242, 146, 29));
  border: none;
}
.btn-cancel {
  border: 2px solid white;
  background: linear-gradient(to right, rgb(43, 52, 103), rgb(43, 52, 103));
  background-color: rgb(183, 140, 51);
  color: white;
  border: none;
}
</style>
