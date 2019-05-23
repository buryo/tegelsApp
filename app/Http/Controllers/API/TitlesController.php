<?php

namespace App\Http\Controllers\API;

use App\Title;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TitlesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $titles = Title::all();
        return response()->json(array('titles' => $titles));
    }
}
