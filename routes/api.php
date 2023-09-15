<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\DocumentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {

    Route::prefix('documents')->group(function () {
        Route::post('save', [DocumentController::class, 'saveDocument'])->name('api.save_document');
        Route::post('fetch-all', [DocumentController::class, 'fetchDocuments'])->name('api.fetch_documents');
        Route::post('search-ecosystem', [DocumentController::class, 'searchDocuments'])->name('api.search_documents');
        Route::post('increase-doc-downlaod', [DocumentController::class, 'increaseDocuments'])->name('api.increament.download');
    });

    Route::prefix('admin')->group(function () {
        Route::get('fetch-departments', [AdminController::class, 'fetchDepartments'])->name('api.admin.fetch_departments');
        Route::post('create-user', [AdminController::class, 'create_user'])->name('api.admin.create_user');
        Route::get('fetch-users', [AdminController::class, 'fetch_users'])->name('api.admin.fetch_users');
        Route::post('update-user', [AdminController::class, 'update_user'])->name('api.admin.update_user');
        Route::post('delete-users', [AdminController::class, 'delete_users'])->name('api.admin.delete_users');
        Route::post('search-users', [AdminController::class, 'search_users'])->name('api.admin.search_users');
        Route::prefix('statistics')->group(function () {
            // Route::post('fetch_general', [StatisticsController::class, 'fetch_general'])->name('api.fetch_general_statistics');
        });
    });
});
