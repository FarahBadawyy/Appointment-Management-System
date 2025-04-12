<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class AdminController extends Controller
{
    public function getDoctors()
    {
        $doctors = User::where('role', 'doctor')->get();
        return response()->json($doctors);
    }

    public function getPatients()
    {
        $patients = User::where('role', 'patient')->get();
        return response()->json($patients);
    }
}
