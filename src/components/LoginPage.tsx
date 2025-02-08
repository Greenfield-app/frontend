type LoginPageProps = {
  setCurrentUser: Function; //will use this function to change current user if login successful
  setView: Function;
};

//  (props) temp removed for build
const LoginPage: React.FC<LoginPageProps> = (props) => {
  //
  const submitHandler = async () => {};

  return (
    <>
      {/* container for Title and login form sections */}
      <section className='l-login-container'>
        {/* left side of login-container: Title + small description */}
        <header className='login-title'>
          <h1>WhatsEat</h1>
          <p>
            Hungry but can't decide? <br />
            We've got you!
          </p>
        </header>
        {/* right side of login-container: Form for input feild login credentials */}
        <form className='login-form' onSubmit={submitHandler}>
          <h1>User Login</h1>
          <label htmlFor=''>Username: </label>
          <input type='text' placeholder='username/email' />
          <label htmlFor=''>Password: </label>
          <input type='text' placeholder='password' />
          <button type='submit'>Login</button>
          {/* greyed out link to sign-up page */}
          <small
            className='signup-link'
            onClick={() => props.changeView("createaccount")}
          >
            No Account? Sign up today!
          </small>
        </form>
      </section>
    </>
  );
};

export default LoginPage;
