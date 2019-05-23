<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;


class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */

    public function handle($request, Closure $next)
    {
        $currentUser = Auth::user();
        //dd($currentUser->user_role);
        if (isset($currentUser) && $currentUser->user_role == 1) {
            //dd('je bent admin');
            return $next($request);
        }

        return redirect('/');

    }
}
