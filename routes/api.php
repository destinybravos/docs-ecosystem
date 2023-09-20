<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\DocumentController;
use App\Http\Controllers\Api\NotificationController;

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
    Route::prefix('notifications')->group(function () {
        Route::get('fetch', [NotificationController::class, 'fetch'])->name('api.fetch_notifications');
        Route::post('update', [NotificationController::class, 'update'])->name('api.update_notification');
    });

    Route::prefix('documents')->group(function () {
        Route::post('save', [DocumentController::class, 'saveDocument'])->name('api.save_document');
        Route::post('fetch-all', [DocumentController::class, 'fetchDocuments'])->name('api.fetch_documents');
        Route::post('search-ecosystem', [DocumentController::class, 'searchDocuments'])->name('api.search_documents');
        Route::post('increase-doc-downlaod', [DocumentController::class, 'increaseDocuments'])->name('api.increament.download');
        Route::post('request-access', [DocumentController::class, 'requestAccess'])->name('api.request_access');
        Route::post('delete-document', [DocumentController::class, 'deleteDocument'])->name('api.document.delete');
    });

    Route::prefix('admin')->group(function () {
        Route::get('fetch-departments', [AdminController::class, 'fetchDepartments'])->name('api.admin.fetch_departments');
        Route::post('create-user', [AdminController::class, 'create_user'])->name('api.admin.create_user');
        Route::get('fetch-users', [AdminController::class, 'fetch_users'])->name('api.admin.fetch_users');
        Route::post('update-user', [AdminController::class, 'update_user'])->name('api.admin.update_user');
        Route::post('delete-users', [AdminController::class, 'delete_users'])->name('api.admin.delete_users');
        Route::post('search-users', [AdminController::class, 'search_users'])->name('api.admin.search_users');
        Route::post('save-faculty', [AdminController::class, 'save_faculty'])->name('api.admin.save_faculty');
        Route::post('save-department', [AdminController::class, 'save_department'])->name('api.admin.save_department');
        Route::get('fetch-faculties', [AdminController::class, 'fetch_faculties'])->name('api.admin.fetch_faculties');
        Route::get('fetch-department', [AdminController::class, 'fetchDepartments'])->name('api.admin.fetch_departments');
        Route::post('delete-faculties', [AdminController::class, 'delete_faculty'])->name('api.admin.delete_faculty');
        Route::post('delete-department', [AdminController::class, 'deleteDepartment'])->name('api.admin.delete_departments');
        Route::get('fetch_general', [AdminController::class, 'fetchDashboardStats'])->name('api.fetch_statistics');
        Route::get('fetch_access_request', [DocumentController::class, 'fetchAccessRequest'])->name('api.admin.fetch_access_request');
        Route::post('update_access_request', [DocumentController::class, 'updateAccessRequest'])->name('api.admin.update_access_request');
    });
});
