@extends('layouts.app')

@section('title', 'Welkom')

@section('content')
    <!--Page Header-->
    <div class="masthead text-white text-center">
        <div class="overlay"></div>
        <div class="container">
            <div class="row">
                <div class="col-xl-9 mx-auto">
                    <h1 class="mb-5 mast-text">AD Ondernemen Applicatie</h1>
                </div>
                <div class="col-md-10 col-lg-8 col-xl-7 mx-auto mast-text">
                    Voor studenten door studenten.
                </div>
            </div>
        </div>
    </div>
    <!--Features Icons and Text-->
    <section class="features-icons text-center">
        <div class="container">
            <div class="row">
                <div class="col-lg-4">
                    <div class="features-icons-item">
                        <div class="features-icons-icon">
                            <i class="fas fa-tasks fa-3x"></i>
                        </div>
                        <h3 class="text-head">Voortgang</h3>
                        <p class="text-grey">Bekijk snel en gemakkelijk jouw studievoortgang!</p>
                    </div>
                </div>

                <div class="col-lg-4">
                    <div class="features-icons-item">
                        <div class="features-icons-icon">
                            <i class="fas fa-check-circle fa-3x"></i>
                        </div>
                        <h3 class="text-head">Opdrachten</h3>
                        <p class="text-grey">ELO? Wie gebruikt dat nog? De AD Ondernemen applicatie is het nieuwe ELO</p>
                    </div>
                </div>

                <div class="col-lg-4">
                    <div class="features-icons-item">
                        <div class="features-icons-icon">
                            <i class="fas fa-star fa-3x"></i>
                        </div>
                        <h3 class="text-head">Win!</h3>
                        <p class="text-grey">Daag je klasgenoten uit en behaal de top van de leaderboards.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!--Image Showcase-->
{{--    <section class="showcase">--}}
{{--        <div class="container-fluid p-0">--}}
{{--            <div class="row no-gutters">--}}

{{--                <div class="col-lg-6 order-lg-2 text-white showcase-img" style="background-image: url('img/bg-showcase-1.jpg');"></div>--}}
{{--                <div class="col-lg-6 order-lg-1 my-auto showcase-text">--}}
{{--                    <h2>Fully Responsive Design</h2>--}}
{{--                    <p class="lead mb-0">When you use a theme created by Start Bootstrap, you know that the theme will look great on any device, whether it's a phone, tablet, or desktop the page will behave responsively!</p>--}}
{{--                </div>--}}
{{--            </div>--}}
{{--            <div class="row no-gutters">--}}
{{--                <div class="col-lg-6 text-white showcase-img" style="background-image: url('img/bg-showcase-2.jpg');"></div>--}}
{{--                <div class="col-lg-6 my-auto showcase-text">--}}
{{--                    <h2>Updated For Bootstrap 4</h2>--}}
{{--                    <p class="lead mb-0">Newly improved, and full of great utility classes, Bootstrap 4 is leading the way in mobile responsive web development! All of the themes on Start Bootstrap are now using Bootstrap 4!</p>--}}
{{--                </div>--}}
{{--            </div>--}}
{{--            <div class="row no-gutters">--}}
{{--                <div class="col-lg-6 order-lg-2 text-white showcase-img" style="background-image: url('img/bg-showcase-3.jpg');"></div>--}}
{{--                <div class="col-lg-6 order-lg-1 my-auto showcase-text">--}}
{{--                    <h2>Easy to Use &amp; Customize</h2>--}}
{{--                    <p class="lead mb-0">Landing Page is just HTML and CSS with a splash of SCSS for users who demand some deeper customization options. Out of the box, just add your content and images, and your new landing page will be ready to go!</p>--}}
{{--                </div>--}}
{{--            </div>--}}
{{--        </div>--}}
{{--    </section>--}}
@endsection

