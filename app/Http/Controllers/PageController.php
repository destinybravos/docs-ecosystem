<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class PageController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('HomeScreen', []);
    }



    // Authenticated Rouute Methods
    public function dashboard(Request $request)
    {
        return Inertia::render('Admin/Dashboard', []);
    }
}
