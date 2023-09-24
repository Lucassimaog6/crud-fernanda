<script>
  import { Router, Route } from "svelte-routing";
  import Login from "./Pages/Login.svelte";
  import Register from "./Pages/Register.svelte";
  import Home from "./Pages/Home.svelte";
</script>

<Router>
  <Route path="/" component={Login} />
  <Route path="/register" component={Register} />
  <Route path="/home" component={Home} />
</Router>
