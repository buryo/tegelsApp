<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Default user return
// Route::middleware('api')->get('/user', function (Request $request) {
//    return $request->user();
// });


Route::middleware('auth:api')->group( function(){
    Route::apiResources([
        'modules' => 'API\ModuleController',
        'students' => 'API\StudentController'
    ]);

    Route::get('/user', function (Request $request) {
        return App\User::where('id', $request->user()->id)->with('title')->first();
    });

    Route::get('/assignments/delete/{id}', 'API\AssignmentController@destroy');
    Route::get('/modules/delete/{id}', 'API\ModuleController@destroy');
    Route::get('/user/assignments', 'API\AssignmentUserController@show');
    Route::post('/user/assignments', 'API\AssignmentUserController@store');
});

Route::get('/dashboard', 'API\DashboardController@index');
Route::get('/titles', 'API\TitlesController@index');

 Route::apiResources([
     'modules' => 'API\ModuleController',
     'assignments' => 'API\AssignmentController',
     'students' => 'API\StudentController'
 ]);