<?php

namespace App\Http\Controllers;

use App\Models\AppointmentsManager;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AppointmentsManagerController extends Controller
{
    public function CreateAppointment(Request $request)
    {
        $request->validate([
            'date' => 'required|date',
            'time' => 'required|date_format:H:i',
            'doctor_id' => 'required|exists:users,id',
        ]);

        $exists = AppointmentsManager::where('patient_id', Auth::id())
            ->where('date', $request->date)
            ->where('time', $request->time)
            ->exists();

        if ($exists) {
            return response()->json(['message' => 'You already have an appointment at this time.'], 409);
        }

        $appointment = AppointmentsManager::create([
            'patient_id' => Auth::id(),
            'doctor_id' => $request->doctor_id,
            'date' => $request->date,
            'time' => $request->time,
            'status' => 'pending',
        ]);

        return response()->json($appointment, 201);
    }

    public function index()
    {
        $user = Auth::user();
    
        if ($user->role === 'admin') {
            return AppointmentsManager::with(['patient', 'doctor'])->get();
        } elseif ($user->role === 'doctor') {
            return $user->AssignedAppointments()->with('patient')->get();
        } else {
            return $user->appointments()->with('doctor')->get();
        }
    }
    

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,approved,completed,cancelled'
        ]);

        $appointment = AppointmentsManager::findOrFail($id);

        if ($appointment->doctor_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $appointment->status = $request->status;
        $appointment->save();

        return response()->json(['message' => 'Appointment status updated.']);
    }

    public function getAllAppointments()
    {
        return response()->json(
          AppointmentsManager::with(['patient', 'doctor'])->get()
        );
    }
}
