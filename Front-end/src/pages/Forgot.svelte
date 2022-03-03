<script>
    import axios from "axios";

    let email = "";
    let cls = "";
    let msg = "";

    $: submit = async () => {
        const {status} = await axios.post("forgot", {
            email
        })
        if (status === 200) {
            cls = "success";
            msg = "Please check your email for a reset link.";
        } else {
            cls = "danger";
            msg = "Email not found.";
        }
    }
</script>


<main class="form-signin">
    {#if cls}
        <div class="alert alert-{{cls}}" role="alert">
            {msg}
        </div>
    {/if}

    <form on:submit|preventDefault={submit}>
        <h2 class="h3 mb-3 fw-normal">Please insert email</h2>

        <div class="form-floating">
            <input bind:value={email} type="email" class="form-control" id="floatingInput"
                   placeholder="name@example.com">
            <label>Email address</label>
        </div>

        <button class="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
        <p class="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
    </form>
</main>