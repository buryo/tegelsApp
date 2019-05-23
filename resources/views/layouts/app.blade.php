<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="Voortgang applicatie van de AD ondernemen op Windesheim Flevoland">
        <meta name="keywords" content="AD Ondernemen, Windesheim, Voortgang, App, Applicatie,">
        <meta name="author" content="Team 09 - ADSD Windesheim Flevoland">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <!--All imported google fonts and style sheets-->
        <link href="https://fonts.googleapis.com/css?family=Karla|Rubik" rel="stylesheet">

        <!--importing stylesheets-->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link href="{{ asset('css/app.css') }}" rel="stylesheet" type="text/css" >
        @if(Request::path() != 'dashboard') <link href="{{ asset('css/navbar.css') }}" rel="stylesheet" type="text/css" > @endif
        @if(Request::path() == 'dashboard') <link href="{{ asset('css/dashboard.css') }}" rel="stylesheet" type="text/css" > @endif
        <link href="{{ asset('css/footer.css') }}" rel="stylesheet" type="text/css" >
        <!--importing fontawesome icons-->
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">

        <title>@yield('title') - AD Ondernemen</title>
    </head>

    <body>

        <header>
            @include('partials.navbar')
        </header>

        @yield('content')

        {{-- Run this code if the page isn't dashboard --}}
        @if(Request::segment(1) != "dashboard")
            <script>
                window.onload = function() {
                    const loginModalPanel = document.querySelector('.login-modal');
                    const loginButton = document.querySelector('#login-button');

                    const registerModalPanel = document.querySelector('.register-modal');
                    const registerButton = document.querySelector('#registerButton');

                        if(loginModalPanel.contains(document.querySelector(".invalid-feedback"))){
                            loginButton.click();
                        }


                        if(registerModalPanel.contains(document.querySelector(".invalid-feedback"))){
                            registerButton.click();
                        }
                }
                $(document).keypress(function(e) {
                    if (e.keyCode === 27) {
                        $("#popdiv").fadeOut(500);
                        //or
                        window.close();
                    }
                });
            </script>
        @endif

        <script src="{{ asset('js/app.js') }}"></script>
    </body>

    <!--Include the footer if the current url is the homepage-->
    @if (\Request::is('/'))
        <footer>
            @include('partials.footer')
        </footer>
    @endif

</html>
