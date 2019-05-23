<?php

namespace App\Http\Controllers\API;

use Validator;
use App\Assignment;
use App\Module;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AssignmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $assignments = Assignment::join('modules', 'modules.id', '=', 'assignments.module_id')
            ->select('assignments.*', 'modules.title as module_title')
            ->get();

        return $assignments;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if (Module::where('id', '=', $request->module_id)->exists()) {
            Validator::make($request->all(), [
                'title' => 'required|min:3|max:30|string',
                'description' => 'nullable|string',
                'module_id' => 'required'
            ])->validate();

            // Create new empty module object and filling it before we can save
            $assignment = new Assignment;
            $assignment->title = $request->title;
            $assignment->description = $request->description;
            $assignment->module_id = $request->module_id;

            $assignment->save();

            return response()->json([
                'message' => 'Succesvol aangemaakt!'
            ]);
        }

        // if module does not exist
        return response()->json(['error' => 'Module doesn\'t exist.'], 422);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $assignment = Assignment::findOrFail($id);

        return response()->json($assignment);
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
        $assignment = Assignment::findOrFail($id);

        $assignment->title = $request->title;
        $assignment->description = $request->description;
        $assignment->module_id = (int)$request->module_id;

        $assignment->save();


        return response()->json([
            'message' => 'Succesvol aangemaakt!'
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
        $assignment = Assignment::findOrFail($id);

        $assignment->delete();

        return response()->json([
            'message' => 'Succesvol verwijderd!'
        ]);
    }
}
