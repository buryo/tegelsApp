@if (Request::path() != 'dashboard')
<div class="container" id="navbar">
    <a href={{ route('welcome') }}>
        <img src="images/windesheim-flevoland.png"  class="logo">
    </a>
    
    <nav>
        <ul>
            <!--If user is NOT logged in, the following list elements will be displayed in the navbar-->
            @guest()
            <li><a id="login-button" onclick="document.getElementById('id01').style.display='block'" style="width:auto;" href="#">Inloggen</a></li>

            <div id="id01" class="modal">

                <form class="modal-content animate" method="post" action="{{ route('login') }}">
                    @csrf
                    <!--Modal Picture-->
                    <div class="imgcontainer">
                        <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">&times;</span>
                        <img src="images/profile-icon.png" alt="Avatar" class="avatar">
                    </div>
                    <!--Input fields-->
                    <div class="login-modal container">
                        <label for="uname"><b>Email Adres:</b></label>
                        <input 
                            id="email" 
                            type="email"
                            class="form-control @if ($errors->has('email') && Session::get('last_auth_attempt') == 'login') is-invalid @endif" 
                            name="email" 
                            value="{{ old('email') }}" 
                            required 
                            autocomplete="email" 
                            placeholder="eg. s123456@student.windesheim.nl" 
                            autofocus
                        >

                        @if ($errors->has('email') && Session::get('last_auth_attempt') == 'login')
                        @error('email')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                        @enderror
                        @endif


                        <label id="password" for="psw"><b>Password:</b></label>
                        <input id="password" type="password" class="form-control 
                            @if ($errors->has('password') && Session::get('last_auth_attempt') == 'login') is-invalid @endif" 
                            name="password" 
                            required 
                            autocomplete="current-password" 
                            placeholder="eg. geheim123#"
                        >

                        @if ($errors->has('password') && Session::get('last_auth_attempt') == 'login')
                        @error('password')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                        @enderror
                        @endif

                        <button type="submit" class="btn-confirm">
                            {{ __('Login') }}
                        </button>
                        <label>
                            <input type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>Onthoudt mij
                        </label>
                    </div>

                    <div class="container modal-bottom">
                        <button type="button" onclick="document.getElementById('id01').style.display='none'" class="cancelbtn btn-cancel">Annuleer</button>
                    </div>
                </form>
            </div>

            <!--registratie-modal-->
            <li><a id="registerButton" onclick="document.getElementById('id02').style.display='block'" style="width:auto;" href="#">Registreren</a></li>

            <div id="id02" class="modal">

                <form class="modal-content animate" method="POST" action="{{ route('register') }}">
                @csrf
                <!--Modal Picture-->
                    <div class="imgcontainer">
                        <span onclick="document.getElementById('id02').style.display='none'" class="close" title="Close Modal">&times;</span>
                        <img src="images/register-icon.png" alt="Avatar" class="avatar">
                    </div>
                    <!--Input fields-->
                    <div class="register-modal container">

                        <!--First Name Input-->
                        <label for="firstname">Voornaam</label>
                        <input id="firstname" type="text" class="form-control @error('firstname') is-invalid @enderror" name="firstname" value="{{ old('firstname') }}" required autocomplete="firstname" autofocus>
                        @error('firstname')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                        @enderror
                        <!--Last Name Input-->
                        <label for="lastname">Achternaam</label>
                        <input id="lastname" type="text" class="form-control @error('lastname') is-invalid @enderror" name="lastname" value="{{ old('lastname') }}" required autocomplete="lastname" autofocus>
                        @error('lastname')
                        <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                        @enderror

                        <!--Student_number Input-->
                        <label for="student_number">Studentnummer</label>
                        <input id="student_number" type="text" class="form-control @error('student_number') is-invalid @enderror" name="student_number" value="{{ old('student_number') }}" required autocomplete="student_number" autofocus>
                        @error('student_number')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                        @enderror

                        <!--email input-->
                        <label for="email">Email</label>
                        <input 
                            id="email" 
                            type="email" 
                            class="form-control @if ($errors->has('password') && Session::get('last_auth_attempt') == 'register') is-invalid @endif" 
                            name="email" value=" @if (Session::get('last_auth_attempt') == 'register') {{ old('email') }} @endif" 
                            required 
                            autocomplete="email"
                        >

                        @if (Session::get('last_auth_attempt') == 'register')
                            @error('email')
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                            @enderror
                        @endif

                        <!--password input-->
                        <label for="password">Wachtwoord</label>
                        <input 
                            id="password" 
                            type="password" 
                            class="form-control @error('password') is-invalid @enderror" 
                            name="password" 
                            required 
                            autocomplete="new-password"
                        >

                        @error('password')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                        @enderror

                        <!--confirm password input-->
                        <label for="password-confirm">Bevestig wachtwoord</label>
                        <input 
                            id="password-confirm" 
                            type="password" 
                            class="form-control" 
                            name="password_confirmation" 
                            required 
                            autocomplete="new-password"
                        >

                        <!--submit button-->
                        <button type="submit" class="btn-confirm">
                            Registreer
                        </button>
                        <!--remember me button-->
                        <label>
                            <input type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}> Onthoudt mij
                        </label>
                    </div>

                    <div class="container modal-bottom">
                        <button type="button" onclick="document.getElementById('id02').style.display='none'" class="cancelbtn btn-cancel">Annuleer</button>
{{--                        <span class="psw">Wachtwoord <a href="#">Vergeten?</a></span>--}}
                    </div>
                </form>
            </div>


            <script>
                // Get the modal
                var LoginModal = document.getElementById('id01');
                var RegisterModal = document.getElementById('id02');


                // When the user clicks anywhere outside of the modal, close it
                window.onclick = function(event) {
                    if (event.target === LoginModal || event.target === RegisterModal) {
                        LoginModal.style.display = "none";
                        RegisterModal.style.display = "none";
                    }
                }

            </script>
        @endguest

            <!--if user is logged in the following navbar will be rendered.-->
         @auth()
                <li><a href="{{ route('dashboard') }}">Dashboard</a> </li>
                <li><a href="{{ url('/logout') }}">Uitloggen</a></li>
         @endauth
        </ul>
    </nav>
</div>
@else <!-- Dashboard menu -->
    
@endif


