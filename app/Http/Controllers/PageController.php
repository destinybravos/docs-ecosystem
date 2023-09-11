<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class PageController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('HomeScreen', []);
    }



    // Authenticated Rouute Methods
    public function complete_registration(Request $request) 
    {
        $departments = Department::where('type', '!=', 'administrative')->get();
        return Inertia::render('Auth/CompleteRegistration', [
            'departments' => $departments,
        ]);
    }

    public function save_complete_userdata(Request $request) 
    {
        $validate = Validator::make($request->all(), [
            'department_id' => 'required',
            'account_id' => 'required',
        ]);

        if ($validate->fails()) {
            return redirect()->back()->with('status', 'Missing required feilds. Please ensure you have Department and Matric Number in your request');
        }

        $request->user()->update($request->all());
        return redirect()->route('dashboard');
    }

    public function dashboard(Request $request)
    {
        return Inertia::render('Admin/Dashboard', []);
    }

    public function addDocment(Request $request)
    {
        return Inertia::render('Admin/AddDocument', []);
    }

    public function manageUsers(Request $request)
    {
        return Inertia::render('Admin/ManageUsers', []);
    }
}
