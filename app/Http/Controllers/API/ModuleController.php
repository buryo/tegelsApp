<?php

namespace App\Http\Controllers\API;

use Validator;
use App\Module;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\ModuleCollection;
use App\Http\Resources\Module as ModuleResource;

class ModuleController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $modules = Module::with('assignments')->get();
        return new ModuleCollection($modules);
        //return $modules;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Change `is_active` field from false/true to 0/1 for just validate purposes
        $request->merge(['is_active' => $request->is_active ? 1 : 0]);

        // Validate the data
        Validator::make($request->all(), [
            'title' => 'required|min:3|max:30|string',
            'description' => 'nullable|string',
            'ec' => 'nullable|numeric',
            'photo_url' => 'image|nullable',
            'is_active' => 'boolean'
        ])->validate();


        // Create new empty module object and filling it before we can save
        $module = new Module;
        $module->title = $request->title;
        $module->description = $request->description;
        $module->ec = $request->ec;
        if($request->photo_url) {
            $file = $request->photo_url;

            // Change file name
            $fileName = md5_file($file).'.'.$file->extension();

            // Move the picture to public storage
            $file->move(base_path('/public/storage/images'), $fileName);

            // add an slash to the file name
            $module->photo_url =  "/" . $fileName;
        }

        // Changing the is_active real value from false/true to 0/1
        $module->is_active = $request->is_active ? 1 : 0;
        $module->save();

        // return response()->json([
        //     'message' => 'Succesvol aangemaakt!'
        // ]);
        return response()->json($module);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //Get requested Module with corresponding assignments
        $module = Module::with('assignments')->get()->find($id);
        return new ModuleResource($module);
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
        $module = Module::findOrFail($id);

        $module->title = $request->title;
        $module->description = $request->description;
        $module->ec = $request->ec;
        $module->is_active = $request->is_active ? true : false;
        if($request->photo_url) {
            $file = $request->photo_url;

            // Change file name
            $fileName = md5_file($file).'.'.$file->extension();

            // Move the picture to public storage
            $file->move(base_path('/public/storage/images'), $fileName);

            // add an slash to the file name
            $module->photo_url =  "/" . $fileName;
        }

        $module->save();

        return response()->json([
            'message' => 'Succesvol aangepast!'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $module = Module::findOrFail($id);
        $module->delete();

        return response()->json([
            'message' => 'Succesvol verwijderd!'
        ]);
    }
}
