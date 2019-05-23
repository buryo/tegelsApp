<?php

namespace App\Http\Controllers\API;

use App\User;
use App\Assignment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\DashboardCollection;
use App\Http\Resources\Dashboard as DashboardResource;
use SebastianBergmann\CodeCoverage\Report\Html\Dashboard;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $totalAssignmentsAmount = count(Assignment::all());
        $users = User::where('user_role', '0')->with('title')->withCount('assignments')->orderBy('assignments_count', 'desc')->get();

        return DashboardResource::collection($users)->additional(['totalAssignments' => $totalAssignmentsAmount]);
    }
}
