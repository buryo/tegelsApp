<?php

namespace App\Http\Controllers\API;

use DB;
use App\User;
use Validator;
Use \Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class AssignmentUserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Validator::make($request->all(), [
            'assignment_id' => 'required',
            'assignment_file' => 'nullable',
        ])->validate();

        if ($request->assignment_file) {
            $file = $request->assignment_file;

            // Change file name
            $fileName = md5_file($file) . '.' . $file->extension();

            // Move the picture to public storage
            $file->move(base_path('/public/storage/files'), $fileName);

            // add an slash to the file name
            $request->assignment_file =  "/" . $fileName;
        }

        DB::table('assignments_has_users')->insert([
            'assignment_id'         => $request->assignment_id,
            'user_id'               => $request->user()->id,
            'assignment_file'       => $request->assignment_file,
            'created_at'            => Carbon::now(),
            'updated_at'            => Carbon::now(),
        ]);

        return response()->json($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $userData = User::where('id', $request->user()->id)->with('assignments')->get();

        return response()->json($userData);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
