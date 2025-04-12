<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AppointmentsManagerController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\API\AuthenticationController;

Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/admin/dashboard', fn () => response()->json(['message' => 'Welcome Admin!']));
    Route::get('/doctors', [AdminController::class, 'getDoctors']);
    Route::get('/patients', [AdminController::class, 'getPatients']);
});

Route::middleware(['auth:sanctum', 'role:doctor'])->group(function () {
    Route::get('/doctor/dashboard', fn () => response()->json(['message' => 'Welcome Doctor!']));
    Route::put('/appointments/{id}/status', [AppointmentsManagerController::class, 'updateStatus']);
});

Route::middleware(['auth:sanctum', 'role:patient'])->get('/patient/dashboard', fn () => response()->json(['message' => 'Welcome!']));


Route::middleware(['auth:sanctum', 'role:admin,patient'])->post('/appointments', [AppointmentsManagerController::class, 'CreateAppointment']);
Route::middleware(['auth:sanctum', 'role:admin,doctor,patient'])->get('/appointments', [AppointmentsManagerController::class, 'index']);


Route::post('/login', [AuthenticationController::class, 'login']);
Route::post('/register', [AuthenticationController::class, 'register']);
