import './LandingPage.css';

export const LandingPage = () => {
  return (
    <div className='container'>
      <header>
        <div className='logo'>TaleWeaver</div>
        <nav>
          <a href='/'>Home</a>
          <a href='/create'>Create</a>
          <a href='/library'>My Library</a>
          <a href='/public'>Public Library</a>
          <div className='auth-buttons'>
            <a href='/signin'>Sign In</a>
            <a href='/signup' className='signup'>
              Sign Up
            </a>
          </div>
        </nav>
      </header>

      <main>
        <h1>
          Personalised, <br />
          educational storybooks <br />
          for your kid.
        </h1>
        <p>
          Are you a time-strapped working parent struggling to find quality storytime for your
          child? Say goodbye to the frustration of repetitive bedtime tales and the endless quest
          for the right book. Start weaving your tales today.
        </p>
        <button>Weave Story</button>
      </main>
    </div>
  );
};
