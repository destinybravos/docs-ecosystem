<?php

use App\Http\Controllers\PageController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [PageController::class, 'index'])->name('homepage');

Route::middleware('auth')->group(function () {
    Route::get('/complete-registration', [PageController::class, 'complete_registration'])->name('complete_registration');
    Route::post('/complete-registration', [PageController::class, 'save_complete_userdata'])->name('save_complete_userdata');

    Route::middleware('accouunt_iscomplete')->group(function () {
        Route::get('/dashboard', [PageController::class, 'dashboard'])->name('dashboard');
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

        // Documents Routes
        Route::prefix('document')->group(function () {
            Route::get('/view/{id}', [PageController::class, 'viewDocument'])->name('document.view');
        });

        // Admin routes
        Route::get('/document-ecosystem', [PageController::class, 'docmentEcosystem'])->name('document_ecosystem');
        Route::get('/manage-users', [PageController::class, 'manageUsers'])->name('manage_users');
        Route::get('/manage-departments', [PageController::class, 'manageDepartments'])->name('manage_departments');
        Route::get('/manage-document-access', [PageController::class, 'manageDocAccess'])->name('manage_doc_access');
    });
});

require __DIR__.'/auth.php';
