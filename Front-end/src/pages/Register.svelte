<script>
    import axios from "axios";
    import push from "svelte-spa-router";

    let first_name='';
    let last_name='';
    let email='';
    let password='';
    let confirm_password='';

    $: submit = async()=> {
        await axios.post('http://localhost:8000/api/v1/users/register', {first_name, last_name, email, password, confirm_password});

        await push('/login');
    }
</script>

<main class="form-signin">
    <form on:submit|preventDefault={{submit}}>
        <h1 class="h3 mb-3 fw-normal">Please register</h1>

        <div class="form-floating">
            <input bind:value={first_name} class="form-control"  placeholder="First name">
            <label >First name</label>
        </div>

        <div class="form-floating">
            <input bind:value={last_name}   class="form-control"  placeholder="Last name">
            <label >Last name</label>
        </div>

        <div class="form-floating">
            <input bind:value={email} type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
            <label >Email address</label>
        </div>

        <div class="form-floating">
            <input bind:value={password}  type="password" class="form-control" id="floatingPassword" placeholder="Password">
            <label for="floatingPassword">Password</label>
        </div>

        <div class="form-floating">
            <input bind:value={confirm_password}  type="password" class="form-control" placeholder="Password Confirm">
            <label for="floatingPassword">Password confirm</label>
        </div>
        <button class="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
        <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
    </form>
</main>